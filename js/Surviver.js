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
}

// Update coordinates to move Surviver
Surviver.prototype.move = function(kMap) {
    // north
    if (kMap[87]) { //_.contains(keyPressArray, 87)) {
        this.y -= 1;
    }
    // east
    if (kMap[68]) { //_.contains(keyPressArray, 68)) {
        this.x += 1;
    }
    // south
    if (kMap[83]) { //_.contains(keyPressArray, 83)) {
        this.y += 1;
    }
    // west
    if (kMap[65]) { //_.contains(keyPressArray, 65)) {
        this.x -= 1;
    }
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

    // Set source variables
    var sx = fIndex * w / hFrames;
    var sy = (vFrames - 2) * fSize;//fIndex * h / vFrames;
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

    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        // If the current frame index is in range
        if (this.frameIndex < this.numberOfHFrames - 1) {	
            // Go to the next frame
            this.frameIndex += 1;
        }	
        else if (this.loop) {
            this.frameIndex = 0;
        }
    }
}