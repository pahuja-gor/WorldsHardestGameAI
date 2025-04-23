let test;
let spawn, goal;
let obstacles = new Array(5);

let topWallOfSpawn,
  leftWallOfSpawn,
  rightWallOfSpawn,
  bottomWallOfSpawn,
  horizontalBridgeFromSpawn,
  verticalBridgeFromSpawn,
  leftWallOfObstacleArena,
  topWallOfObstacleArena,
  bottomWallOfObstacleArena,
  rightWallOfObstacleArena,
  verticalBridgeToGoal,
  horizontalBridgeToGoal,
  topWallOfGoal,
  leftWallOfGoal,
  bottomWallOfGoal,
  rightWallOfGoal;

const WALL_THICKNESS = 10;
const SIZE_OF_SQUARE = 75;
const PURPLE_BACKGROUD = [168, 167, 249];
const GREEN_ZONE = [177, 239, 163];
const BLACK = [0, 0, 0];

function setup() {
  createCanvas(1440, 680);
  test = new Population(1000);

  for (let y = 170, index = 0; y < 500 && index < 5; y += 70, index++) {
    if (index % 2 == 0) {
      obstacles.push(new Obstacle(895, y, WALL_THICKNESS * 3));
    } else {
      obstacles.push(new Obstacle(375, y, WALL_THICKNESS * 3));
    }
  }
}

