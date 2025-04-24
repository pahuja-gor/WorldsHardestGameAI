const PLAYER_SIZE = 30;

class Square {
  constructor(alpha = 255) {
    this.isDead = false;
    this.reachedGoal = false;
    this.isBest = false;
    this.fitness = 0;

    this.brain = new Brain(100);
    this.pos = createVector(...SPAWN_POINT);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.col = color(255, 0, 0);
    this.col.setAlpha(alpha);
  }

  show() {
    if (this.isDead) return;

    if (this.isBest) {
      this.col = color(0, 255, 0, alpha(this.col));
    }

    fill(this.col);
    square(this.pos.x, this.pos.y, PLAYER_SIZE);
  }

  move(walls) {
    if (this.brain.step < this.brain.directions.length) {
      this.acc = this.brain.directions[this.brain.step++];
    } else {
      this.isDead = true;
    }

    this.vel.add(this.acc);
    this.vel.limit(5);

    // only move if next position doesn’t hit walls
    const nextX = this.pos.x + this.vel.x;
    const nextY = this.pos.y + this.vel.y;
    const safe = walls.every(wall =>
      !collideRectRect(
        nextX, nextY, PLAYER_SIZE, PLAYER_SIZE,
        wall.getX(), wall.getY(),
        wall.getWidth(), wall.getHeight()
      )
    );

    if (safe) {
      this.pos.add(this.vel);
    }
  }

  update(obstacles, walls) {
    if (this.isDead || this.reachedGoal) return;

    this.move(walls);

    // goal test (use boundary if you switch to box- vs. point-goal)
    if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < PLAYER_SIZE/2) {
      this.reachedGoal = true;
      return;
    }

    // obstacle collision → mark dead
    const hitObs = obstacles.some(obs =>
      collideRectCircle(
        this.pos.x, this.pos.y,
        PLAYER_SIZE, PLAYER_SIZE,
        obs.getCenterX(), obs.getCenterY(),
        obs.getRadius() * 2
      )
    );
    if (hitObs) {
      this.isDead = true;
    }
  }

  fade(amount) {
    const a = max(0, alpha(this.col) - amount);
    this.col.setAlpha(a);
  }

  calculateFitness() {
    if (this.reachedGoal) {
      this.fitness = 1.0/16 + 10000.0 / (this.brain.step ** 2);
    } else {
      const d = dist(this.pos.x, this.pos.y, goal.x, goal.y);
      this.fitness = 1.0 / (d * d);
    }
  }

  retrieveChild() {
    const child = new Square(alpha(this.col));
    child.brain = this.brain.clone();
    return child;
  }
}
