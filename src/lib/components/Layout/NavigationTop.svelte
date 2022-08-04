<script>
	import { page } from '$app/stores';

	let pages = [
		{ name: 'Home', route: '/' },
		{ name: 'About', route: '/about' },
		{ name: 'People', route: '/people' },
		{ name: 'Groups', route: '/groups' }
	];
</script>

<div class="container">
	<nav>
		<ul>
			{#each pages as p, i (i)}
				<li class:current={p.route == $page.url.pathname} class:kasia={ true }>
					<a href={p.route} alt={p.name}> {p.name} </a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
  .container{
    background-color: rgb(46, 46, 46);
  }

	ul {
		display: block;
	}

	li {
		list-style: none;
	}

	.current a {
		color: red;
	}
</style>
