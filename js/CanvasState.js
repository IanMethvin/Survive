// Constructor for the current state of the canvas
function CanvasState(canvas) {
    var state = this;

    // Initialize canvas properties
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    // Create surviver
    this.surviver = new Surviver({
        ctx: this.ctx,
        image: suriverImage,
        frameSize: 64,
        ticksPerFrame: 8,
        loop: true,
        x: 10,
        y: 10
    });

    // Map to track key presses
    this.keyMap = {32: false, 65: false, 68: false, 83: false, 87: false};
    window.addEventListener("keydown", function(e) {
        var map = state.keyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            state.checkMotion();
        }
    });
    window.addEventListener("keyup", function(e) {
        var map = state.keyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = false;
            state.checkMotion();
        }
    });

    // start the animation
    requestAnimationFrame(draw);
    function draw() {
        state.drawBackground();
        state.surviver.updateSprite();
        state.surviver.renderSprite();
        requestAnimationFrame(draw);
    }
}

// Check if any movement or action is occuring and update accordingly 
CanvasState.prototype.checkMotion = function(map) {
    var map = this.keyMap;
    var action = false;
    for (var key in map) {
        if (map[key]) {
            action = true;
            state.surviver.move(map);
            break;
        }
    }
    if (!action) {
        state.surviver.moving = false;
        state.surviver.action = "move";
        this.frameIndex = 1;
    }
}

// Fill in background display 
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