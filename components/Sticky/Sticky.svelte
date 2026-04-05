<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    let {
        offsetTop = 0,
        offsetBottom,
        zIndex = 99,
        container,
        position = "top",
        onChange,
        onScroll,
        children,
        class: className = "",
    }: {
        offsetTop?: number | string;
        offsetBottom?: number | string;
        zIndex?: number | string;
        container?: HTMLElement;
        position?: "top" | "bottom";
        onChange?: (isFixed: boolean) => void;
        onScroll?: (params: { scrollTop: number; isFixed: boolean }) => void;
        children?: Snippet;
        class?: string;
    } = $props();

    let rootEl: HTMLDivElement;
    let isFixed = $state(false);
    let fixedStyle = $state("");

    function handleScroll() {
        if (!rootEl) return;
        const scrollTop =
            (container || document.documentElement).scrollTop ||
            window.pageYOffset;
        const rect = rootEl.getBoundingClientRect();
        const offset =
            Number(position === "bottom" ? (offsetBottom ?? 0) : offsetTop) ||
            0;

        let newFixed = false;
        if (position === "top") {
            newFixed = rect.top < offset;
        } else {
            newFixed = rect.bottom > window.innerHeight - offset;
        }

        if (newFixed !== isFixed) {
            isFixed = newFixed;
            onChange?.(isFixed);
        }

        if (isFixed) {
            if (position === "top") {
                fixedStyle = `position: fixed; top: ${offset}px; left: ${rect.left}px; width: ${rect.width}px; z-index: ${zIndex};`;
            } else {
                fixedStyle = `position: fixed; bottom: ${offset}px; left: ${rect.left}px; width: ${rect.width}px; z-index: ${zIndex};`;
            }
        } else {
            fixedStyle = "";
        }

        onScroll?.({ scrollTop, isFixed });
    }

    onMount(() => {
        const target = container || window;
        target.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
    });

    onDestroy(() => {
        const target = container || window;
        target.removeEventListener("scroll", handleScroll);
    });
</script>

<div class="smu-sticky {className}" bind:this={rootEl}>
    <div style={fixedStyle}>
        {#if children}{@render children()}{/if}
    </div>
</div>

<style lang="scss">
    .smu-sticky {
        position: relative;
    }
</style>
