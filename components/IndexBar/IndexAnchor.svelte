<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        index = "",
        children,
        class: className = "",
    }: {
        index?: string | number;
        children?: Snippet;
        class?: string;
    } = $props();
</script>

<div class="smu-index-anchor {className}" data-index={index}>
    <div class="smu-index-anchor__text">{index}</div>
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .smu-index-anchor {
        position: relative;

        &__text {
            padding: 0 var(--smu-padding-md);
            color: var(--smu-text-color);
            font-weight: var(--smu-font-bold);
            font-size: var(--smu-font-size-md);
            line-height: 32px;
            background: transparent;
        }
    }
</style>
