<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let {
        startNum = 0,
        targetNum = 0,
        direction = "down",
        autoStart = true,
        duration = 2,
        height = 40,
        stopOrder = [],
        textList = [],
        class: className = "",
    }: {
        startNum?: number;
        targetNum?: number;
        direction?: "up" | "down";
        autoStart?: boolean;
        duration?: number;
        height?: number;
        stopOrder?: number[];
        textList?: string[];
        class?: string;
    } = $props();

    let figures = $state<string[]>([]);
    let isAnimating = $state(false);

    function getDigits(num: number): string[] {
        return String(num).split("");
    }

    $effect(() => {
        figures = getDigits(targetNum);
    });

    onMount(() => {
        if (autoStart) {
            isAnimating = true;
        }
    });

    export function start() {
        isAnimating = true;
    }

    export function reset() {
        isAnimating = false;
    }
</script>

<div class="smu-rolling-text {className}" style="height: {height}px">
    {#each figures as figure, i}
        <div
            class="smu-rolling-text__item {isAnimating
                ? 'smu-rolling-text__item--animate'
                : ''}"
            style="--smu-rolling-duration: {duration}s; --smu-rolling-delay: {(stopOrder[
                i
            ] ?? i) * 0.1}s; height: {height}px; line-height: {height}px"
        >
            {#if textList.length > 0}
                {#each textList as text}
                    <div class="smu-rolling-text__cell">{text}</div>
                {/each}
            {:else}
                {#each Array(10) as _, n}
                    <div class="smu-rolling-text__cell">{n}</div>
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    .smu-rolling-text {
        display: inline-flex;
        overflow: hidden;
        font-size: var(--smu-font-size-lg);
        color: var(--smu-text-color);

        &__item {
            overflow: hidden;

            &--animate {
                animation: smu-rolling-scroll var(--smu-rolling-duration)
                    var(--smu-rolling-delay) ease-out forwards;
            }
        }

        &__cell {
            text-align: center;
        }
    }

    @keyframes smu-rolling-scroll {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-90%);
        }
    }
</style>
