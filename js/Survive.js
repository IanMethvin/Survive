var canvas = {};
var state = {};
var suriverImage;
var mobImages = {};
var arrowImages = {};

function initializeGameState() {
    canvas = $("#gameCanvas");
    preloadImages();
}

function preloadImages() {
        loadSurviverImage();
        loadMobImages();
        loadArrowImages();
}

function loadSurviverImage() {
    suriverImage = new Image();       
    suriverImage.onload = function() {
        state = new CanvasState(canvas[0]);
    }
    suriverImage.src = "img/spriteBow.png";
}

function loadMobImages() {
    var mobSkeleton = new Image();
    mobSkeleton.src = "img/spriteSkeleton.png";
    mobImages["Skeleton"] = mobSkeleton;
}

function loadArrowImages() {
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

function extend(base, sub) {
    // Avoid instantiating the base class just to setup inheritance
    // Also, do a recursive merge of two prototypes, so we don't overwrite 
    // the existing prototype, but still maintain the inheritance chain
    // Thanks to @ccnokes
    var origProto = sub.prototype;
    sub.prototype = Object.create(base.prototype);
    for (var key in origProto)  {
       sub.prototype[key] = origProto[key];
    }
    // The constructor property was set wrong, let's fix it
    Object.defineProperty(sub.prototype, 'constructor', { 
      enumerable: false, 
      value: sub 
    });
  }