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
	<h1 class="logo">Tesseract</h1>
	<input type="checkbox" id="nav-toggle" class="nav-toggle" />
	<nav>
		<ul>
			{#each pages as p, i (i)}
				<li class:current={p.route == $page.url.pathname}>
					<a href={p.route} alt={p.name}> {p.name} </a>
				</li>
			{/each}
		</ul>
	</nav>
	<label for="nav-toggle" class="nav-toggle-label">
		<span />
	</label>
</div>


<style>
	@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,600');
	:root{
		--nav-accent-color: #ffdc41;
		--underline-height: 0.15rem;
		--nav-height: 80px;
	}

	.container {
		text-align: center;
		position: fixed;
		z-index: 999;
		width: 100%;
		height: var(--nav-height);
	}

	.logo {
		align-self: center;
	}

	/* .current *{
		text-shadow:1px 1px 10px #4b2709, 1px 1px 10px #4b2709;
	} */

	.nav-toggle {
		position: absolute !important;
		top: -9999px !important;
		left: -9999px !important;
	}

	.nav-toggle:focus ~ .nav-toggle-label {
		outline: 3px solid rgba(lightblue, 0.75);
	}

	.nav-toggle-label {
		position: absolute;
		top: 0;
		left: 0;
		margin-left: 1em;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.nav-toggle-label span,
	.nav-toggle-label span::before,
	.nav-toggle-label span::after {
		display: block;
		background: white;
		height: 2px;
		width: 2em;
		border-radius: 2px;
		position: relative;
	}

	.nav-toggle-label span::before,
	.nav-toggle-label span::after {
		content: '';
		position: absolute;
	}

	.nav-toggle-label span::before {
		bottom: 7px;
	}

	.nav-toggle-label span::after {
		top: 7px;
	}

	nav {
		position: absolute;
		text-align: left;
		top: 100%;
		left: 0;
		width: 100%;
		transform: scale(1, 0);
		transform-origin: top;
		transition: transform 400ms ease-in-out;
	}

	nav ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav li {
		margin-bottom: 1em;
		margin-left: 1em;
	}

	nav a {
		color: var(--text-main);
		font-weight: 500;
		text-decoration: none;
		font-size: 1.2rem;
		text-transform: uppercase;
		opacity: 0;
		transition: opacity 150ms ease-in-out;
	}

	nav .current a,
	nav a:hover {
		color: var(--nav-accent-color);
	}

	.nav-toggle:checked ~ nav {
		transform: scale(1, 1);
	}

	.nav-toggle:checked ~ nav a {
		opacity: 1;
		transition: opacity 250ms ease-in-out 250ms;
	}

	@media screen and (min-width: 800px) {
		.nav-toggle-label {
			display: none;
		}

		.container {
			display: grid;
			grid-template-columns: 1fr auto minmax(600px, 3fr) 1fr;
		}

		.logo {
			grid-column: 2 / 3;
		}

		nav {
			all: unset; 
			position: relative;
			text-align: left;
			transition: none;
			transform: scale(1, 1);
			background: none;
			top: initial;
			left: initial;

			grid-column: 3 / 4;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}

		nav ul {
			display: flex;
		}

		nav li {
			margin-left: 3em;
			margin-bottom: 0;
		}

		nav a {
			opacity: 1;
			position: relative;
		}

		nav a::before,
		nav .current a::before {
			content: '';
			display: block;
			height: var(--underline-height);
			background: var(--nav-accent-color);
			position: absolute;
			/* bottom: -0.25em; */
			bottom: calc(var(--underline-height) * -1);
			left: 0;
			right: 0;
			transform: scale(0, 1);
			transition: transform ease-in-out 250ms;
		}

		nav .current a::before {
			transition: none;
		}

		nav a:hover::before,
		nav .current a::before {
			transform: scale(1, 1);
		}

		/* nav .current a::before {
			background: none;
			color: initial;
		} */
	}
</style>
