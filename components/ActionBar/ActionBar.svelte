<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        class: className = "",
    }: {
        children?: Snippet;
        class?: string;
    } = $props();
</script>

<div class="smu-action-bar {className}">
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .smu-action-bar {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 var(--smu-padding-md);
        height: 50px;
        background: var(--smu-background-2);
        z-index: var(--smu-action-bar-z-index, 100);
    }
</style>
