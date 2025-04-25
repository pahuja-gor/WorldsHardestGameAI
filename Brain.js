class Brain {
  constructor(size) {
    this.step = 0;
    this.directions = Array(size);
    this.randomize();
  }

  getRandomDirection() {
    var randomNumber = floor(random(9));
    switch(randomNumber) {
    case 0:
      return createVector(0, 1);
    case 1:
      return createVector(1, 1);
    case 2:
      return createVector(1, 0);
    case 3:
      return createVector(1, -1);
    case 4:
      return createVector(0, -1);
    case 5:
      return createVector(-1, -1);
    case 6:
      return createVector(-1, 0);
    case 7:
      return createVector(-1, 1);
    case 8:
      return createVector(0, 0);
    }

    return createVector();
  }

  randomize() {
    for (let i = 0; i < this.directions.length; i++) {
      this.directions[i] = this.getRandomDirection();
    }
  }

  clone() {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i].copy();
    }

    return clone;
  }

  mutate() {
    let mutationRate = 0.01;
    for (let i = 0; i < this.directions.length; i++) {
      let rand = random();
      if (rand < mutationRate) {
        // set this direction as a random direction
        this.directions[i] = this.getRandomDirection();
      }
    }
  }

  increaseMoves(increment) {
    for (let i = 0; i < increment; i ++) {
      this.directions.push(this.getRandomDirection());
    }
  }
}
