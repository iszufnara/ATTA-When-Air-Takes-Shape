#include <Arduino.h>
#include <Wire.h>
#include <AccelStepper.h>

#define TESTMODE 1  // 1 for test mode, 0 for normal mode

// Expansion steppers
#define dirPin_E A4
#define stepPin_E A5

// Contraction steppers
#define dirPin_C A6
#define stepPin_C A7

// Rotation Left
#define dirPin_RotL A9
#define stepPin_RotL A8

// Rotation Right
#define dirPin_RotR A10
#define stepPin_RotR A11

// Switches
#define microSwitchWinding 4
#define microSwitchUnWinding 5

#define resetSwitch 6

const int stepsPerRevolution = 200;
const int minSpeed = 200;
const int maxSpeed = 2000;
int analogSpeed, speed;
bool interrupt = false;

AccelStepper expansionSteppers(AccelStepper::DRIVER, stepPin_E, dirPin_E);
AccelStepper contractionSteppers(AccelStepper::DRIVER, stepPin_C, dirPin_C);
AccelStepper rotationLeftStepper(AccelStepper::DRIVER, stepPin_RotL, dirPin_RotL);
AccelStepper rotationRightStepper(AccelStepper::DRIVER, stepPin_RotR, dirPin_RotR);


#define MOTIONLENGTH 4
// Motion array for Expansion/Contraction
// Pairs of integers ( Position, Speed)
int motion[][MOTIONLENGTH]{
  { 10, maxSpeed/1.9, -10, -maxSpeed/1.9 },
  { 50, maxSpeed/1.8, -50, -maxSpeed/1.8 },
  { 30, maxSpeed/1.7, -30, -maxSpeed/1.7 },
  { 40, maxSpeed/1.6, -40, -maxSpeed/1.6 },
  { 50, maxSpeed/1.5, -50, -maxSpeed/1.5 },
  { 60, maxSpeed/1.4, -60, -maxSpeed/1.4 },
  { 70, maxSpeed/1.3, -70, -maxSpeed/1.3 },
  { 80, maxSpeed/1.2, -80, -maxSpeed/1.2 },
  { 900, maxSpeed/1.1, -900, -maxSpeed/1.1 },
  { 1000, maxSpeed, -1000, -maxSpeed }
};

// Motion array for Rotation
// Pairs of integers ( Position, Speed)
int rotationMotion[][MOTIONLENGTH]{
  { 10, maxSpeed/1.9, -10, -maxSpeed/1.9 },
  { 50, maxSpeed/1.8, -50, -maxSpeed/1.8 },
  { 30, maxSpeed/1.7, -30, -maxSpeed/1.7 },
  { 40, maxSpeed/1.6, -40, -maxSpeed/1.6 },
  { 50, maxSpeed/1.5, -50, -maxSpeed/1.5 },
  { 60, maxSpeed/1.4, -60, -maxSpeed/1.4 },
  { 70, maxSpeed/1.3, -70, -maxSpeed/1.3 },
  { 80, maxSpeed/1.2, -80, -maxSpeed/1.2 },
  { 900, maxSpeed/1.1, -900, -maxSpeed/1.1 },
  { 1000, maxSpeed, 500, -maxSpeed }
};

int currentMotionIndex = -1;
int currentMotionStep = 0;

void setup() {
  pinMode(dirPin_E, OUTPUT);
  pinMode(stepPin_E, OUTPUT);
  pinMode(dirPin_C, OUTPUT);
  pinMode(stepPin_C, OUTPUT);

  pinMode(microSwitchUnWinding, INPUT_PULLUP);
  pinMode(microSwitchWinding, INPUT_PULLUP);
  pinMode(resetSwitch, INPUT_PULLUP);

  expansionSteppers.setMaxSpeed(maxSpeed);
  contractionSteppers.setMaxSpeed(maxSpeed);
  rotationLeftStepper.setMaxSpeed(maxSpeed);
  rotationRightStepper.setMaxSpeed(maxSpeed);

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
  rotationLeftStepper.setCurrentPosition(0);
  rotationRightStepper.setCurrentPosition(0);

  // Serial
  Serial.begin(19200);
}

