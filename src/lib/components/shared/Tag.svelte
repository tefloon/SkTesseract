<script>
    export let tag;
</script>


<span class="tag disable-select" class:disabled={ tag.state === 'active' ? false : true}>
    <span class="tagType">{ tag.type }: </span>
    <span class="tagValue">{ tag.value }</span>
</span>


<style>
    .tag{
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
        font-family: 'Victor Mono', Courier, monospace;
        line-height: 20px;
        padding: 2px 10px;
        border-radius: 10px;
        background-color: var(--background-main);
        border: 2px solid var(--background-accent);
    }

    .tag:not(.disabled):hover{
        background-color: var(--background-accent);
    }
    
    .disabled{
        background-color: var(--background-main-disabled);
        color: var(--text-main-disabled);
    }

    .tag.disabled:hover{
        filter: brightness(0.8);
    }


</style>