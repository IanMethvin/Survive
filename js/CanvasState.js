// Constructor for the current state of the canvas
function CanvasState(canvas) {
    var state = this;

    // Initialize canvas properties
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    //this.draw();
}


// Draw game 
CanvasState.prototype.draw = function () {
    var ctx = this.ctx;
    var w = this.width;
    var h = this.height;
    this.clear();

    // Fill in 
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, w, h);

    surviver = new Surviver({
        ctx: ctx,
        image: suriverImage,
        frameSize: 64,
        ticksPerFrame: 15,
        loop: true
    });


    surviver.render();
    var canvas = this;
    var interval = setInterval( 
        function() { 
            canvas.clear();
            surviver.update();
            surviver.render();
        }, 10 );
}

// Clear the canvas
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}