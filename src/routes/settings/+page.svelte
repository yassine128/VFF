<script>
  import Header from '../header/+page.svelte'
  import { loadData, updateDB, userData } from '../../firebaseClient.js'
  const ranks = ['Iron', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];

  async function saveRank() {
    await updateDB($userData[0]);
  }
</script>

<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: Arial, sans-serif;
  }

  h1 {
      color: #333;
      margin-bottom: 20px;
  }

  .dropdown {
      position: relative;
      display: inline-block;
      margin-bottom: 20px;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  }

  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  .dropdown-content a:hover {
      background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
      display: block;
  }

  button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  button:hover {
      background-color: #45a049;
  }
</style>

<Header />

<main>
  <h1>Settings</h1>  

  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {$userData[0]}
    </button>
    <div class="dropdown-content" aria-labelledby="dropdownMenuButton">
      {#each ranks as rank}
          <a class="dropdown-item" on:click={() => $userData[0] = rank}>{rank}</a>
      {/each}
    </div>
  </div>

  <button on:click={saveRank}>Save</button>
</main>
