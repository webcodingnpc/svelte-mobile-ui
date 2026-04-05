<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        direction = "horizontal",
        fill = false,
        wrap = "nowrap",
        align = "start",
        children,
        class: className = "",
    }: {
        direction?: "horizontal" | "vertical";
        fill?: boolean;
        wrap?: "nowrap" | "wrap";
        align?: "start" | "center" | "end" | "baseline";
        children?: Snippet;
        class?: string;
    } = $props();
</script>

<div
    class="smu-space smu-space--{direction} {fill
        ? 'smu-space--fill'
        : ''} {className}"
    style="flex-wrap: {wrap}; align-items: {align}"
>
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .smu-space {
        display: inline-flex;
        gap: 8px;

        &--horizontal {
            flex-direction: row;
        }

        &--vertical {
            flex-direction: column;
            width: 100%;
        }

        &--fill {
            display: flex;

            :global(> *) {
                flex: 1;
            }
        }
    }
</style>
