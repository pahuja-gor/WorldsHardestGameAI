let test;
let spawn, goal;
let obstacles = new Array(5);

// coin1 (377.5, 495)
// coin2 (892.5, 130)
// coin3 (1015, 87.5)
// coin4 (1117.5, 312.5)

// let goal_xcoors = [377.5, 892.5, 1015, 1117.5];
// let goal_ycoors = [495, 130, 87.5, 312.5];
let goal_x = 1117.5;
let goal_y = 312.5;

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

const POPULATION_SIZE = 1000;
const SPAWN_POINT = [152.5, 312.5];
const WALL_THICKNESS = 10;
const SIZE_OF_SQUARE = 75;
const PURPLE_BACKGROUD = [168, 167, 249];
const GREEN_ZONE = [177, 239, 163];
const BLACK = [0, 0, 0];

function setup() {
  createCanvas(1440, 680);
  test = new Population(POPULATION_SIZE, 10, 255);

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
  text("Moves: " + str(test.squares[0].brain.directions.length), 10, 44);

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
    topWallOfSpawn.getX() + topWallOfSpawn.getWidth() - WALL_THICKNESS,
    topWallOfSpawn.getY(),
    WALL_THICKNESS,
    SIZE_OF_SQUARE * 6
  );
  rightWallOfSpawn.show(...BLACK);

  bottomWallOfSpawn = new Wall(
    topWallOfSpawn.getX(),
    leftWallOfSpawn.getY() + leftWallOfSpawn.getHeight() - WALL_THICKNESS,
    SIZE_OF_SQUARE * 5,
    WALL_THICKNESS
  );
  bottomWallOfSpawn.show(...BLACK);

  fill(...GREEN_ZONE);
  spawn = rect(
    topWallOfSpawn.getX() + WALL_THICKNESS,
    topWallOfSpawn.getY() + WALL_THICKNESS,
    SIZE_OF_SQUARE * 3 - 2 * WALL_THICKNESS,
    SIZE_OF_SQUARE * 7 - 2 * WALL_THICKNESS
  );

  // bridge to obstacle arena
  horizontalBridgeFromSpawn = new Wall(
    rightWallOfSpawn.getX(),
    rightWallOfSpawn.getY() + rightWallOfSpawn.getHeight() - WALL_THICKNESS,
    SIZE_OF_SQUARE,
    WALL_THICKNESS
  );
  horizontalBridgeFromSpawn.show(...BLACK);

  verticalBridgeFromSpawn = new Wall(
    bottomWallOfSpawn.getX() + bottomWallOfSpawn.getWidth() - WALL_THICKNESS,
    bottomWallOfSpawn.getY() - SIZE_OF_SQUARE,
    WALL_THICKNESS,
    SIZE_OF_SQUARE + WALL_THICKNESS
  );
  verticalBridgeFromSpawn.show(...BLACK);

  // obstacle arena
  leftWallOfObstacleArena = new Wall(
    horizontalBridgeFromSpawn.getX() +
      horizontalBridgeFromSpawn.getWidth() -
      WALL_THICKNESS,
    rightWallOfSpawn.getY() + rightWallOfSpawn.getHeight() - SIZE_OF_SQUARE * 5,
    rightWallOfSpawn.getWidth(),
    SIZE_OF_SQUARE * 5
  );
  leftWallOfObstacleArena.show(...BLACK);

  topWallOfObstacleArena = new Wall(
    leftWallOfObstacleArena.getX(),
    leftWallOfObstacleArena.getY(),
    leftWallOfSpawn.getHeight(),
    WALL_THICKNESS
  );
  topWallOfObstacleArena.show(...BLACK);

  bottomWallOfObstacleArena = new Wall(
    verticalBridgeFromSpawn.getX(),
    verticalBridgeFromSpawn.getY(),
    topWallOfObstacleArena.getWidth(),
    WALL_THICKNESS
  );
  bottomWallOfObstacleArena.show(...BLACK);

  rightWallOfObstacleArena = new Wall(
    topWallOfObstacleArena.getX() +
      topWallOfObstacleArena.getWidth() +
      SIZE_OF_SQUARE,
    topWallOfObstacleArena.getY(),
    WALL_THICKNESS,
    leftWallOfObstacleArena.getHeight()
  );
  rightWallOfObstacleArena.show(...BLACK);

  obstacles.forEach((element) => {
    element.move();
    element.show();
  });

  // bridge to goal
  verticalBridgeToGoal = new Wall(
    topWallOfObstacleArena.getX() +
      topWallOfObstacleArena.getWidth() -
      WALL_THICKNESS,
    topWallOfObstacleArena.getY() - SIZE_OF_SQUARE,
    verticalBridgeFromSpawn.getWidth(),
    verticalBridgeFromSpawn.getHeight()
  );
  verticalBridgeToGoal.show(...BLACK);

  horizontalBridgeToGoal = new Wall(
    rightWallOfObstacleArena.getX(),
    rightWallOfObstacleArena.getY(),
    horizontalBridgeFromSpawn.getWidth() + WALL_THICKNESS,
    horizontalBridgeFromSpawn.getHeight()
  );
  horizontalBridgeToGoal.show(...BLACK);

  // goal area
  topWallOfGoal = new Wall(
    verticalBridgeToGoal.getX(),
    verticalBridgeToGoal.getY(),
    bottomWallOfSpawn.getWidth() + WALL_THICKNESS,
    bottomWallOfSpawn.getHeight()
  );
  topWallOfGoal.show(...BLACK);

  leftWallOfGoal = new Wall(
    rightWallOfObstacleArena.getX() + SIZE_OF_SQUARE,
    rightWallOfObstacleArena.getY(),
    rightWallOfSpawn.getWidth(),
    rightWallOfSpawn.getHeight()
  );
  leftWallOfGoal.show(...BLACK);

  bottomWallOfGoal = new Wall(
    leftWallOfGoal.getX(),
    bottomWallOfSpawn.getY(),
    topWallOfSpawn.getWidth(),
    topWallOfSpawn.getHeight()
  );
  bottomWallOfGoal.show(...BLACK);

  rightWallOfGoal = new Wall(
    topWallOfGoal.getX() + topWallOfGoal.getWidth() - WALL_THICKNESS,
    topWallOfGoal.getY(),
    leftWallOfSpawn.getWidth(),
    leftWallOfSpawn.getHeight()
  );
  rightWallOfGoal.show(...BLACK);

  fill(...GREEN_ZONE);
  goal = rect(
    leftWallOfGoal.getX() + leftWallOfGoal.getWidth(),
    leftWallOfGoal.getY() - SIZE_OF_SQUARE + WALL_THICKNESS,
    SIZE_OF_SQUARE * 3 - 2 * WALL_THICKNESS,
    SIZE_OF_SQUARE * 7 - 2 * WALL_THICKNESS
  );

  let walls = [
    topWallOfSpawn,
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
    rightWallOfGoal,
  ];

  if (test.areAllSquaresDead()) {
    test.calculateFitness();
    test.naturalSelection();
    test.mutateChildren();

    if (test.gen % 5 == 0) {
      test.increaseMovesForAllSquares(5);
    }
  } else {
    test.update(obstacles, walls);
    test.show();
    // test.showOnlyBestDot();
  }
}
