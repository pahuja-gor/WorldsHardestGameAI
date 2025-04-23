class Obstacle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.pos = createVector(this.x, this.y);
        this.vel = createVector(1, 0);
    }
  
    show() {
        fill(color("blue"));
        circle(this.pos.x, this.pos.y, this.size);
    }
  
    move() {
        if (this.pos.x == 895) {
            this.vel.x = -5;
        }
        else if (this.pos.x == 375) {
            this.vel.x = 5;
        }
        this.x += this.vel;
        this.pos.add(this.vel);
        console.log('pos:' + this.pos);
        console.log('vel:' + this.vel);
    }

    getCenterX() {
        return this.pos.x;
    }
    
    getCenterY() {
        return this.pos.y;
    }
    
    getRadius() {
        return this.size / 2;
    }
  }
  