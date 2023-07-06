<script>
    // I want to use this component to write comments on another user page
    import { onMount } from 'svelte';
    import { userStore } from '../../firebaseClient';
    import { collection, addDoc, getDocs } from "firebase/firestore";
    import { db, loadComments } from '../../firebaseClient.js';


    export let userID;
    let comment = '';
    let stars = 0; 
    let charCount = 0;
    let listOfComments = [];
    loadComments(userID).then((value) => {
      listOfComments = value; 
    }); 


    // The structure of the comments will be like so: 
    /**
     * Document ID: Random ID
     *  |- Written By: commenter ID (userObj ID)
     *  |- Proile: User ID (Page ID)
     */
    async function addCommentDB() {
        try {
            if ((comment.length > 0 && comment.length <= 140) && $userStore.uid != userID) {
                const collectionRef = collection(db, "comments");
                const docRef = await addDoc(collectionRef, {
                    writtenBy: $userStore.uid, 
                    onProfile: userID, 
                    userComment: comment,
                });
                location.reload();
            } else {
                alert("You can't post a comment on your own profile!"); 
            }
        } catch (error) {}
    };

    /**
     * Updateing the char counter
     */
    async function updateCounter() {
        charCount = comment.length;
    }
</script>

<form>
    <div class="form-group">
        <textarea maxlength="140" bind:value={comment} on:input={updateCounter} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Thoughts on this user? Limit of 140 characters"></textarea>
    </div>
    <div class="sub-form">
        <p>{charCount} characters</p>
        <button on:click={addCommentDB} type="submit" class="btn btn-primary mb-2">Post Comment</button>
    </div>
</form>

{#if listOfComments.length > 0}
  {#each listOfComments as comm}
  <div class="container">
      <div class="comment-box">
          <p class="text"> {comm.userComment} </p>
      </div>
  </div>
  {/each}
{:else}
  <div class="noFound">
        <h1 class="title">No comments found</h1>
    </div>
{/if}


<style type="text/css">
    /*box-shadow: 0px 1px 20px black;*/
    .title {
        font-size: 24px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px;
    }
    textarea {
        resize: none;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sub-form {
        display: flex;
        justify-content: center;
    }
    .sub-form p {
        font-family: Impact, Charcoal, sans-serif;
    }
    .sub-form button {
        font-family: Impact, Charcoal, sans-serif;
        background-color: #ff4655;
    }
    .btn {
        margin-left: 300px;
    }
    .form-group {
        font-family: Impact, Charcoal, sans-serif;
        display: flex;
        justify-content: center;
    }
    .form-control {
        margin-top: 30px;
        box-shadow: 0px 1px 20px black;
        border-radius: 15px;
        overflow-wrap: break-word;
        height: 100px;
        width: 500px; /* Adjust the width to your preference */
        display: flex;
    }
    .comment-box {
        margin: 30px;
        box-shadow: 0px 1px 20px black;
        border-radius: 15px;
        overflow-wrap: break-word;
        height: 100px;
        width: 500px; /* Adjust the width to your preference */
        display: flex;
    }
    .comment-box .text {
        font-family: Impact, Charcoal, sans-serif;
        margin: auto;
        max-width: 100%;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }
</style>