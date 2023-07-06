<!-- Home Page -->

<script type="text/javascript">
	import Header  from './header/+page.svelte'
	import About from './about/+page.svelte'
	import {userStore, addUserDB} from '../firebaseClient.js';
</script>

<Header />

<body>
	<div id="video-container">
		<video preload="true" muted loop playsinline poster="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltb914ab2eb409025a/6494cf0a71e092fafde8e382/Valorant_Deadlock_Homepage_Thumbnail.jpg" data-testid="hero:video" autoplay>
		  <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltee455c2e719bb8b9/6494cf1ef1585c219370578e/Valorant_Deadlock_Homepage_Desktop.mp4" type="video/mp4">
		</video>
	</div>	  
	<div class="main-text">
		Valorant Friend Finder
	</div>
</body>

<About />

<style>
	video {
		width: 100%;
		height: auto;
		min-height: 100%;
		object-fit: cover;
	}

	.main-text {
		position: absolute;
		top: 50%;
		left: 40%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		font-weight: bold;
		font-family: Impact, Charcoal, sans-serif;
		color: #ff4655;
		white-space: pre-wrap; /* Allow text to wrap to new line */
		text-align: left; /* Center the text within the container */
		font-size: 9em; /* Increase the font size */
		line-height: 1em;
	}
</style>
