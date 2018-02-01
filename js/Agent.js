 // Create Base Agent object for Surviver & Mob to inherit 
function Agent(options) {

    // Drawing properties
    this.state = options.state;
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
    this.moveSpeed = 3;
    this.boostSpeed = 12;
    this.x = options.x;
    this.y = options.y;
    this.moving = false;
    this.directions = this.state.directions
    this.direction = options.direction;
    this.action = options.action;

    // Attack settings
    this.isAttacking = false;

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

// Draw the animation
Agent.prototype.renderSprite = function() {
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

    this.state.ctx.drawImage(
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

Agent.prototype.stopAction = function() {  
    this.moving = false;
    this.action = "move";
}

// Set frame index based off action and update number of frames for that action
Agent.prototype.setFramePosition = function() {
    this.vFrameIndex = this.movementMap[this.action + this.direction];
    this.hFrameCount = this.movementMap[this.action + "Frames"];
}