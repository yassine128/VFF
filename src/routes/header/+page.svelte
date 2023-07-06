<script>
	import {userStore, loginWithGoogle, logOut, addUserDB} from '../../firebaseClient.js';
	import SearchUser from '../search/+page.svelte';
</script>

<main>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a class="navbar-brand" href="/">VFF</a>
		<SearchUser />
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item">
				</li>
				{#if $userStore}
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{$userStore.displayName}
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="/profile/{$userStore.uid}">Profile</a>
						<a class="dropdown-item" href="/settings">Settings</a>
						<a class="dropdown-item" on:click={logOut}>Log-Out</a>
					</div>
				</div>
				{:else}
				<a class="nav-link" href="/">
					<span on:click={loginWithGoogle}>Log-In</span>
				</a>
				{/if}
			</ul>
		</div>
	</nav>
</main>

<style>
	.dropdown .btn-secondary {
		background-color: #ff4655;
	}
	.navbar-brand {
		font-size: 2em;
		font-family: Impact, Charcoal, sans-serif;
		color: #ff4655;
	}
	.nav-link {
		color: white;
	}
</style>
