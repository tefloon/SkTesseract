<script>
    import { pick } from "lodash-es";

    export let person;
    export let i;
    export let displayOptions;

    const dataToShow = Object.values(pick(person, Object.keys(displayOptions)));

</script>

<!-- TODO: Add an edit icon next to each item -->
{#if person}
        <div class="item">
            <span class="itemText numbering">
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
        padding: 6px 12px;
        text-align: left;
        vertical-align: middle;
        border-right: 1px solid rgb(82, 82, 82);
        border-bottom: 1px solid rgb(82, 82, 82);
    }

    .item:first-child{
        border-left: 1px solid rgb(82, 82, 82);
        
    }
      
    .itemText{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        /* border: 1px solid green; */
    }

    
    .item .numbering{
        justify-content: center;       
        padding-left: 0;
    }
   

</style>
