<script type="text/javascript">
	import Header  from './header/+page.svelte'
	import {userStore} from '../firebaseClient.js';
</script>

<Header />

{#if $userStore}
	<h1>Welcome {$userStore.displayName}</h1>
{/if}


<h1>Valorant Friend Finder</h1>