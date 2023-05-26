<script>
    import Header from '../header/+page.svelte'
    import { updateDB, userData } from '../../firebaseClient.js'

    let selectedRank = ""

    async function saveRank() {
      if (selectedRank == ""){
        selectedRank = $userData[0];
      }
      await updateDB(selectedRank);
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
        <a class="dropdown-item" on:click={() => selectedRank = 'Silver'}>Silver</a>
        <a class="dropdown-item" on:click={() => selectedRank = 'Gold'}>Gold</a>
        <a class="dropdown-item" on:click={() => selectedRank = 'Plat'}>Plat</a>
      </div>
    </div>
  
    <button on:click={saveRank}>Save</button>
  </main>