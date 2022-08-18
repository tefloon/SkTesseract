<script>
    import { pick } from "lodash-es";

    export let person;
    export const id = person.id;
    export let i;
    export let displayOptions;

    let ids = []
    
    let dataToShow = Object.values(pick(person, Object.keys(displayOptions)));
    dataToShow = [i+1, ...dataToShow]

    for (let i = 0; i < dataToShow.length; i++) {
        ids.push(`${person.id}_${i+456}`)    
    }

</script>

<!-- TODO: Add an edit icon next to each item -->
{#if person}
        {#each dataToShow as dataItem, a (ids[a]) }
            <div class="item" class:numbering={ a == 0 }>
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
        /* border: 1px solid red; */
        font-size: inherit;  /* Not to have empty selectors */
    }
 
    .item.numbering{
        width: 2rem;
        text-align: center;     
    }
</style>
