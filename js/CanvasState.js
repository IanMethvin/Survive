// Constructor for the current state of the canvas
function CanvasState(canvas) {
    var state = this;

    // Initialize canvas properties
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    // Create surviver
    surviver = new Surviver({
        ctx: this.ctx,
        image: suriverImage,
        frameSize: 64,
        ticksPerFrame: 15,
        loop: true,
        x: 10,
        y: 10
    });

    this.keyMap = {65: false, 68: false, 83: false, 87: false};
    window.addEventListener("keydown", function(e) {
        var map = state.keyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            surviver.move(map);
        }
    });
    window.addEventListener("keyup", function(e) {
        var map = state.keyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = false;
        }
    });

    this.draw();
}


// Draw game 
CanvasState.prototype.draw = function () {
    var drawer = this;

    // create sprite drawing interval
    var spriteInterval = setInterval( 
        function() { 
            drawer.drawBackground();
            surviver.updateSprite();
            surviver.renderSprite();
        }, 10);
}

CanvasState.prototype.drawBackground = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;
    this.clear();

    // Fill in 
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, w, h);
}

// Clear the canvas
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}