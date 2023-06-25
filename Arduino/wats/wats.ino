#include <Arduino.h>
#include <Wire.h>
#include <AccelStepper.h>


// Expansion steppers
#define dirPin_E A4
#define stepPin_E A5

// Contraction steppers
#define dirPin_C A6
#define stepPin_C A7

// Switches
#define microSwitchWinding 4
#define microSwitchUnWinding 5


const int stepsPerRevolution = 200;
const int minSpeed = 200;
const int maxSpeed = 1000;
int analogSpeed, speed;

AccelStepper expansionSteppers(AccelStepper::DRIVER, stepPin_E, dirPin_E);
AccelStepper contractionSteppers(AccelStepper::DRIVER, stepPin_C, dirPin_C);

#define TESTMODE 0 // 1 for test mode, 0 for normal mode

#define MOTIONLENGTH 4
// Motion arrays
int motion[][MOTIONLENGTH]{
	{10,200,-10,-200},
	{20,200,-20,-200},
	{30,300,-30,-300},
	{40,300,-30,-300},
	{50,400,-50,-400},
	{60,400,-60,-400},
	{70,500,-70,-500},
	{80,500,-80,-500},
	{90,500,-90,-500},
	{100,500,-100,-500}
};


int currentMotionIndex = -1;
int currentMotionStep = 0;

void setup(){
	pinMode(dirPin_E, OUTPUT);
	pinMode(stepPin_E, OUTPUT);
	pinMode(dirPin_C, OUTPUT);
	pinMode(stepPin_C, OUTPUT);

	pinMode(microSwitchUnWinding, INPUT_PULLUP);
	pinMode(microSwitchWinding, INPUT_PULLUP);

	expansionSteppers.setMaxSpeed(maxSpeed);
	contractionSteppers.setMaxSpeed(maxSpeed);

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
	// Serial 
	Serial.begin(19200);
}

void loop(){

	// Read from Serial for a command
	if (Serial.available() > 0) {
		char command = Serial.read();
		switch (command) {
		case 'h':
			PerformHome();
			break;
		case 's':
			PerformStop();
			break;
		case 'r':
			PerformReset();
			break;
		default:
			// Test to see if the command is a number
			if (command >= '0' && command <= '9') {
				PerformMotion(command - '0');
			}
		}
	}

	// Do the motion
	if (currentMotionIndex >= 0) {
		if (currentMotionStep < MOTIONLENGTH) {

			
			// Move the steppers
			contractionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
			expansionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);

			while(contractionSteppers.isRunning() || expansionSteppers.isRunning()) {
				contractionSteppers.run();
				contractionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep+1]);
				expansionSteppers.run();
				expansionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep+1]);
			}

			// Loop around if we are at the end of the motion array
			if (currentMotionStep >= MOTIONLENGTH) 
			{
				currentMotionStep = 0;
			}
			else
			{
				currentMotionStep += 2;
			}
			
		}
		else {
			// Motion is done
			//currentMotionIndex = -1;
			currentMotionStep = 0;
		}
	}


	if (digitalRead(microSwitchUnWinding) == LOW) {
		speed = 500;

		contractionSteppers.moveTo(-1000);
		expansionSteppers.moveTo(-1000);

		while ((contractionSteppers.isRunning() || expansionSteppers.isRunning()) && digitalRead(microSwitchUnWinding) == LOW) {
			contractionSteppers.run();
			contractionSteppers.setSpeed(-speed);
			expansionSteppers.run();
			expansionSteppers.setSpeed(-speed);
		}
	}

	if (digitalRead(microSwitchWinding) == LOW) {
		speed = 500;

		contractionSteppers.moveTo(1000);
		expansionSteppers.moveTo(1000);

		while ((contractionSteppers.isRunning() || expansionSteppers.isRunning()) && digitalRead(microSwitchWinding) == LOW) {
			contractionSteppers.run();
			contractionSteppers.setSpeed (speed);
			expansionSteppers.run();
			expansionSteppers.setSpeed(speed);
		}
	}
}



// Reset the structure positions
void PerformHome()
{
	currentMotionIndex = -1;
	currentMotionStep = 0;
}

void PerformMotion(int index)
{
	currentMotionIndex = index;
	currentMotionStep = 0;
}

void PerformStop()
{
	currentMotionIndex = -1;
	currentMotionStep = 0;
}

void PerformReset()
{	currentMotionIndex = -1;
	currentMotionStep = 0;
}
