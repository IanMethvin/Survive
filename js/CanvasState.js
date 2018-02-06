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

    // Game settings
    this.isGameOver = false;
    this.mobs = [];
    this.mobSpawnCount = 0;
    this.mobSpawnCountLimit = 1000;

    // Create surviver
    this.surviver = new Surviver({
        state: state,
        image: suriverImage,
        ticksPerFrame: 5,
        direction: this.directions["S"],
        action: "move",
        moveSpeed: 3,
        x: this.width / 2 - 32,
        y: this.height / 2 - 32
    });

    // Map to track key presses
    this.surviverKeyMap = {
        16: false, // shift
        32: false, // space
        65: false, // a
        68: false, // d
        83: false, // s
        87: false // w
    };

    window.addEventListener("keydown", function(e) {
        var map = state.surviverKeyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            state.checkMotion();
        }
    });
    window.addEventListener("keyup", function(e) {
        var map = state.surviverKeyMap;
        if (e.keyCode in map) {
            map[e.keyCode] = false;
            state.checkMotion();
        }
    });

    // start the animation
    requestAnimationFrame(draw);
    function draw() {
        var s = state.surviver;
        var ms = state.mobs;

        state.drawBackground();
        state.checkMobSpawn();
        s.updateSprite();
        s.renderSprite();


        _.each(ms, function(m) {
            m.move(m.generateKMap(s.x, s.y));
            m.updateSprite();
            m.renderSprite();

            state.checkMobContactSurviver(m);
        });

        if (!state.isGameOver) {
            requestAnimationFrame(draw);
        }
    }
}

// Check timer and see if it is time to spawn a mob
CanvasState.prototype.checkMobSpawn = function() {
    if (this.mobSpawnCount > this.mobSpawnCountLimit || this.mobs.length == 0) {
        this.mobs.push(new Mob({
            state: this,
            image: mobImages["Skeleton"],
            ticksPerFrame: 10,
            direction: this.directions["S"],
            action: "move",
            moveSpeed: .5,
            x: this.randomX(),
            y: this.randomY()
        }));
        this.mobSpawnCount = 0;
    }
    this.mobSpawnCount += 1;
}

// Write end game message to screen
CanvasState.prototype.endGame = function() {
    this.isGameOver = true;
    var ctx = this.ctx;
    ctx.font = "50px Impact MS";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", this.width/2, this.height/2 - 25); 
}

// Check if Mob has made contact with Surviver
CanvasState.prototype.checkMobContactSurviver = function(m) {
    var s = this.surviver;
    var fs = s.frameSize / 2;
    if (!s.isHurt && m.x < s.x + fs && m.x + fs > s.x && m.y < s.y + fs && m.y + fs > s.y) {
        s.action = "hurt";
        s.frameIndex = 0;
        s.isHurt = true;
        s.setFramePosition();
    }
}

// Check if any movement or action is occuring and update accordingly 
CanvasState.prototype.checkMotion = function(map) {
    var map = this.surviverKeyMap;
    var inAction = false;
    for (var key in map) {
        if (map[key]) {
            inAction = true;
            state.surviver.move(map, "shoot");
            break;
        }
    }
    if (!inAction) {
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

// Generate random x on canvas
CanvasState.prototype.randomX = function() {
    return randomIntFromInterval(0, this.edges["East"]);
}

// Generate random y on canvas
CanvasState.prototype.randomY = function() {
    return randomIntFromInterval(0, this.edges["South"]);
}