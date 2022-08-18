<script>
  import { modifiers } from '$stores/ModifiersStore';

  export let modKeys = [];
	export let showModal = true;

	$: activeModifiers = () => {
		let result = [];
		const currentValue = $modifiers;
		const currentKeys = Object.keys(currentValue);

		for (let i = 0; i < currentKeys.length; i++) {
			if (currentValue[currentKeys[i]]) {
				result.push(currentKeys[i]);
			}
		}

		return result;
	};

  $: modKeys = activeModifiers();

	function handleKeydown(event) {
		// key = event.key;
		const keyCode = event.keyCode;
		modifiers.addModifier(keyCode);
	}
  
	function handleKeyUp(event) {
    const keyCode = event.keyCode;
		modifiers.removeModifier(keyCode);
	}

	// Clears modKeys when mouse leaves the window.
	// Otherwise, if a modKey was held when mouse left
	// It stays registered until window reaquires focus
	const clearModKeys = () => {
		modKeys = [];
	};
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyUp} />
<svelte:body on:mouseleave={clearModKeys} />

{#if showModal }
	<div id="sideBar">
	{#each modKeys as mod}
		<div class="mod">{ mod }</div>
	{/each}
</div>
{/if}

<style>
	.mod {
		color: white;
		font-size: 2rem;
		font-family: 'arima';
	}

	#sideBar {
    position: fixed;
    display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    top: 100px;
    left: 20px;
    height: 200px;
    width: 150px;
		background-color: rgba(0,0,0,.4);
		padding: .6rem .6rem;
	}
</style>