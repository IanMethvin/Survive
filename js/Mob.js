// Create Mob object
function Mob(options) {

    // Inherit Agent's properties and functions
    Agent.call(this, options);

    this.attackType = "slash";
}

// Setup the prototype chain 
Mob.prototype = Object.create(Agent.prototype);

Mob.prototype.generateKMap = function(sx, sy) {
    var x = this.x;
    var y = this.y;
    var fs = this.frameSize;
    var kMap = {
        16: false, // shift
        32: false, // space
        65: false, // a
        68: false, // d
        83: false, // s
        87: false // w
    };

    if (x < sx) {
        kMap[68] = true;
    }
    else if (x > sx) {
        kMap[65] = true;
    }
    if (y < sy) {
        kMap[83] = true;
    }
    else if (y > sy) {
        kMap[87] = true;
    }

    if (x < sx + fs && x + fs > sx && y < sy + fs && y + fs > sy) {
        kMap[32] = true;
    }

    return kMap;
}

Mob.prototype.updateSprite = function() {
    this.tickCount += 1;
    // Only move frame index if in motion
    if (this.isAttacking || this.moving) {
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.hFrameCount - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
            }	
            else if (this.loop) {
                // check if attack animation has completed, if so switch to 'move' frame
                if (this.action != "slash") {
                    this.isAttacking = false;
                    this.action = "move";
                    this.setFramePosition();
                }
                this.frameIndex = 0;
            }
        }
    }
}