<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title = "",
        name = "",
        disabled = false,
        dot = false,
        badge = "",
        titleClass = "",
        children,
        titleSlot,
        class: className = "",
    }: {
        title?: string;
        name?: string | number;
        disabled?: boolean;
        dot?: boolean;
        badge?: string | number;
        titleClass?: string;
        children?: Snippet;
        titleSlot?: Snippet;
        class?: string;
    } = $props();
</script>

<div class="smu-tab-pane {className}" role="tabpanel">
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .smu-tab-pane {
        box-sizing: border-box;
        flex-shrink: 0;
        width: 100%;
    }
</style>
