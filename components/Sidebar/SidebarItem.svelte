<script lang="ts">
    import type { Snippet } from "svelte";
    import Badge from "../Badge/Badge.svelte";

    let {
        title = "",
        disabled = false,
        dot = false,
        badge = "",
        isActive = false,
        onclick,
        children,
        titleSlot,
        class: className = "",
    }: {
        title?: string;
        disabled?: boolean;
        dot?: boolean;
        badge?: string | number;
        isActive?: boolean;
        onclick?: () => void;
        children?: Snippet;
        titleSlot?: Snippet;
        class?: string;
    } = $props();

    function handleClick() {
        if (!disabled) onclick?.();
    }
</script>

<div
    class="smu-sidebar-item {isActive
        ? 'smu-sidebar-item--select'
        : ''} {disabled ? 'smu-sidebar-item--disabled' : ''} {className}"
    role="tab"
    tabindex={disabled ? -1 : 0}
    onclick={handleClick}
>
    <div class="smu-sidebar-item__text">
        {#if titleSlot}
            {@render titleSlot()}
        {:else}
            {title}
        {/if}
        {#if dot}<div class="smu-sidebar-item__dot"></div>{/if}
        {#if badge}<div class="smu-sidebar-item__badge">{badge}</div>{/if}
    </div>
</div>

<style lang="scss">
    .smu-sidebar-item {
        position: relative;
        display: block;
        box-sizing: border-box;
        padding: 20px 12px 20px 8px;
        overflow: hidden;
        color: var(--smu-text-color);
        font-size: var(--smu-font-size-md);
        line-height: 20px;
        background: var(--smu-background);
        cursor: pointer;
        user-select: none;
        border-left: 4px solid transparent;

        &--select {
            color: var(--smu-text-color);
            font-weight: var(--smu-font-bold);
            background: var(--smu-background-2);
            border-color: var(--smu-primary-color);
        }

        &--disabled {
            color: var(--smu-gray-5);
            cursor: not-allowed;
        }

        &:not(.smu-sidebar-item--disabled):active {
            background-color: var(--smu-active-color);
        }

        &__text {
            position: relative;
        }

        &__dot {
            position: absolute;
            top: -4px;
            right: -8px;
            width: 8px;
            height: 8px;
            background: var(--smu-danger-color);
            border-radius: 50%;
        }

        &__badge {
            position: absolute;
            top: -4px;
            right: -16px;
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
