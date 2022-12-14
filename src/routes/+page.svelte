<script>
	import { user, signOut, signIn } from '$lib/stores/auth';
	import { page } from '$app/stores';
</script>

{#if $user}
	{$user.displayName} ({$page.data.uid})
	<button on:click={() => signOut()}>Log out</button>
{:else}
	Not logged in.
	<button on:click={() => signIn()}>Log in</button>
{/if}
