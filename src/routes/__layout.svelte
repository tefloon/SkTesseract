<script>
  import NavigationTop from "$components/Layout/NavigationTop.svelte";
</script>

<svelte:head>
  <title>Tesseract</title>
	<link 					rel='stylesheet' type ="text/css" href='./styles/reset.css'>
	<link 					rel="stylesheet" type ="text/css" href="/styles/reset.css">
	<link 					rel='stylesheet' type ="text/css" href='./styles/fonts.css'>
	<link 					rel='stylesheet' type ="text/css" href='./styles/general.css'>
	<link id="pagestyle" 	rel="stylesheet" type ="text/css" href="./styles/darkTheme.css">    
</svelte:head>

<div class="wrapper">
	<header>
		<NavigationTop />
	</header>

	<main>
		<slot></slot>
	</main>

	<footer>
		<div class="copy">Antoni Gawlikowski © 2022</div>
	</footer>
	</div>

<style>
	.wrapper{
		display: flex;
		flex-direction: column;		
		min-height: 100vh;
	}
	
	header{
		display: inline-block;
		background-color: var(--background-accent);
		color: white;
		height: 80px;
		width: 100%;	
	}
	
	main{
		flex: 1;
		display: block;
		background-color: var(--background-main);
		height: auto;
	}

	footer{
		display: flex;
		justify-items: center;
		align-content: center;
		background-color: var(--background-accent);
		height: 40px;
		width: 100%;
	}
	
	.copy{
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .8rem;
	}
</style>
