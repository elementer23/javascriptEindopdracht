//the basic setup need for every new entity file
//call the module and set the 'game.entities.file_name'
//require the impact.entity and set the defines function
ig.module('game.entities.enemy')

.requires('impact.entity')

.defines(function() {

    //set the Entity and call the extend 
    //set all the necessary variables 
    EntityEnemy = ig.Entity.extend({
        size: {x: 16,y: 16},
        flip: false,
        gravityFactor: 1,
        animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
        deathFlag: false,
        //set the entity type
        type: ig.Entity.TYPE.B,
        //check if the other entity type has touched this entity
        checkAgainst: ig.Entity.TYPE.A,

        init: function(x, y) {
            this.parent(x, y);
            this.addAnim('walk', 0.1, [0,1,2,1]);
        },

        update: function() {
            this.parent();

            if (this.deathFlag) {
                return;
            }

            this.vel.x = 40 * this.turnAround();
            this.currentAnim.flip.x = this.flip;	
        },

        //check in the tilemap array whether there is collision beneath the "enemy" entity
        //if there is keep on walking else set the flip variable to false or true
        turnAround: function() {
            let x = this.pos.x + (this.flip ? + 5 : this.size.x - 5);
            let y = this.pos.y + this.size.y + 5;

            if (!ig.game.collisionMap.getTile(x, y)) {
                this.flip = !this.flip;
            }

            return this.flip ? -1 : 1;
        },

        //if the "player" has "killed" the entity
        //let the "enemy" fall through the world
        //at the same amount of speed as game speed
        handleMovementTrace: function(res) {
            if (this.deathFlag) {
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            } else {
                this.parent(res);
                if (res.collision.x) {
                    this.flip = !this.flip;
                }
            }
        },

        
        check: function(other) {
            //if the "player" entity is above the "enemy" entity
            //and the "player" hits the "enemy" kill the enemy
            if (other.pos.y < this.pos.y && other.vel.y > 0) {
                other.vel.y = -300;
                ig.game.score_points += 30;
                this.kill();
            } else {
                //"kill" the "enemy" entity if it hits the "player" entity
                //and damage the "player" by 4
                other.receiveDamage(4, this);
                this.kill();
            }
        },

        kill: function() {
            this.deathFlag = true;
            this.checkAgainst = ig.Entity.TYPE.NONE;
            this.vel.x = 0;
            this.currentAnim.flip.y = true;
            let sound = new ig.Sound('media/enemy_dead.mp3');
            sound.play();
        }
    });

});