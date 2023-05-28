<!--

    The profile will need uid | rank | rating 

    The profile page will also have all the user posts under / I will make it another component 
-->

<script>
	import Header  from '../header/+page.svelte'
	import { userStore, userData } from '../../firebaseClient.js'
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
        <div class="left-section">
            <img src="/{$userData[0]}_1_Rank.png" alt="rank logo">
            <div class="rating">
                {#if $userData[1] >= 1}★{:else}☆{/if}
                {#if $userData[1] >= 2}★{:else}☆{/if}
                {#if $userData[1] >= 3}★{:else}☆{/if}
                {#if $userData[1] >= 4}★{:else}☆{/if}
                {#if $userData[1] >= 5}★{:else}☆{/if}
            </div>
        </div>
        <div class="right-section">
            <div style="height: 150px; background: #383838;"></div>
            <img src="https://pfps.gg/assets/pfps/7620-reyna-mcdonald-s-pfp.png" alt="Profile Photo">
            <h1>{$userStore.displayName}</h1>
            <h2>{$userStore.email}</h2>
        </div>
    {/if}
</div>

<style>
    .profile-container {
        font-family: Arial, sans-serif;
        background-color: #383838;
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }

    .left-section {
        flex: 1;
        padding-right: 20px;
        border-right: 1px solid white;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rating {
        text-align: center;
        font-size: 24px;  /* adjust as needed */
    }

    .right-section {
        flex: 1;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .profile-container img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
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

