class Brain {
  constructor(size) {
    this.step = 0;
    this.directions = Array(size);
    this.randomize();
  }

  randomize() {
    for (let i = 0; i < this.directions.length; i++) {
      let randomAngle = random(TWO_PI);
      this.directions[i] = p5.Vector.fromAngle(randomAngle);
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
        let randomAngle = random(TWO_PI);
        this.directions[i] = p5.Vector.fromAngle(randomAngle);
      }
    }
  }
}
