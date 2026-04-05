<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        text = "",
        type = "danger",
        color = "",
        icon = "",
        loading = false,
        disabled = false,
        url = "",
        onclick,
        children,
        class: className = "",
    }: {
        text?: string;
        type?: "default" | "primary" | "warning" | "danger";
        color?: string;
        icon?: string;
        loading?: boolean;
        disabled?: boolean;
        url?: string;
        onclick?: (e: MouseEvent) => void;
        children?: Snippet;
        class?: string;
    } = $props();

    function handleClick(e: MouseEvent) {
        if (loading || disabled) return;
        onclick?.(e);
        if (url) window.location.href = url;
    }
</script>

<button
    class="smu-action-bar-button smu-action-bar-button--{type} {loading
        ? 'smu-action-bar-button--loading'
        : ''} {className}"
    style={color ? `background: ${color}; border-color: ${color}` : ""}
    disabled={disabled || loading}
    onclick={handleClick}
>
    {#if loading}
        <span class="smu-action-bar-button__loading"></span>
    {/if}
    {#if children}{@render children()}{:else}{text}{/if}
</button>

<style lang="scss">
    .smu-action-bar-button {
        flex: 1;
        height: 40px;
        font-size: var(--smu-font-size-md);
        font-weight: var(--smu-font-bold);
        border: none;
        border-radius: var(--smu-radius-max);
        cursor: pointer;
        color: var(--smu-white);

        &:not(:first-child) {
            margin-left: 8px;
        }

        &--danger {
            background: var(--smu-danger-color);
        }
        &--warning {
            background: var(--smu-warning-color);
        }
        &--primary {
            background: var(--smu-primary-color);
        }
        &--default {
            background: var(--smu-white);
            color: var(--smu-text-color);
            border: 1px solid var(--smu-border-color);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        &:active:not(:disabled) {
            opacity: 0.8;
        }

        &__loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid currentColor;
            border-top-color: transparent;
            border-radius: 50%;
            animation: smu-rotate 0.8s linear infinite;
            margin-right: 4px;
            vertical-align: middle;
        }
    }

    @keyframes smu-rotate {
        to {
            transform: rotate(360deg);
        }
    }
</style>
