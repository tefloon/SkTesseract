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

<div class="pageWrapper">
	<header>
		<NavigationTop />
	</header>

<div class="mainContent">

	<aside id="leftSidebar">
		<slot name="leftSidebar">
			<div class="sidebarContainer left">
				Nic tu nie ma LEWA
			</div>
		</slot>
	</aside>
	
	<main>
		<slot></slot>
	</main>
	
	<aside id="rightSidebar">
		<slot name="rightSidebar">
			<div class="sidebarContainer right">
				Nic tu nie ma PRAWA
			</div>
		</slot>
	</aside>
	
</div> <!-- end of MAIN CONTENT -->

	<footer>
		<div class="copy">Antoni Gawlikowski © 2022</div>
	</footer>
	</div>

<style>
	.pageWrapper{
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
	
	.mainContent{
		flex: 1;
		display: grid;
		grid-template-columns: auto auto auto;
		background-color: var(--background-main);
		height: auto;
	}

	main{
		/* background-color: yellow; */
	}

	aside{
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		padding-top: 20px;

		min-width: 250px;
	}

	.sidebarContainer{
		display: flex;
		flex-direction: column;
		justify-content: center;
		
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 15px;

		width: min(80%, 350px);
		min-width: 50%;
		min-height: 500px;
		padding: 1rem 1rem;

		font-size: 15pt;
		text-align: center;
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