function draw() {
  background(PURPLE_BACKGROUD);
  fill(0);
  textSize(24);
  text("Generation: " + str(test.gen), 10, 20);

  // starting/spawn area
  topWallOfSpawn = new Wall(50, 50, SIZE_OF_SQUARE * 3, WALL_THICKNESS);
  topWallOfSpawn.show(...BLACK);

  leftWallOfSpawn = new Wall(
    topWallOfSpawn.getX(),
    topWallOfSpawn.getY(),
    WALL_THICKNESS,
    SIZE_OF_SQUARE * 7
  );
  leftWallOfSpawn.show(...BLACK);

  rightWallOfSpawn = new Wall(
    topWallOfSpawn.getX() + topWallOfSpawn.getWidth(),
    topWallOfSpawn.getY(),
    -WALL_THICKNESS,
    SIZE_OF_SQUARE * 6
  );
  rightWallOfSpawn.show(...BLACK);

  bottomWallOfSpawn = new Wall(
    topWallOfSpawn.getX(),
    leftWallOfSpawn.getX() + leftWallOfSpawn.getHeight(),
    SIZE_OF_SQUARE * 5,
    -WALL_THICKNESS
  );
  bottomWallOfSpawn.show(...BLACK);

  fill(...GREEN_ZONE);
  goal = rect(
    topWallOfSpawn.getX() + WALL_THICKNESS,
    topWallOfSpawn.getY() + WALL_THICKNESS,
    SIZE_OF_SQUARE * 3 - 2 * WALL_THICKNESS,
    SIZE_OF_SQUARE * 7 - 2 * WALL_THICKNESS
  );

  // bridge to obstacle arena
  horizontalBridgeFromSpawn = new Wall(
    rightWallOfSpawn.getX() + rightWallOfSpawn.getWidth(),
    rightWallOfSpawn.getY() + rightWallOfSpawn.getHeight() - WALL_THICKNESS,
    SIZE_OF_SQUARE,
    WALL_THICKNESS
  );
  horizontalBridgeFromSpawn.show(...BLACK);

  verticalBridgeFromSpawn = new Wall(
    bottomWallOfSpawn.getX() + bottomWallOfSpawn.getWidth(),
    bottomWallOfSpawn.getY(),
    -WALL_THICKNESS,
    -(SIZE_OF_SQUARE + WALL_THICKNESS)
  );
  verticalBridgeFromSpawn.show(...BLACK);

  // obstacle arena
  leftWallOfObstacleArena = new Wall(
    horizontalBridgeFromSpawn.getX() + horizontalBridgeFromSpawn.getWidth(),
    rightWallOfSpawn.getY() + rightWallOfSpawn.getHeight(),
    rightWallOfSpawn.getWidth(),
    -SIZE_OF_SQUARE * 5
  );
  leftWallOfObstacleArena.show(...BLACK);

  topWallOfObstacleArena = new Wall(
    leftWallOfObstacleArena.getX() - leftWallOfSpawn.getWidth(),
    leftWallOfObstacleArena.getY() + leftWallOfObstacleArena.getHeight(),
    SIZE_OF_SQUARE * 7,
    WALL_THICKNESS
  );
  topWallOfObstacleArena.show(...BLACK);

  bottomWallOfObstacleArena = new Wall(
    bottomWallOfSpawn.getX() + bottomWallOfSpawn.getWidth() - WALL_THICKNESS,
    bottomWallOfSpawn.getY() + verticalBridgeFromSpawn.getHeight(),
    SIZE_OF_SQUARE * 7,
    WALL_THICKNESS
  );
  bottomWallOfObstacleArena.show(...BLACK);

  rightWallOfObstacleArena = new Wall(
    bottomWallOfObstacleArena.getX() +
      bottomWallOfObstacleArena.getWidth() -
      WALL_THICKNESS,
    bottomWallOfObstacleArena.getY() + WALL_THICKNESS,
    WALL_THICKNESS,
    -SIZE_OF_SQUARE * 5
  );
  rightWallOfObstacleArena.show(...BLACK);

  obstacles.forEach((element) => {
    element.move();
    element.show();
  });

  // bridge to goal
  verticalBridgeToGoal = new Wall(
    topWallOfObstacleArena.getX() + topWallOfObstacleArena.getWidth(),
    topWallOfObstacleArena.getY() + WALL_THICKNESS,
    -WALL_THICKNESS,
    -(SIZE_OF_SQUARE + WALL_THICKNESS)
  );
  verticalBridgeToGoal.show(...BLACK);

  horizontalBridgeToGoal = new Wall(
    rightWallOfObstacleArena.getX(),
    rightWallOfObstacleArena.getY() + rightWallOfObstacleArena.getHeight(),
    horizontalBridgeFromSpawn.getWidth(),
    horizontalBridgeFromSpawn.getHeight()
  );
  horizontalBridgeToGoal.show(...BLACK);

  // goal area
  topWallOfGoal = new Wall(
    verticalBridgeToGoal.getX() - WALL_THICKNESS,
    verticalBridgeToGoal.getY() +
      verticalBridgeToGoal.getHeight() +
      WALL_THICKNESS,
    bottomWallOfSpawn.getWidth(),
    bottomWallOfSpawn.getHeight()
  );
  topWallOfGoal.show(...BLACK);

  leftWallOfGoal = new Wall(
    horizontalBridgeToGoal.getX() +
      horizontalBridgeToGoal.getWidth() -
      WALL_THICKNESS,
    horizontalBridgeToGoal.getY() +
      horizontalBridgeToGoal.getHeight() -
      WALL_THICKNESS,
    WALL_THICKNESS,
    rightWallOfSpawn.getHeight()
  );
  leftWallOfGoal.show(...BLACK);

  bottomWallOfGoal = new Wall(
    leftWallOfGoal.getX(),
    leftWallOfGoal.getY() + leftWallOfGoal.getHeight() - WALL_THICKNESS,
    topWallOfSpawn.getWidth(),
    WALL_THICKNESS
  );
  bottomWallOfGoal.show(...BLACK);

  rightWallOfGoal = new Wall(
    topWallOfGoal.getX() + topWallOfGoal.getWidth() - WALL_THICKNESS,
    topWallOfGoal.getY() - WALL_THICKNESS,
    WALL_THICKNESS,
    leftWallOfSpawn.getHeight()
  );
  rightWallOfGoal.show(...BLACK);

  fill(...GREEN_ZONE);
  goal = rect(
    horizontalBridgeToGoal.getX() + horizontalBridgeToGoal.getWidth(),
    topWallOfGoal.getY() + topWallOfGoal.getHeight() + WALL_THICKNESS,
    SIZE_OF_SQUARE * 3 - 2 * WALL_THICKNESS,
    SIZE_OF_SQUARE * 7 - 2 * WALL_THICKNESS
  );

  // fill(255, 0, 0);
  // rect(
  //   topWallOfSpawn.getX() + topWallOfSpawn.getWidth() / 2 - WALL_THICKNESS,
  //   topWallOfSpawn.getY() + leftWallOfSpawn.getHeight() / 2,
  //   WALL_THICKNESS * 3,
  //   WALL_THICKNESS * 3
  // );

  if (test.areAllSquaresDead()) {
    test.calculateFitness();
    test.naturalSelection();
    test.mutateChildren();
  } else {
    test.update();
    test.show();
  }
}
