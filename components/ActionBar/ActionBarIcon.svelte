<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "../Icon/Icon.svelte";

    let {
        text = "",
        icon = "",
        color = "",
        dot = false,
        badge = "",
        url = "",
        onclick,
        iconSlot,
        class: className = "",
    }: {
        text?: string;
        icon?: string;
        color?: string;
        dot?: boolean;
        badge?: string | number;
        url?: string;
        onclick?: (e: MouseEvent) => void;
        iconSlot?: Snippet;
        class?: string;
    } = $props();

    function handleClick(e: MouseEvent) {
        onclick?.(e);
        if (url) window.location.href = url;
    }
</script>

<div
    class="smu-action-bar-icon {className}"
    role="button"
    tabindex="0"
    onclick={handleClick}
>
    <div class="smu-action-bar-icon__icon">
        {#if iconSlot}
            {@render iconSlot()}
        {:else if icon}
            <Icon name={icon} {color} />
        {/if}
        {#if dot}<div class="smu-action-bar-icon__dot"></div>{/if}
        {#if badge}<div class="smu-action-bar-icon__badge">{badge}</div>{/if}
    </div>
    {#if text}<span class="smu-action-bar-icon__text">{text}</span>{/if}
</div>

<style lang="scss">
    .smu-action-bar-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 48px;
        height: 100%;
        color: var(--smu-text-color);
        font-size: var(--smu-font-size-xs);
        cursor: pointer;

        &:active {
            opacity: 0.7;
        }

        &__icon {
            position: relative;
            font-size: 18px;
        }

        &__text {
            margin-top: 4px;
        }

        &__dot {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 8px;
            height: 8px;
            background: var(--smu-danger-color);
            border-radius: 50%;
        }

        &__badge {
            position: absolute;
            top: -6px;
            right: -8px;
            min-width: 16px;
            padding: 0 3px;
            color: var(--smu-white);
            font-size: 10px;
            line-height: 14px;
            text-align: center;
            background: var(--smu-danger-color);
            border-radius: var(--smu-radius-max);
        }
    }
</style>
