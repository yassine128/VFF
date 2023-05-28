<script>
  import { collection, query, getDocs, startAt, endAt, orderBy } from "firebase/firestore"; 
  import { db } from '../../firebaseClient.js';  
  import { onMount, onDestroy } from 'svelte';

  let search = '';
  let users = [];
  let showResults = false;

  async function searchUsers(event) {
    event.preventDefault(); // prevent form submission
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('name'), startAt(search), endAt(search + '\uf8ff'));

    const querySnapshot = await getDocs(q);
    users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    showResults = true;
  }

  function handleOutsideClick(event) {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer && !searchContainer.contains(event.target)) {
      showResults = false;
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleOutsideClick);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleOutsideClick);
    }
  });
</script>

<style>
  .search-results {
    position: absolute;
    top: 100%;
    list-style-type: none;
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    background: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .search-results li {
    margin-bottom: 10px;
  }

  .search-results a {
    text-decoration: none;
    color: #333;
  }

  .search-results a:hover {
    background-color: #f5f5f5;
  }

  .hide {
    display: none;
  }
</style>

<div id="search-container" class="position-relative d-flex justify-content-center">
  <form class="form-inline my-2 my-lg-0" on:submit|preventDefault={searchUsers}>
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" bind:value={search} on:input={searchUsers}>
  </form>

  <ul id="search-results-container" class="search-results {showResults ? '' : 'hide'}">
    {#each users as user}
      <li>
        <a href="../profile/{user.id}">{user.name}</a>
      </li>
    {/each}
  </ul>
</div>
