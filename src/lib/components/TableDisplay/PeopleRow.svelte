<script>
    import { pick } from "lodash-es";

    export let person;
    export let i;
    export let displayOptions;

    const dataToShow = Object.values(pick(person, Object.keys(displayOptions)));

</script>

<!-- TODO: Add an edit icon next to each item -->
{#if person}

            <div class="item numbering">
                <span class="itemText">
                    { i + 1 }
                </span>
            </div>
        {#each dataToShow as dataItem }
            <div class="item">
                <span class="itemText">
                    { dataItem }
                </span>
            </div>
        {/each}

{/if}

<style>
    .item{
        display: table-cell;
        padding: 0.5rem 1rem;
        text-align: left;
        vertical-align: middle;
        border-right: 1px solid rgb(82, 82, 82);
        border-bottom: 1px solid rgb(82, 82, 82);
    }

    .item:first-child{
        border-left: 1px solid rgb(82, 82, 82);      
    }
      
    .itemText{
        font-size: inherit;  /* Not to have empty selectors */
    }
 
    .item.numbering{
        width: 2rem;
        text-align: center;     
    }
</style>
