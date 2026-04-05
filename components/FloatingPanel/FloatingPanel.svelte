<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    let {
        height = 0,
        minHeight = 100,
        maxHeight = 0,
        anchors = [],
        contentDraggable = true,
        lockScroll = false,
        safeAreaInsetBottom = true,
        onHeightChange,
        children,
        class: className = "",
    }: {
        height?: number;
        minHeight?: number;
        maxHeight?: number;
        anchors?: number[];
        contentDraggable?: boolean;
        lockScroll?: boolean;
        safeAreaInsetBottom?: boolean;
        onHeightChange?: (params: { height: number }) => void;
        children?: Snippet;
        class?: string;
    } = $props();

    let panelEl: HTMLDivElement;
    let currentHeight = $state(height || minHeight);
    let dragging = $state(false);
    let startY = 0;
    let startHeight = 0;

    function handleTouchStart(e: TouchEvent) {
        dragging = true;
        startY = e.touches[0].clientY;
        startHeight = currentHeight;
    }

    function handleTouchMove(e: TouchEvent) {
        if (!dragging) return;
        const deltaY = startY - e.touches[0].clientY;
        let newHeight = startHeight + deltaY;
        const max = maxHeight || window.innerHeight * 0.85;
        newHeight = Math.max(minHeight, Math.min(max, newHeight));
        currentHeight = newHeight;
    }

    function handleTouchEnd() {
        if (!dragging) return;
        dragging = false;

        if (anchors.length > 0) {
            let closest = anchors[0];
            let minDist = Math.abs(currentHeight - closest);
            for (const anchor of anchors) {
                const dist = Math.abs(currentHeight - anchor);
                if (dist < minDist) {
                    closest = anchor;
                    minDist = dist;
                }
            }
            currentHeight = closest;
        }

        onHeightChange?.({ height: currentHeight });
    }

    $effect(() => {
        if (height) currentHeight = height;
    });
</script>

<div
    class="smu-floating-panel {safeAreaInsetBottom
        ? 'smu-floating-panel--safe-bottom'
        : ''} {className}"
    style="height: {currentHeight}px; transition: {dragging
        ? 'none'
        : 'height 0.3s ease'}"
    bind:this={panelEl}
>
    <div
        class="smu-floating-panel__header"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
    >
        <div class="smu-floating-panel__header-bar"></div>
    </div>
    <div
        class="smu-floating-panel__content"
        style="overflow-y: {currentHeight > minHeight ? 'auto' : 'hidden'}"
    >
        {#if children}{@render children()}{/if}
    </div>
</div>

<style lang="scss">
    .smu-floating-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: var(--smu-background-2);
        border-radius: 16px 16px 0 0;
        box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;

        &--safe-bottom {
            padding-bottom: env(safe-area-inset-bottom);
        }

        &__header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            cursor: grab;
            touch-action: none;

            &-bar {
                width: 20px;
                height: 3px;
                background: var(--smu-gray-5);
                border-radius: var(--smu-radius-max);
            }
        }

        &__content {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>
