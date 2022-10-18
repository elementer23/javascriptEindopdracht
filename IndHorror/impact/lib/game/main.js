ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	//All levels
	'game.levels.level_1',

	//debug mode reference
	'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	player: null,
	score_points: 0,
	has_key: "no",
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW,'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW,'right');
		ig.input.bind(ig.KEY.SPACE,'jump');

		//load the level
		this.loadLevel(LevelLevel_1);

		//background music
		ig.music.add('media/eric_skiff_we_are_the_resistors.ogg');
		ig.music.play();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		this.player = this.getEntitiesByType( EntityPlayer )[0];
		
		if( this.player ) {
			this.screen.x = this.player.pos.x - ig.system.width/2;
			this.screen.y = this.player.pos.y - ig.system.height/2;
	  	}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		//draw the score amount
		this.font.draw('Score: ' + this.score_points + " /", 10, 10, ig.Font.ALIGN.LEFT);
		//draw the amount of health the player has 
		this.font.draw('Health: ' + this.player.health + " /", 60, 10, ig.Font.ALIGN.LEFT );
		//draw if you have a key or not
		this.font.draw('Has Key: ' + this.has_key + " /", 120, 10, ig.Font.ALIGN.LEFT);
		//draw the amount of points there are left for you to get in order to get the key
		if (this.score_points >= 400) {
			this.font.draw("enough points for the key", 180, 10, ig.Font.ALIGN.LEFT);
		} else {
			this.font.draw("points needed for key: 400", 180, 10, ig.Font.ALIGN.LEFT);
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});

for (let i = 0; i < 10; i++) {
	console.log(i);
}
 