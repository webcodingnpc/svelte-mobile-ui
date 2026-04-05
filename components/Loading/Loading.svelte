<script lang="ts">
    /**
     * Loading 加载组件
     */
    let {
        size = "30px",
        type = "circular",
        color = "",
        vertical = false,
        textSize = "",
        textColor = "",
        children,
        class: className = "",
    }: {
        size?: string | number;
        type?: "circular" | "spinner";
        color?: string;
        vertical?: boolean;
        textSize?: string;
        textColor?: string;
        children?: import("svelte").Snippet;
        class?: string;
    } = $props();

    const sizeVal = $derived(typeof size === "number" ? `${size}px` : size);
</script>

<div class="smu-loading {vertical ? 'smu-loading--vertical' : ''} {className}">
    <span
        class="smu-loading__spinner smu-loading__spinner--{type}"
        style="width: {sizeVal}; height: {sizeVal}; {color
            ? `color: ${color}`
            : ''}"
    >
        {#if type === "spinner"}
            {#each Array(12) as _, i}
                <i
                    class="smu-loading__line"
                    style="transform: rotate({i * 30}deg); opacity: {1 -
                        0.75 * (i / 12)}"
                ></i>
            {/each}
        {:else}
            <svg class="smu-loading__circular" viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" fill="none" />
            </svg>
        {/if}
    </span>
    {#if children}
        <span
            class="smu-loading__text"
            style="{textSize ? `font-size: ${textSize}` : ''}; {textColor
                ? `color: ${textColor}`
                : ''}">{@render children()}</span
        >
    {/if}
</div>

<style lang="scss">
    .smu-loading {
        display: inline-flex;
        align-items: center;

        &--vertical {
            flex-direction: column;
        }

        &__spinner {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            color: var(--smu-gray-5);
            animation: smu-rotate 0.8s linear infinite;

            &--spinner {
                animation-timing-function: steps(12);
            }
        }

        &__line {
            position: absolute;
            top: 0;
            left: 50%;
            width: 2px;
            height: 25%;
            margin-left: -1px;
            background: currentColor;
            border-radius: var(--smu-radius-max);
            transform-origin: center bottom;
        }

        &__circular {
            width: 100%;
            height: 100%;
            animation: smu-circular 1.5s ease-in-out infinite;

            circle {
                stroke: currentColor;
                stroke-width: 3;
                stroke-linecap: round;
                animation: smu-circular-dash 1.5s ease-in-out infinite;
            }
        }

        &__text {
            margin-left: 8px;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-md);

            .smu-loading--vertical & {
                margin: 8px 0 0;
            }
        }
    }

    @keyframes smu-rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes smu-circular {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes smu-circular-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120;
        }
    }
</style>
