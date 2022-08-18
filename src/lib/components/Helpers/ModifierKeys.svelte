<script>
  import { modifiers } from '$stores/ModifiersStore';
  import { createEventDispatcher } from 'svelte';

  export let modKeys = [];

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

  function handleClick() {

    console.log(modKeys)
  }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyUp} />