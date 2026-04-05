<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        title = "",
        nextStepText = "下一步",
        tabs = [],
        activeTab = $bindable(0),
        children,
        class: className = "",
    }: {
        title?: string;
        nextStepText?: string;
        tabs?: string[];
        activeTab?: number;
        children?: Snippet;
        class?: string;
    } = $props();

    function handleNext() {
        if (activeTab < tabs.length - 1) {
            activeTab++;
        }
    }

    function handlePrev() {
        if (activeTab > 0) {
            activeTab--;
        }
    }
</script>

<div class="smu-picker-group {className}">
    {#if title || tabs.length > 0}
        <div class="smu-picker-group__header">
            {#if title}
                <div class="smu-picker-group__title">{title}</div>
            {/if}
            {#if tabs.length > 0}
                <div class="smu-picker-group__tabs">
                    {#each tabs as tab, i}
                        <div
                            class="smu-picker-group__tab {i === activeTab
                                ? 'smu-picker-group__tab--active'
                                : ''}"
                            onclick={() => (activeTab = i)}
                        >
                            {tab}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
    <div class="smu-picker-group__content">
        {#if children}{@render children()}{/if}
    </div>
</div>

<style lang="scss">
    .smu-picker-group {
        background: var(--smu-background-2);

        &__header {
            padding: var(--smu-padding-md);
        }

        &__title {
            text-align: center;
            font-size: var(--smu-font-size-lg);
            font-weight: var(--smu-font-bold);
            line-height: 44px;
        }

        &__tabs {
            display: flex;
            border-bottom: 1px solid var(--smu-border-color);
        }

        &__tab {
            flex: 1;
            padding: 8px 0;
            text-align: center;
            font-size: var(--smu-font-size-md);
            color: var(--smu-gray-6);
            cursor: pointer;

            &--active {
                color: var(--smu-text-color);
                font-weight: var(--smu-font-bold);
                border-bottom: 2px solid var(--smu-primary-color);
            }
        }

        &__content {
            position: relative;
        }
    }
</style>
