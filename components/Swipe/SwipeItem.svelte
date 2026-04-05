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

<div class="smu-swipe-item {className}">
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .smu-swipe-item {
        position: relative;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
