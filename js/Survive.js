var canvas = {};
var state = {};
var suriverImage;

function initializeGameState() {
    canvas = $("#gameCanvas");
    state = new CanvasState(canvas[0]);
    preload();
}

function preload() {
        // hardcoded for now, this should come from a property elsewhere
        suriverImage = new Image();        
        suriverImage.onload = function() {
            state.draw();
        }
        suriverImage.src = "img/spriteBow.png";
        suriverImage.addEventListener("load", state.gameLoop);
}