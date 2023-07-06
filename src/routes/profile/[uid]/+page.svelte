<script>
    import Header from '../../header/+page.svelte';
    import Comments from '../../comments/+page.svelte';
    import { page } from '$app/stores';
    import { doc, getDoc } from "firebase/firestore";
    import { db } from '../../../firebaseClient.js';
    const userID = $page.params.uid;

    let rankDisplay = '';
    let ratingDisplay;
    let nameDisplay; 
    let userFound = true; 
    
    async function searchUserByID() {
        const documentRef = doc(db, 'users', userID);
        const docSnap = await getDoc(documentRef);

        if (docSnap.exists()) {
            rankDisplay = docSnap.get('rank');
            ratingDisplay = docSnap.get('rating');
            nameDisplay = docSnap.get('name');
        }
        else {
            userFound = false; 
        }
    }
    searchUserByID();
</script>

<Header />
{#if userFound}
<div class="profile-container">
    <div class="left-section">
        <img src="/{rankDisplay}_1_Rank.png" alt="rank logo">
    </div>
    <div class="right-section">
        <h2>{nameDisplay}</h2>
        <div class="rating">
            {#each Array.from({ length: 5 }) as _, i}
                {#if ratingDisplay >= i+1}★{:else}☆{/if}
            {/each}
        </div>
    </div>
</div>
<Comments {userID}/>

<style>
    .profile-container {
        background-color: #383838;
        color: white;
        padding: 20px;
        display: flex;
        align-items: center; /* Center items vertically */
        justify-content: center; /* Center items horizontally */
        margin-left: auto;
        margin-right: auto;
        font-family: Impact, Charcoal, sans-serif;
        color: #ff4655;
    }

    .left-section {
        margin-right: 20px; /* Add spacing between the image and name */
    }

    .left-section img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }

    .right-section {
        display: flex;
        flex-direction: column;
    }

    .profile-container h2 {
        font-size: 3em;
        margin: 0; /* Remove default margin */
    }

    .rating {
        font-size: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .rating span {
        margin-right: 2px; /* Adjust spacing between rating stars */
    }
</style>




{:else}
    <div class="noFound">
        <h1 class="title">User not found</h1>
        <p class="message">The requested user could not be found.</p>
    </div>

    <style>
        .noFound {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50vh;
            text-align: center;
        }
        
        .title {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .message {
          font-size: 18px;
          color: gray;
        }
      </style>
{/if}