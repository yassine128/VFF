<!--

    The profile will need uid | rank | rating 

    The profile page will also have all the user posts under / I will make it another component 
-->

<script>
	import Header  from '../header/+page.svelte'
	import { userStore } from '../../firebaseClient.js'
	import { navigate } from "svelte-routing";
	import { onMount } from 'svelte';

	onMount(() => {
	    if ($userStore == null){
	      window.location.replace("/"); 
	    }
  	});
</script>

<Header />
<div class="profile-container">
	{#if $userStore}
	    <div style="height: 150px; background: #383838;"></div>
	    <img src=https://pfps.gg/assets/pfps/7620-reyna-mcdonald-s-pfp.png alt="Profile Photo">
	    <h1>{$userStore.displayName}</h1>
	    <h2>{$userStore.email}</h2>
    {/if}
</div>

<style>
    .profile-container {
        font-family: Arial, sans-serif;
        background-color: #383838;
        color: white;
        padding: 20px;
        text-align: center;
    }

    .profile-container img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid white;
        margin-top: -50px;
    }

    .profile-container h1 {
        margin: 10px 0;
        font-size: 24px;
    }

    .profile-container h2 {
        margin: 0;
        font-size: 16px;
    }
</style>