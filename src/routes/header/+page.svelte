<script>
	import {userStore, loginWithGoogle, logOut, addUserDB} from '../../firebaseClient.js';
	import SearchUser from '../search/+page.svelte';
</script>


<main>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <a class="navbar-brand" href="/">VFF</a>
	  <SearchUser />
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarNav">
	    <ul class="navbar-nav ml-auto">
	      <li class="nav-item">
	        <a class="nav-link" href="/about">About</a>
		  </li>
	        	{#if $userStore}
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{$userStore.displayName}
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="/profile">Profile</a>
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
</style>