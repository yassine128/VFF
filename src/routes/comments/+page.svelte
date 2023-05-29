<script>
    // I want to use this component to write comments on another user page
    import { onMount } from 'svelte';
    import { userStore } from '../../firebaseClient';
    import { collection, addDoc, getDocs } from "firebase/firestore";
    import { db } from '../../firebaseClient.js';


    export let userID;
    let comment = '';
    let charCount = 0;
    let listOfComments = [];
    // The structure of the comments will be like so: 
    /**
     * Document ID: Random ID
     *  |- Written By: commenter ID (userObj ID)
     *  |- Proile: User ID (Page ID)
     */
    async function addCommentDB() {
        try {
            if (comment.length > 0 && comment.length <= 140) {
                const collectionRef = collection(db, "comments");
                const docRef = await addDoc(collectionRef, {
                    writtenBy: $userStore.uid, 
                    onProfile: userID, 
                    userComment: comment,
                });
            }
        } catch (error) {}
    };

    /**
     * Updateing the char counter
     */
    async function updateCounter() {
        charCount = comment.length;
    }

    /**
     * Function to load the comments on a user page
     */
    async function loadComments() {
        const querySnapshot = await getDocs(collection(db, "comments"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data().onProfile == userID) {
            listOfComments.push(doc.data());
        }
        });
    }
    
    onMount(async () => {
        await loadComments();
    });
</script>


<form>
    <div class="form-group">
        <textarea maxlength="140" bind:value={comment} on:input={updateCounter} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Thoughts on this user? Limit of 140 characters"></textarea>
        <button on:click={addCommentDB} type="submit" class="btn btn-primary mb-2">Post Comment</button>
        {charCount} characters
    </div>
</form>

{#if listOfComments.length > 0}
  {#each listOfComments as comm}
    {comm.writtenBy} <br />
    {comm.userComment}
  {/each}
{:else}
  <p>No comments available.</p>
{/if}