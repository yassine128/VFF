<script>
  import { userStore, loginWithGoogle, logOut } from '../../firebaseClient.js';
  import Header  from '../header/+page.svelte'
</script>

<Header  />
{#if $userStore}
  <p>You are logged in as {$userStore.displayName}</p>
  <button on:click={logOut}>Log Out</button>
{:else}
  <p>You are not logged in.</p>
  <button on:click={loginWithGoogle}>Login with Google</button>
{/if}
