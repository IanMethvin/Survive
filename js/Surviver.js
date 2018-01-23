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

    // Map for frame locations in sprite map
    this.movementMap = {
        "moveFrames": 9,
        "moveNorth": 8,
        "moveEast": 11,
        "moveSouth": 10,
        "moveWest": 9,
        "attackFrames": 13,
        "attackNorth": 16,
        "attackEast": 19,
        "attackSouth": 18,
        "attackWest": 17
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
    if (this.action == "attack" || this.moving) {
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.hFrameCount - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
            }	
            else if (this.loop) {
                this.frameIndex = 0;
            }
        }
    }
}

// Set frame index based off action and update number of frames for that action
Surviver.prototype.setFramePosition = function() {
    this.vFrameIndex = this.movementMap[this.action + this.direction];
    this.hFrameCount = this.movementMap[this.action + "Frames"];
}