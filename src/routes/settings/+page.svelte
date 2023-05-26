<script>
    import Header from '../header/+page.svelte'
    import { loadData, updateDB, userData } from '../../firebaseClient.js'
    async function saveRank() {
      await updateDB($userData[0]);
    }
</script>

<Header />

<main>
    <h1>Settings</h1>  
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {$userData[0]}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" on:click={() => $userData[0] = 'Silver'}>Silver</a>
        <a class="dropdown-item" on:click={() => $userData[0] = 'Gold'}>Gold</a>
        <a class="dropdown-item" on:click={() => $userData[0] = 'Plat'}>Plat</a>
      </div>
    </div>
  
    <button on:click={saveRank}>Save</button>
  </main>