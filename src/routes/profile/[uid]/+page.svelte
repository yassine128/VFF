<script>
    import Header from '../../header/+page.svelte'
    import { page } from '$app/stores';
    import { doc, getDoc } from "firebase/firestore";
    import { db } from '../../../firebaseClient.js';
    const userID = $page.params.uid;

    let rankDisplay = '';
    let ratingDisplay;
    let emailDisplay; 
    let userFound = true; 
    
    async function searchUserByID() {
        const documentRef = doc(db, 'users', userID);
        const docSnap = await getDoc(documentRef);

        if (docSnap.exists()) {
            rankDisplay = docSnap.get('rank');
            ratingDisplay = docSnap.get('rating');
            emailDisplay = docSnap.get('email');
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
            <div class="rating">
                {#if ratingDisplay >= 1}★{:else}☆{/if}
                {#if ratingDisplay >= 2}★{:else}☆{/if}
                {#if ratingDisplay >= 3}★{:else}☆{/if}
                {#if ratingDisplay >= 4}★{:else}☆{/if}
                {#if ratingDisplay >= 5}★{:else}☆{/if}
            </div>
        </div>
        <div class="right-section">
            <div style="height: 150px; background: #383838;"></div>
            <img src="https://pfps.gg/assets/pfps/7620-reyna-mcdonald-s-pfp.png" alt="Profile Photo">
            <h2>{emailDisplay}</h2>
        </div>
</div>

<style>
    .profile-container {
        font-family: Arial, sans-serif;
        background-color: #383838;
        color: white;
        padding: 20px;
        display: flex;
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
        bottom: 50rem;
    }

    .profile-container img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
        margin-top: -50px;
    }

    .profile-container h2 {
        font-size: 16px;
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