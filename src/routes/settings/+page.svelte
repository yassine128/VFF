<script>
  import Header from '../header/+page.svelte'
  import { loadData, updateDB, userData } from '../../firebaseClient.js'
  const ranks = ['Iron', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];

  async function saveRank() {
    await updateDB($userData[0]);
  }
</script>

<style>
  h1 {
    position: absolute;
		top: 20%;
    left: 10%;
    margin-bottom: 20px;
    font-size: 5em;
    font-family: Impact, Charcoal, sans-serif;
    color: #ff4655;
  }

  .dropdown {
    position: absolute;
    display: inline-block;
    margin-bottom: 20px;
    font-family: Impact, Charcoal, sans-serif;
    color: #ff4655;
  }

  .dropdown-content {
      font-family: Impact, Charcoal, sans-serif;
      color: #ff4655;
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
      position: absolute; 
      padding: 10px 20px;
      background-color: #ff4655;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  button:hover {
      background-color: #aa2e38;
  }

  .save {
    top: 40%;
    left: 20%;
  }
  .dropdown {
    top: 40%;
    left: 10%;
  }
</style>

<Header />

<div class="back">
  <h1>Settings</h1>  

  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {$userData[0]}
    </button>
    <div class="dropdown-content" aria-labelledby="dropdownMenuButton">
      {#each ranks as rank}
          <a class="dropdown-item drop" on:click={() => $userData[0] = rank}>{rank}</a>
      {/each}
    </div>
  </div>

  <button class="save" on:click={saveRank}>Save</button>
</div>