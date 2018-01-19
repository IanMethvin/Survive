function Surviver(options) {

    //Drawing properties
    this.ctx = options.ctx;
    this.image = options.image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.frameSize = options.frameSize;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfHFrames = suriverImage.width / this.frameSize;
    this.numberOfVFrames = suriverImage.height / this.frameSize;
    this.loop = options.loop;


    
    // this.startingX = x;
    // this.startingy = y;

    //this.render();
}

// Draw the animation
Surviver.prototype.render = function() {
    // Rename variables for convenience 
    var img = this.image;
    var w = this.width;//this.width;
    var h = this.height;//this.height;
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
    var dx = 0;
    var dy = 0;
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

Surviver.prototype.update = function() {
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