<!DOCTYPE html>
<html>
	<head>
		<title>starting screen</title>
		<style type="text/css">
			body {
				background-image: url("../bg_image/pixel_bg.jpg.img.jpg");
			}
			
			#startScreen {
				background-color: grey;
				text-align: center;
				position: fixed;
				top: 50%;
				left: 50%;
				margin-top: -50px; 
				margin-left: -100px;
				padding: 50px;
			}
		</style>
	</head>
	<body>
		<div id="startScreen">
            <h2>IndHorror current highscore</h2>
            <span id="points"></span>
			<h2>IndHorror</h2>
			<button onclick="window.location.href='http://localhost/javascriptEindopdracht/IndHorror/impact/'">go back to start screen</button>
		</div>
		<script>
			document.getElementById('points').innerText = "highscore points: " + localStorage.getItem('point');
		</script>
	</body>
</html>