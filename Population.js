class Population {
  constructor(size) {
    this.dots = new Array(size);

    for (let i = 0; i < size; i++) {
      this.dots[i] = new Dot();
    }
    
    this.fitnessSum = 0.0;
    this.gen = 1;
    this.bestDot = 0;
    this.minStep = 1000;
  }

  show() {
    for (let i = 1; i < this.dots.length; i++) {
      this.dots[i].show();
    }
    this.dots[0].show();
  }

  update() {
    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].brain.step > this.minStep) {
        this.dots[i].isDead = true;
      } else {
        this.dots[i].update();
      }
    }
  }

  calculateFitness() {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].calculateFitness();
    }
  }

  areAllDotsDead() {
    for (let i = 0; i < this.dots.length; i++) {
      if (!this.dots[i].isDead && !this.dots[i].reachedGoal) {
        return false;
      }
    }
    return true;
  }

  naturalSelection() {
    let newDots = new Array(this.dots.length);
    this.setBestDot();
    this.calculateFitnessSum();

    newDots[0] = this.dots[this.bestDot].retrieveChild();
    newDots[0].isBest = true;

    for (let i = 1; i < newDots.length; i++) {
      // select parent based on fitness
      let parent = this.selectFitParent();

      // get the fit parent's child
      newDots[i] = parent.retrieveChild();
    }

    this.dots = [...newDots];
    this.gen++;
  }

  calculateFitnessSum() {
    this.fitnessSum = 0;
    for (let i = 0; i < this.dots.length; i++) {
      this.fitnessSum += this.dots[i].fitness;
    }
  }

  selectFitParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;

    for (let i = 0; i < this.dots.length; i++) {
      runningSum += this.dots[i].fitness;
      if (runningSum > rand) {
        return this.dots[i];
      }
    }
    return null;
  }

  mutateChildren() {
    for (let i = 1; i < this.dots.length; i++) {
      this.dots[i].brain.mutate();
    }
  }

  setBestDot() {
    let max = 0;
    let maxIndex = 0;

    for (let i = 0; i < this.dots.length; i++) {
      if (this.dots[i].fitness > max) {
        max = this.dots[i].fitness;
        maxIndex = i;
      }
    }

    this.bestDot = maxIndex;

    if (this.dots[this.bestDot].reachedGoal) {
      this.minStep = this.dots[this.bestDot].brain.step;
    }
  }
}
