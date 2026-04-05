<script lang="ts">
    /**
     * Icon 图标组件
     * 基于 SVG 实现，支持内置图标和自定义内容
     */
    import { iconSvgContent } from "../../utils/icons";

    let {
        name = "",
        size = "",
        color = "",
        dot = false,
        badge = "",
        classPrefix = "smu-icon",
        onclick,
        class: className = "",
    }: {
        name?: string;
        size?: string | number;
        color?: string;
        dot?: boolean;
        badge?: string | number;
        classPrefix?: string;
        onclick?: (e: MouseEvent) => void;
        class?: string;
    } = $props();

    const svgContent = $derived(iconSvgContent[name] || "");
    const style = $derived(
        [
            size
                ? `font-size: ${typeof size === "number" ? size + "px" : size}`
                : "",
            color ? `color: ${color}` : "",
        ]
            .filter(Boolean)
            .join("; "),
    );
</script>

<i
    class="smu-icon {className}"
    {style}
    {onclick}
    role={onclick ? "button" : undefined}
    tabindex={onclick ? 0 : undefined}
>
    {#if svgContent}
        <svg
            class="smu-icon__image"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
        >
            {@html svgContent}
        </svg>
    {/if}
    {#if dot}
        <div class="smu-icon__dot"></div>
    {/if}
    {#if badge}
        <div class="smu-icon__badge">{badge}</div>
    {/if}
</i>

<style lang="scss">
    .smu-icon {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        line-height: 1;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;

        &__image {
            width: 1em;
            height: 1em;
            fill: currentColor;
        }

        &__dot {
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            background: var(--smu-danger-color);
            border-radius: 50%;
            transform: translate(50%, -50%);
        }

        &__badge {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 16px;
            height: 16px;
            padding: 0 3px;
            color: var(--smu-white);
            font-size: var(--smu-font-size-xs);
            font-weight: var(--smu-font-bold);
            line-height: 16px;
            text-align: center;
            background: var(--smu-danger-color);
            border: 1px solid var(--smu-white);
            border-radius: var(--smu-radius-max);
            transform: translate(50%, -50%);
        }
    }
</style>
