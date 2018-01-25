// Create Surviver object
function Surviver(options) {

    // Drawing properties
    this.ctx = options.ctx;
    this.image = options.image;
    this.width = this.image.width;
    this.height = this.image.height;

    // Animation settings
    this.frameSize = options.frameSize;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfHFrames = suriverImage.width / this.frameSize;
    this.numberOfVFrames = suriverImage.height / this.frameSize;
    this.loop = options.loop;

    // Position settings
    this.x = options.x;
    this.y = options.y;
    this.moving = false;
    this.direction = "East";
    this.action = "move";

    // Attack settings
    this.isAttacking = false;
    this.quiver = [];

    // Map for frame locations in sprite map
    this.movementMap = {
        "moveFrames": 9,
        "moveNorth": 8,
        "moveEast": 11,
        "moveSouth": 10,
        "moveWest": 9,
        "attackFrames": 11,
        "attackNorth": 16,
        "attackEast": 19,
        "attackSouth": 18,
        "attackWest": 17,
        "arrowFire": 9
    }

    this.setFramePosition();
}

// Update coordinates to move Surviver
Surviver.prototype.move = function(kMap) {
    // north
    if (kMap[87]) { 
        this.y -= 1;
        this.direction = "North";
    }
    // east
    if (kMap[68]) { 
        this.x += 1;
        this.direction = "East";
    }
    // south
    if (kMap[83]) { 
        this.y += 1;
        this.direction = "South";
    }
    // west
    if (kMap[65]) {
        this.x -= 1;
        this.direction = "West";
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

// Draw the animation
Surviver.prototype.renderSprite = function() {
    // Rename variables for convenience 
    var img = this.image;
    var w = this.width;
    var h = this.height;
    var fSize = this.frameSize;
    var fIndex = this.frameIndex;
    var hFrames = this.numberOfHFrames;
    var vFrames = this.numberOfVFrames;
    var vfIndex = this.vFrameIndex;

    // Set source variables
    var sx = fIndex * w / hFrames;
    var sy = vfIndex * fSize; //(vFrames - 2) * fSize;//fIndex * h / vFrames;
    var sw = w / hFrames;
    var sh = h / vFrames;//vFrames;

    // Set destination variables 
    var dx = this.x;
    var dy = this.y;
    var dw = w / hFrames;
    var dh = h / vFrames;

    this.ctx.drawImage(
        img, // Source image object
        sx, // Source x
        sy, // Source y
        sw, // Source width
        sh, // Source height
        dx, // Destination x
        dy, // Destination y
        dw, // Destination width
        dh // Destination height
    );
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
                        ctx: this.ctx,
                        image: arrowImage,
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

Surviver.prototype.stopAction = function() {  
    this.moving = false;
    this.action = "move";
}

// Set frame index based off action and update number of frames for that action
Surviver.prototype.setFramePosition = function() {
    this.vFrameIndex = this.movementMap[this.action + this.direction];
    this.hFrameCount = this.movementMap[this.action + "Frames"];
}