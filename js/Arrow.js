// Create Arrow object
function Arrow(options) {
    
    // Drawing properties
    this.ctx = options.ctx;
    this.image = options.image;
    this.width = this.image.width;
    this.height = this.image.height;

    // Animation settings
    this.direction = options.direction;
    this.x = options.x;
    this.y = options.y + 6; // 6 is temp correction ammount 

}

// Draw arrow flight animation
Arrow.prototype.renderArrow = function() {
    this.updatePosition();
    this.ctx.drawImage(this.image, this.x, this.y);
}

// Move arrow in correct direction
Arrow.prototype.updatePosition = function() {
    var moveSpeed = 8;
    switch (this.direction) {
        case "North":
            this.y -= moveSpeed;
            break;
        case "East":
            this.x += moveSpeed;
            break;
        case "South":
            this.y += moveSpeed;
            break;
        case "West":
            this.x -= moveSpeed;
            break;
    }
}

// Check is arrow is off canvas
Arrow.prototype.isOffScreen = function() {
    var isOffScreen = false;
    switch (this.direction) {
        case "North":
            isOffScreen = this.y < 0;
            break;
        case "East":
            isOffScreen = this.x > this.ctx.offsetWidth;
            break;
        case "South":
            isOffScreen = this.y > this.ctx.offsetHeight;
            break;
        case "West":
            isOffScreen = this.x < 0;
            break;
    }
}