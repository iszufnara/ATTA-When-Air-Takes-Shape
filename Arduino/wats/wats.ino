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
bool interrupt = false;

AccelStepper expansionSteppers(AccelStepper::DRIVER, stepPin_E, dirPin_E);
AccelStepper contractionSteppers(AccelStepper::DRIVER, stepPin_C, dirPin_C);

#define MOTIONLENGTH 4
// Motion arrays
// Pairs of integers ( Position, Speed)
int motion[][MOTIONLENGTH]{
  { 10, 200, -10, -200 },
  { 50, 200, -50, -200 },
  { 30, 300, -30, -300 },
  { 40, 300, -40, -300 },
  { 50, 400, -50, -400 },
  { 60, 400, -60, -400 },
  { 70, 500, -70, -500 },
  { 80, 500, -80, -500 },
  { 90, 500, -90, -500 },
  { 100, 500, -100, -500 }
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

  expansionSteppers.setMaxSpeed(maxSpeed);
  contractionSteppers.setMaxSpeed(maxSpeed);

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
  // Serial Conection
  Serial.begin(19200);
}

void loop() {
  // Get any new commands
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
  Serial.print("Distance:");
  Serial.println(distance);

  if (distance == 0)
  {
      // Loop around if we are at the end of the motion array
      if (currentMotionStep + 2 >= MOTIONLENGTH) {
        currentMotionStep = 0;
      } else {
        currentMotionStep += 2;
      }

      // Set the new move to loction
      Serial.print("Moving to ");
      Serial.println(motion[currentMotionIndex][currentMotionStep]);
      contractionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
      expansionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
  }

  // Do the stepping
  contractionSteppers.run();
  contractionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep + 1]);
  expansionSteppers.run();
  expansionSteppers.setSpeed(motion[currentMotionIndex][currentMotionStep + 1]);
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
  Serial.write("Performing Stop");
  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;
}

// Hard Reset for tesing purposes
void PerformReset() {
  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
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
      contractionSteppers.setSpeed(speed);
      expansionSteppers.run();
      expansionSteppers.setSpeed(speed);
    }
  }
}
