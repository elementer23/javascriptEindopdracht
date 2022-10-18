//the basic setup need for every new entity file
//call the module and set the 'game.entities.file_name'
//require the impact.entity and set the defines function
ig.module('game.entities.key')

.requires(
    'impact.entity',
    'impact.font'        
)

.defines(function() {

    //set the Entity and call the extend 
    //set all the necessary variables 
    EntityKey = ig.Entity.extend({

        size: {x: 25,y: 25},
        flip: false,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/key_art.png', 25, 25),
        //set the entity type
        type: ig.Entity.TYPE.B,
        //check if the other entity type has touched this entity
        checkAgainst: ig.Entity.TYPE.A,

        init: function(x, y) {
            this.parent(x, y);
            this.addAnim('spin', 1, [0,1,2,3]);
        },

        //"kill" the entity if touched by the "player"
        //spawn in the new entity at the same position, the EntityItem has been "killed"
        check: function(other) {
            if (ig.game.score_points >= 400) {
                ig.game.spawnEntity(EntityFedback, this.pos.x, this.pos.y);
                let sound = new ig.Sound('media/pickup.ogg');
                sound.play();
                ig.game.has_key = "yes";
                this.kill();
            } 
        }

    });

    //define a new entity called EntityFedback
    EntityFedback = ig.Entity.extend({
        size: {x:16, y: 16},
        flip: false,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/feedback.png', 16, 16),

        init: function(x, y){
            this.parent(x, y);
            this.addAnim('feedback', 0.1, [0,1,2,3]);
            this.killTimer = new ig.Timer();
        },

        //calling in once the EntityItem has been touched and "killed" 
        //and "kill" it once 0.5 seconds of GAME TIME have passed
        update: function() {
            if (this.killTimer.delta() > 0.5) {
                this.kill();
            }
        },

    });

}); 