class Square {
  constructor() {
    this.isDead = false;
    this.reachedGoal = false;
    this.isBest = false;
    this.fitness = 0;

    this.brain = new Brain(1000);
    this.pos = createVector(152.5, 312.5);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  show() {
    if (this.isBest) {
      fill(0, 255, 0);
      square(this.pos.x, this.pos.y, 30);
    } else {
      fill(255, 0, 0);
      square(this.pos.x, this.pos.y, 30);
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

  // work on keeping squares from going all over the place
  // add a feature that marks isDead as true if the square hits one of the blue obstacles
  // make sure squares don't go out of the arena/walls
  // change goal.x and y to not be a point but rather a boundary

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

  collision(obstacle) {
    let cx = obstacle.getCenterX();
    let cy = obstacle.getCenterY();
    let radius = obstacle.getRadius();

    // Find the closest point to the circle within the rectangle
    let closestX = constrain(cx, this.pos.x, this.pos.x + 30);
    let closestY = constrain(cy, ry, this.pos.y + 30);
  
    // Calculate the distance between the circle's center and this closest point
    let dx = cx - closestX;
    let dy = cy - closestY;
  
    // If the distance is less than the circle's radius, there's a collision
    return (dx * dx + dy * dy) < (radius * radius);
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
    let child = new Square();
    child.brain = this.brain.clone();

    return child;
  }
}
