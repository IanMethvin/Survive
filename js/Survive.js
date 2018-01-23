var canvas = {};
var state = {};
var suriverImage;

function initializeGameState() {
    canvas = $("#gameCanvas");
    preload();
}

function preload() {
        // hardcoded for now, this should come from a property elsewhere
        suriverImage = new Image();//Image(416, 672);        
        suriverImage.onload = function() {
            
            state = new CanvasState(canvas[0]);
            //state.draw();
        }
        suriverImage.src = "img/spriteBow.png";
}
