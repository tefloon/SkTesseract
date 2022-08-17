<script>
  import NavigationTop from "@components/Layout/NavigationTop.svelte";
</script>

<svelte:head>
  <title>Tesseract</title>
	<link 					rel='stylesheet' type ="text/css" href='./styles/reset.css'>
	<link 					rel='stylesheet' type ="text/css" href='./styles/fonts.css'>
	<link 					rel='stylesheet' type ="text/css" href='./styles/general.css'>
	<link id="pagestyle" 	rel="stylesheet" type ="text/css" href="./styles/darkTheme.css">    
</svelte:head>

<NavigationTop />

<slot></slot>