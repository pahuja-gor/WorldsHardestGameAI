class Population {
  constructor(size) {
    this.squares = new Array(size);

    for (let i = 0; i < size; i++) {
      this.squares[i] = new Square();
    }

    this.fitnessSum = 0.0;
    this.gen = 1;
    this.bestSquare = 0;
    this.minStep = 1000;
  }

  show() {
    for (let i = 1; i < this.squares.length; i++) {
      this.squares[i].show();
    }
    this.squares[0].show();
  }

  update() {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i].brain.step > this.minStep) {
        this.squares[i].isDead = true;
      } else {
        this.squares[i].update();
      }
    }
  }

  calculateFitness() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].calculateFitness();
    }
  }

  areAllSquaresDead() {
    for (let i = 0; i < this.squares.length; i++) {
      if (!this.squares[i].isDead && !this.squares[i].reachedGoal) {
        return false;
      }
    }
    return true;
  }

  naturalSelection() {
    let newSquares = new Array(this.squares.length);
    this.setBestSquare();
    this.calculateFitnessSum();

    newSquares[0] = this.squares[this.bestSquare].retrieveChild();
    newSquares[0].isBest = true;

    for (let i = 1; i < newSquares.length; i++) {
      // select parent based on fitness
      let parent = this.selectFitParent();

      // get the fit parent's child
      newSquares[i] = parent.retrieveChild();
    }

    this.squares = [...newSquares];
    this.gen++;
  }

  calculateFitnessSum() {
    this.fitnessSum = 0;
    for (let i = 0; i < this.squares.length; i++) {
      this.fitnessSum += this.squares[i].fitness;
    }
  }

  selectFitParent() {
    let rand = random(this.fitnessSum);
    let runningSum = 0;

    for (let i = 0; i < this.squares.length; i++) {
      runningSum += this.squares[i].fitness;
      if (runningSum > rand) {
        return this.squares[i];
      }
    }
    return null;
  }

  mutateChildren() {
    for (let i = 1; i < this.squares.length; i++) {
      this.squares[i].brain.mutate();
    }
  }

  setBestSquare() {
    let max = 0;
    let maxIndex = 0;

    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i].fitness > max) {
        max = this.squares[i].fitness;
        maxIndex = i;
      }
    }

    this.bestSquare = maxIndex;

    if (this.squares[this.bestSquare].reachedGoal) {
      this.minStep = this.squares[this.bestSquare].brain.step;
    }
  }
}
