var TO_RADIANS = Math.PI/180; 

// Create Arrow object
function Arrow(options) {
    
    // Drawing properties
    this.ctx = options.ctx;
    this.image = options.image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.centerX = this.ctx.width / 2;
    this.centerY = this.ctx.height / 2;

    // Animation settings
    this.direction = options.direction;
    this.x = options.x;
    this.y = options.y + 6; // 6 is temp correction ammount 

    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);

    
}

// Draw arrow flight animation
Arrow.prototype.renderArrow = function() {
    var ctx = this.ctx;
    this.updatePosition();
    ctx.drawImage(this.image, this.x, this.y);
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
            isOffScreen = this.y < -75;
            break;
        case "East":
            isOffScreen = this.x > 800;
            break;
        case "South":
            isOffScreen = this.y > 800;
            break;
        case "West":
            isOffScreen = this.x < -75;
            break;
    }
    return isOffScreen;
}