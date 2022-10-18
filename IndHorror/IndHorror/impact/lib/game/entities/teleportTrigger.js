//the basic setup need for every new entity file
//call the module and set the 'game.entities.file_name'
//require the impact.entity and set the defines function
ig.module('game.entities.teleportTrigger')

.requires(
    'impact.entity',
    'impact.font'        
)

.defines(function() {

    //set the Entity and call the extend 
    //set all the necessary variables 
    EntityTeleportTrigger = ig.Entity.extend({

        size: {x: 16,y: 16},
        flip: false,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/tiles.png', 16, 16),
        //set the entity type
        type: ig.Entity.TYPE.B,
        //check if the other entity type has touched this entity
        checkAgainst: ig.Entity.TYPE.A,

        //init function only activates once the level starts
        init: function(x, y) {

            this.parent(x, y);
            this.addAnim('idle', 1, [8]);
            
        },

        check: function(other) {
            //use the local storage function to store the highscore for a short amount of time
            localStorage.setItem('point', ig.game.score_points);

            //if the "player" doesn't have the key unlocked
            //then set it back these coördinates
            //else send the user to the highscore page
            if (ig.game.has_key == "no") {
                other.pos.x = 1608;
                other.pos.y = 112;
            } else {
                window.location.href = 'http://localhost/IndHorror/impact/currentHighscore.php';
            }
        }

    });

});