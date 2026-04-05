<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "../Icon/Icon.svelte";

    let {
        text = "",
        icon = "",
        iconColor = "",
        dot = false,
        badge = "",
        url = "",
        to = "",
        replace = false,
        clickable = false,
        iconSize = "28px",
        children,
        iconSlot,
        textSlot,
        onclick,
        class: className = "",
    }: {
        text?: string;
        icon?: string;
        iconColor?: string;
        dot?: boolean;
        badge?: string | number;
        url?: string;
        to?: string;
        replace?: boolean;
        clickable?: boolean;
        iconSize?: string | number;
        children?: Snippet;
        iconSlot?: Snippet;
        textSlot?: Snippet;
        onclick?: (e: MouseEvent) => void;
        class?: string;
    } = $props();

    function handleClick(e: MouseEvent) {
        onclick?.(e);
        if (url) {
            if (replace) {
                window.location.replace(url);
            } else {
                window.location.href = url;
            }
        }
    }
</script>

<div
    class="smu-grid-item {clickable || url
        ? 'smu-grid-item--clickable'
        : ''} {className}"
    role={clickable || url ? "button" : undefined}
    tabindex={clickable || url ? 0 : undefined}
    onclick={handleClick}
>
    <div class="smu-grid-item__content">
        <div
            class="smu-grid-item__icon"
            style="font-size: {typeof iconSize === 'number'
                ? iconSize + 'px'
                : iconSize}"
        >
            {#if iconSlot}
                {@render iconSlot()}
            {:else if icon}
                <Icon name={icon} color={iconColor} />
            {/if}
            {#if dot}<div class="smu-grid-item__dot"></div>{/if}
            {#if badge}<div class="smu-grid-item__badge">{badge}</div>{/if}
        </div>
        <div class="smu-grid-item__text">
            {#if textSlot}
                {@render textSlot()}
            {:else if children}
                {@render children()}
            {:else}
                {text}
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .smu-grid-item {
        position: relative;
        box-sizing: border-box;

        &--clickable {
            cursor: pointer;
            &:active {
                opacity: 0.7;
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: 100%;
            padding: var(--smu-padding-md) var(--smu-padding-xs);
            background: var(--smu-background-2);
        }

        &__icon {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: var(--smu-grid-item-icon-color, var(--smu-text-color));
        }

        &__text {
            margin-top: 8px;
            color: var(--smu-gray-7);
            font-size: var(--smu-font-size-sm);
            line-height: 1.5;
            word-wrap: break-word;
        }

        &__dot {
            position: absolute;
            top: 0;
            right: -4px;
            width: 8px;
            height: 8px;
            background: var(--smu-danger-color);
            border-radius: 50%;
        }

        &__badge {
            position: absolute;
            top: -4px;
            right: -8px;
            min-width: 16px;
            padding: 0 3px;
            color: var(--smu-white);
            font-size: var(--smu-font-size-xs);
            line-height: 14px;
            text-align: center;
            background: var(--smu-danger-color);
            border-radius: var(--smu-radius-max);
        }
    }
</style>
