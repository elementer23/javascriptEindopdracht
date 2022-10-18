//the basic setup need for every new entity file
//call the module and set the 'game.entities.file_name'
//require the impact.entity and set the defines function
ig.module('game.entities.player')

.requires('impact.entity')

.defines(function() {

    //set the Entity and call the extend 
    //set all the necessary variables 
    EntityPlayer = ig.Entity.extend({
        size: {x:16, y:16},
        flip: false,
        gravityFactor: 1,
        maxVel: {x: 100,y: 150},
        friction: {x: 600,y: 0},
        animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
        speed: 150,
        jump_speed: -200,
        crouch_speed: 200,
        //set the entity type
        type: ig.Entity.TYPE.A,

        init: function(x,y,settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [4]);
            this.addAnim('walk', 0.1, [0,1,2,1]);
            this.addAnim('jump', 0.1, [3]);
        },

        //check on update whether the user has pressed a arrow key
        //if pressed change the acceleration of the x axis
        update: function(){
            this.parent();
            if(ig.input.state("left")){
                this.accel.x = -this.speed;
                this.flip = true;
            } else if(ig.input.state("right")){
                this.accel.x = this.speed;
                this.flip = false;
            }else{
                this.accel.x = 0;
            }
            
            //check whether the user pressed the spacebar and change the y axis velocity
            if(ig.input.pressed("jump") && this.standing){
                this.vel.y = this.jump_speed;
                let sound = new ig.Sound('media/jump.ogg');
                sound.play();
            }

            //check what the input from the user is
            //and set teh according animation when input is received or not
            if (!this.standing) {
                this.currentAnim = this.anims.jump;
            } else if (this.vel.x == 0) {
                this.currentAnim = this.anims.idle;
            } else {
                this.currentAnim = this.anims.walk;
            }

            this.currentAnim.flip.x = this.flip;


            //check if the player position is higher than the in game canvas resolution height
            //if it is higher, then kill and respawn the player in the original spawn position
            if (this.pos.y > (ig.system.height + 700)) {
                this.kill();
            }
        }, 

        kill: function(){
            // reset the player position instead of destroying it
            this.pos.x = 60;				
            this.pos.y = 864;
            //reset the health amount when the player dies
            this.health = 10;
        }        
    })

});