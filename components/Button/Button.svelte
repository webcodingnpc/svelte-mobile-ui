<script lang="ts">
    /**
     * Button 按钮组件
     * 支持多种类型、尺寸、形状
     */
    import Icon from "../Icon/Icon.svelte";
    import Loading from "../Loading/Loading.svelte";
    import type { Snippet } from "svelte";

    let {
        type = "default",
        size = "normal",
        text = "",
        icon = "",
        color = "",
        block = false,
        plain = false,
        round = false,
        square = false,
        loading = false,
        loadingText = "",
        loadingSize = "20px",
        loadingType = "circular",
        disabled = false,
        hairline = false,
        iconPosition = "left",
        nativeType = "button",
        onclick,
        children,
        class: className = "",
    }: {
        type?: "default" | "primary" | "success" | "warning" | "danger";
        size?: "large" | "normal" | "small" | "mini";
        text?: string;
        icon?: string;
        color?: string;
        block?: boolean;
        plain?: boolean;
        round?: boolean;
        square?: boolean;
        loading?: boolean;
        loadingText?: string;
        loadingSize?: string;
        loadingType?: "circular" | "spinner";
        disabled?: boolean;
        hairline?: boolean;
        iconPosition?: "left" | "right";
        nativeType?: "button" | "submit" | "reset";
        onclick?: (e: MouseEvent) => void;
        children?: Snippet;
        class?: string;
    } = $props();

    const classes = $derived(
        [
            "smu-button",
            `smu-button--${type}`,
            `smu-button--${size}`,
            plain && "smu-button--plain",
            block && "smu-button--block",
            round && "smu-button--round",
            square && "smu-button--square",
            loading && "smu-button--loading",
            disabled && "smu-button--disabled",
            hairline && "smu-hairline--surround",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );

    const customStyle = $derived(() => {
        if (!color) return "";
        const s: string[] = [];
        if (plain) {
            s.push(`color: ${color}`);
            s.push(`border-color: ${color}`);
        } else {
            s.push(`color: white`);
            s.push(`background: ${color}`);
            if (!color.includes("gradient")) s.push(`border-color: ${color}`);
            else s.push("border: 0");
        }
        return s.join("; ");
    });

    function handleClick(e: MouseEvent) {
        if (!loading && !disabled && onclick) onclick(e);
    }
</script>

<button
    type={nativeType}
    class={classes}
    style={customStyle()}
    {disabled}
    onclick={handleClick}
>
    <div class="smu-button__content">
        {#if loading}
            {#if iconPosition === "left"}
                <Loading
                    size={loadingSize}
                    type={loadingType}
                    class="smu-button__loading"
                />
            {/if}
            <span class="smu-button__text"
                >{loadingText ||
                    text ||
                    ""}{#if children && !loadingText}{@render children()}{/if}</span
            >
            {#if iconPosition === "right"}
                <Loading
                    size={loadingSize}
                    type={loadingType}
                    class="smu-button__loading"
                />
            {/if}
        {:else}
            {#if icon && iconPosition === "left"}
                <Icon name={icon} class="smu-button__icon" />
            {/if}
            {#if text || children}
                <span class="smu-button__text"
                    >{text}{#if children}{@render children()}{/if}</span
                >
            {/if}
            {#if icon && iconPosition === "right"}
                <Icon name={icon} class="smu-button__icon" />
            {/if}
        {/if}
    </div>
</button>

<style lang="scss">
    .smu-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 44px;
        margin: 0;
        padding: 0 15px;
        font-size: var(--smu-font-size-lg);
        line-height: 1.2;
        text-align: center;
        border-radius: var(--smu-radius-md);
        cursor: pointer;
        border: 1px solid transparent;
        transition: opacity var(--smu-duration-fast);
        -webkit-appearance: none;
        -webkit-font-smoothing: auto;

        &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: var(--smu-black);
            border: inherit;
            border-color: var(--smu-black);
            border-radius: inherit;
            transform: translate(-50%, -50%);
            opacity: 0;
            content: "";
        }

        &:active::before {
            opacity: 0.1;
        }

        &__content {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        &__text {
            display: inline;
        }

        &__icon {
            font-size: 1.2em;
            line-height: inherit;
        }

        &__icon + &__text,
        &__loading + &__text,
        &__text + &__icon,
        &__text + &__loading {
            margin-left: 4px;
        }

        // ========== 类型 ==========
        &--default {
            color: var(--smu-text-color);
            background: var(--smu-white);
            border-color: var(--smu-border-color);
        }

        &--primary {
            color: var(--smu-white);
            background: var(--smu-primary-color);
            border-color: var(--smu-primary-color);
        }

        &--success {
            color: var(--smu-white);
            background: var(--smu-success-color);
            border-color: var(--smu-success-color);
        }

        &--warning {
            color: var(--smu-white);
            background: var(--smu-warning-color);
            border-color: var(--smu-warning-color);
        }

        &--danger {
            color: var(--smu-white);
            background: var(--smu-danger-color);
            border-color: var(--smu-danger-color);
        }

        // ========== 朴素 ==========
        &--plain {
            background: var(--smu-white);

            &.smu-button--primary {
                color: var(--smu-primary-color);
            }
            &.smu-button--success {
                color: var(--smu-success-color);
            }
            &.smu-button--warning {
                color: var(--smu-warning-color);
            }
            &.smu-button--danger {
                color: var(--smu-danger-color);
            }
        }

        // ========== 尺寸 ==========
        &--large {
            width: 100%;
            height: 50px;
        }

        &--small {
            height: 32px;
            padding: 0 8px;
            font-size: var(--smu-font-size-sm);
        }

        &--mini {
            height: 24px;
            padding: 0 4px;
            font-size: var(--smu-font-size-xs);
        }

        // ========== 形状 ==========
        &--round {
            border-radius: var(--smu-radius-max);
        }

        &--square {
            border-radius: 0;
        }

        &--block {
            display: flex;
            width: 100%;
        }

        // ========== 状态 ==========
        &--disabled {
            cursor: not-allowed;
            opacity: var(--smu-disabled-opacity);

            &:active::before {
                opacity: 0;
            }
        }

        &--loading {
            cursor: default;

            &:active::before {
                opacity: 0;
            }
        }
    }
</style>
