// Create Surviver object
function Surviver(options) {

    // Inherit Agent's properties and functions
    Agent.call(this, options);

    // Surviver specific items
    this.quiver = [];
}

// Setup the prototype chain 
Surviver.prototype = Object.create(Agent.prototype);

// Update coordinates to move Surviver
Surviver.prototype.move = function(kMap) {
    var ms = this.moveSpeed;
    var edges = this.state.edges;
    var dirs = this.directions;
    var d;
    // speed boost for testing
    if (kMap[16]) {
        ms = this.boostSpeed;
    }
    // north
    if (kMap[87]) {
        d = dirs["N"];
        if (this.y >= edges[d]) {
            this.y -= ms;
        }
        this.direction = d;
    }
    // east
    if (kMap[68]) { 
        d = dirs["E"]
        if (this.x <= edges[d]) {
            this.x += ms;
        }
        this.direction = d;
    }
    // south
    if (kMap[83]) { 
        d = dirs["S"];
        if (this.y <= edges[d]) {
            this.y += ms;
        }
        this.direction = d;
    }
    // west
    if (kMap[65]) {
        d = dirs["W"];
        if (this.x >= edges[d]) {
            this.x -= ms;
        }
        this.direction = d;
    }
    // attack
    if (kMap[32]) {
        this.action = "attack";
        this.isAttacking = true;
    }
    else {
        this.action = "move";
        if (this.frameIndex > this.movementMap[this.action + "Frames"]) {
            this.frameIndex = 1;
        }
    }
    // check if directional key is pressed and set movement bool accordingly 
    if (kMap[87] || kMap[68] || kMap[83] || kMap[65]) {
        this.moving = true;
    }
    else {
        this.moving = false;
    }

    this.setFramePosition();
}

// Update sprite frame index for animation
Surviver.prototype.updateSprite = function() {
    this.tickCount += 1;
    // Only move frame index if in motion
    if (this.isAttacking || this.moving) {
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.hFrameCount - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
                // Only fire the arrow once the correct frame has been reached
                if (this.isAttacking && this.frameIndex == this.movementMap["arrowFire"]) {
                    this.quiver.push(new Arrow({
                        state: this.state,
                        image: arrowImages[this.direction],
                        direction: this.direction,
                        x: this.x,
                        y: this.y
                    }));
                }
            }	
            else if (this.loop) {
                // check if attack animation has completed, if so switch to 'move' frame
                if (this.action != "attack") {
                    this.isAttacking = false;
                    this.action = "move";
                    this.setFramePosition();
                }
                this.frameIndex = 0;
            }
        }
    }

    // Draw each arrow
    var remainingArrows = [];
    _.each(this.quiver, function(arrow) {
        arrow.renderArrow();
        // Stop drawing any arrows that are no longer on the canvas
        if (!arrow.isOffScreen()) {
            remainingArrows.push(arrow);
        }
    });
    this.quiver = remainingArrows;
}