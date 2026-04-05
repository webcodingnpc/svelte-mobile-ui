<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        activeIndex = 0,
        status = "waiting",
        title = "",
        description = "",
        icon = "",
        iconPrefix = "",
        children,
        titleSlot,
        descriptionSlot,
        iconSlot,
        class: className = "",
    }: {
        activeIndex?: number;
        status?: "waiting" | "process" | "finish";
        title?: string;
        description?: string;
        icon?: string;
        iconPrefix?: string;
        children?: Snippet;
        titleSlot?: Snippet;
        descriptionSlot?: Snippet;
        iconSlot?: Snippet;
        class?: string;
    } = $props();
</script>

<div class="smu-step smu-step--{status} {className}">
    <div class="smu-step__circle-container">
        {#if iconSlot}
            {@render iconSlot()}
        {:else}
            <div class="smu-step__circle"></div>
        {/if}
        <div class="smu-step__line"></div>
    </div>
    <div class="smu-step__info">
        <div class="smu-step__title">
            {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
        </div>
        {#if description || descriptionSlot}
            <div class="smu-step__description">
                {#if descriptionSlot}{@render descriptionSlot()}{:else}{description}{/if}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .smu-step {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        color: var(--smu-gray-6);
        font-size: var(--smu-font-size-sm);

        &--process {
            color: var(--smu-text-color);
            .smu-step__circle {
                background: var(--smu-primary-color);
            }
        }

        &--finish {
            color: var(--smu-primary-color);
            .smu-step__circle {
                background: var(--smu-primary-color);
            }
            .smu-step__line {
                background: var(--smu-primary-color);
            }
        }

        &__circle-container {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;
        }

        &__circle {
            width: 12px;
            height: 12px;
            background: var(--smu-gray-5);
            border-radius: 50%;
            flex-shrink: 0;
            z-index: 1;
        }

        &__line {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 1px;
            background: var(--smu-gray-5);
            transform: translateY(-50%);
        }

        &:last-child .smu-step__line {
            display: none;
        }

        &__info {
            margin-top: 8px;
            text-align: center;
        }

        &__title {
            font-size: var(--smu-font-size-sm);
            line-height: 1.4;
        }

        &__description {
            margin-top: 4px;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-xs);
        }
    }
</style>
