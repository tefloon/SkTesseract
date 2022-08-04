<script>
    import { createEventDispatcher } from 'svelte';
    import Tag from "./Tag.svelte";

    export let tags = [];               // we expect array of objects with id, type and value
    export let callback = () => {};     // callback function to fire when tag is clicked

    
    // const dispatch = createEventDispatcher();
    // let handleTagClick = (tag) =>{
    //     console.log("Kurwa");
    //     dispatch('tagClicked',{
    //         clickedTag: tag,
    //     });
    // }

</script>

{#if tags.length > 0 }
    <div class="tagRow">
        {#each tags as tag (tag.id)}
            <span class="tagItem" on:click={ () => callback(tag) }><Tag { tag } ></Tag></span>
        {/each}
    </div>
{/if}

<style>
    .tagRow{
        display: flex;
        flex-direction: row;
        justify-content: left;
        flex-wrap: wrap;
        gap: 5px;
    }

    .tagItem{
        flex-shrink:0;
    }
</style>