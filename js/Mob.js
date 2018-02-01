// Create Mob object
function Mob(options) {

    // Inherit Agent's properties and functions
    Agent.call(this, options);

}

// Setup the prototype chain 
Mob.prototype = Object.create(Agent.prototype);