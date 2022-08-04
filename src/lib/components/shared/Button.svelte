<script>
    export let primary = true;
</script>

<button class:primary class:secondary={!primary} on:click>
    <span><slot /></span>
</button>

<style>
    button {
        cursor: pointer;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin: 10px;
        padding: 15px 25px;

        height: 50px;
        border-radius: 6px;
        border: none;

        color: var(--button-main-text);
        font-weight: bold;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    button:disabled {
        opacity: 0.2;
    }

    button:not(:disabled):active {
        opacity: 0.5;
    }

    button:hover {
        opacity: 0.8;
    }

    .primary {
        background: var(--button-main-bg);
    }

    .secondary {
        color: var(--button-accent-text);
        background: var(--button-accent-bg);
    }
</style>
