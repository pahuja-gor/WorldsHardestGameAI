class Dot {
  constructor() {
    this.isDead = false;
    this.reachedGoal = false;
    this.isBest = false;
    this.fitness = 0;

    this.brain = new Brain(1000);
    this.pos = createVector(width / 2, height - 10);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  show() {
    if (this.isBest) {
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, 8, 8);
    } else {
      fill(0);
      ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

  move() {
    if (this.brain.directions.length > this.brain.step) {
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    } else {
      this.isDead = true;
    }

    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  update() {
    if (!this.isDead && !this.reachedGoal) {
      this.move();

      if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
        this.isDead = true;
      } else if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
        this.reachedGoal = true;
      } 
      else if (this.pos.x > 0 && this.pos.x < 600 && this.pos.y > 300 && this.pos.y < 310) {
        this.isDead = true;
      } 
      else if (this.pos.x > 200 && this.pos.x < 800 && this.pos.y > 500 && this.pos.y < 510) {
        this.isDead = true;
      }
    }
  }

  calculateFitness() {
    if (this.reachedGoal) {
      this.fitness = 1.0 / 16.0 + 10000.0 / float(this.brain.step * this.brain.step);
    } else {
      let distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
      this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
    }
  }

  retrieveChild() {
    let child = new Dot();
    child.brain = this.brain.clone();

    return child;
  }
}