void loop() {
  
  PollSerial();
  // Perform Motion routines
  RunMotion();
  // Switches used for Debug
  HandleSwitches();

}

void RunMotion()
{
  // Early out if there is not Motion Index Set
  if (currentMotionIndex == -1)
    return;

  long distance = contractionSteppers.distanceToGo();
  
#if TESTMODE
  Serial.print("Current Position: ");
  Serial.print(contractionSteppers.currentPosition());
  Serial.print("Distance:");
  Serial.println(distance);
  
#endif 

  if (distance * motion[currentMotionIndex][currentMotionStep + 1] <= 0)
  {
      // Loop around if we are at the end of the motion array
      if (currentMotionStep + 2 >= MOTIONLENGTH) {
        currentMotionStep = 0;
      } else {
        currentMotionStep += 2;
      }

      // Set the new move to loction
#if TESTMODE
      Serial.print("Moving to ");
      Serial.println(motion[currentMotionIndex][currentMotionStep]);
#endif 

      contractionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
      expansionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
      rotationLeftStepper.moveTo(rotationMotion[currentMotionIndex][currentMotionStep]);
      rotationRightStepper.moveTo(rotationMotion[currentMotionIndex][currentMotionStep]);
  }


  contractionSteppers.run();
  contractionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep + 1]);
  expansionSteppers.run();
  expansionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep + 1]);
  rotationLeftStepper.run();
  rotationLeftStepper.setSpeed(rotationMotion[currentMotionIndex][currentMotionStep + 1]);
  rotationRightStepper.run();
  rotationRightStepper.setSpeed(rotationMotion[currentMotionIndex][currentMotionStep + 1]);


}


// Reset the structure positions
void PerformHome() {
  currentMotionIndex = -1;
  currentMotionStep = 0;
 // TODO: Move the steppers to home position
 
}

// Set which motion index to run
void PerformMotion(int index) {
  currentMotionIndex = index;
  currentMotionStep = 0;
}

void PerformStop() {
  Serial.write("Performing Stop\n");
  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;
}

// Hard Reset for tesing purposes
void PerformReset() {
  Serial.write("Perform Reset\n");

  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
  rotationLeftStepper.setCurrentPosition(0);
  rotationRightStepper.setCurrentPosition(0);
}

// Check for any new commands
void PollSerial() {

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
}

void HandleSwitches() {

  if (digitalRead(microSwitchUnWinding) == LOW) {
    speed = 1000;

    contractionSteppers.moveTo(-1000);
    expansionSteppers.moveTo(-1000);
    rotationLeftStepper.moveTo(-1000);
    rotationRightStepper.moveTo(-1000);

    while ((contractionSteppers.isRunning() || expansionSteppers.isRunning()) && digitalRead(microSwitchUnWinding) == LOW) {
      contractionSteppers.run();
      contractionSteppers.setSpeed(-speed);
      expansionSteppers.run();
      expansionSteppers.setSpeed(-speed);
      
      rotationLeftStepper.run();
      rotationLeftStepper.setSpeed(-speed);
      rotationRightStepper.run();
      rotationRightStepper.setSpeed(-speed);
      
    }
  }

  if (digitalRead(microSwitchWinding) == LOW) {
    speed = 1000;

    contractionSteppers.moveTo(1000);
    expansionSteppers.moveTo(1000);
    rotationLeftStepper.moveTo(1000);
    rotationRightStepper.moveTo(1000);

    while ((contractionSteppers.isRunning() || expansionSteppers.isRunning()) && digitalRead(microSwitchWinding) == LOW) {
      contractionSteppers.run();
      contractionSteppers.setSpeed(speed);
      expansionSteppers.run();
      expansionSteppers.setSpeed(speed);

      rotationLeftStepper.run();
      rotationLeftStepper.setSpeed(speed);
      rotationRightStepper.run();
      rotationRightStepper.setSpeed(speed);
    }
  }

  if(digitalRead(resetSwitch)==LOW)
  {
    PerformReset();
  }
}