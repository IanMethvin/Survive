var TO_RADIANS = Math.PI/180; 

// Create Arrow object
function Arrow(options) {
    
    // Drawing properties
    this.state = options.state;
    this.ctx = this.state.ctx;
    this.image = options.image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.centerX = this.ctx.width / 2;
    this.centerY = this.ctx.height / 2;
    this.directions = state.directions;
    this.edges = state.edges; 

    // Animation settings
    this.direction = options.direction;
    this.x = options.x;
    this.y = options.y + 6; // 6 is temp correction ammount 
    this.moveSpeed = 8;

    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
}

// Draw arrow flight animation
Arrow.prototype.renderArrow = function() {
    this.updatePosition();
    this.ctx.drawImage(this.image, this.x, this.y);
}

// Move arrow in correct direction
Arrow.prototype.updatePosition = function() {
    var ms = this.moveSpeed;
    var dirs = this.directions;
    switch (this.direction) {
        case dirs["N"]:
            this.y -= ms;
            break;
        case dirs["E"]:
            this.x += ms;
            break;
        case dirs["S"]:
            this.y += ms;
            break;
        case dirs["W"]:
            this.x -= ms;
            break;
    }
}

// Check is arrow is off canvas
Arrow.prototype.isOffScreen = function() {
    var isOffScreen = false;
    var dirs = this.directions;
    var e = this.edges;
    var padding = 50;
    switch (this.direction) {
        case dirs["N"]:
            isOffScreen = this.y < e[dirs["N"]] - padding;
            break;
        case dirs["E"]:
            isOffScreen = this.x > e[dirs["E"]] + padding;
            break;
        case dirs["S"]:
            isOffScreen = this.y > e[dirs["S"]] + padding;
            break;
        case dirs["W"]:
            isOffScreen = this.x < e[dirs["W"]] + padding;
            break;
    }
    return isOffScreen;
}