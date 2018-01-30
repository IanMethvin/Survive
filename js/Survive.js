var canvas = {};
var state = {};
var suriverImage;
var arrowImages = {};

function initializeGameState() {
    canvas = $("#gameCanvas");
    preload();
}

function preload() {
        // hardcoded for now, this should come from a property elsewhere
        suriverImage = new Image();//Image(416, 672);        
        suriverImage.onload = function() {
            state = new CanvasState(canvas[0]);
        }
        suriverImage.src = "img/spriteBow.png";

        var arrowNorth = new Image();
        arrowNorth.src = "img/arrowNorth.png";
        arrowImages["North"] = arrowNorth;

        var arrowEast = new Image();
        arrowEast.src = "img/arrowEast.png";
        arrowImages["East"] = arrowEast;

        var arrowSouth = new Image();
        arrowSouth.src = "img/arrowSouth.png";
        arrowImages["South"] = arrowSouth;

        var arrowWest = new Image();
        arrowWest.src = "img/arrowWest.png";
        arrowImages["West"] = arrowWest;
}
