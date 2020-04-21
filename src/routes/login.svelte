<script>
	async function login (e)
	{
		const res = await fetch('/login', { method: 'POST' });
	}
</script>

<div>
	Page de login
</div>

<button on:click={ login }>
	Login
</button>