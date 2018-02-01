// Constructor for the current state of the canvas
function CanvasState(canvas) {
    var state = this;

    // Initialize canvas properties
    this.canvas = canvas;
    this.width = canvas.width;//window.innerWidth;
    this.height = canvas.height;//window.innerHeight;
    this.ctx = canvas.getContext('2d');
    this.edges = {
        "North": -12,
        "East": 748,
        "South": 735,
        "West": -12
    };

    this.directions = {
        "N": "North",
        "E": "East",
        "S": "South",
        "W": "West"
    }

    // Create surviver
    this.surviver = new Surviver({
        state: state,
        image: suriverImage,
        frameSize: 64,
        ticksPerFrame: 5,
        loop: true,
        direction: this.directions["S"],
        action: "move",
        x: this.width / 2 - 32,
        y: this.height / 2 - 32
    });

    this.mob = new Mob({
        state: state,
        image: mobImages["Skeleton"],
        frameSize: 64,
        ticksPerFrame: 5,
        loop: true,
        direction: this.directions["S"],
        action: "move",
        x: 100,
        y: 100
    })

    // Map to track key presses
    this.keyMap = {
        16: false, // shift
        32: false, // space
        65: false, // a
        68: false, // d
        83: false, // s
        87: false // w
    };

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

        state.mob.renderSprite();

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
        state.surviver.stopAction(map[32]);
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