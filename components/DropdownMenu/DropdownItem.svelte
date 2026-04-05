<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        value = $bindable(""),
        title = "",
        disabled = false,
        titleClass = "",
        options = [],
        onchange,
        children,
        titleSlot,
        class: className = "",
    }: {
        value?: string | number;
        title?: string;
        disabled?: boolean;
        titleClass?: string;
        options?: Array<{
            text: string;
            value: string | number;
            icon?: string;
        }>;
        onchange?: (value: string | number) => void;
        children?: Snippet;
        titleSlot?: Snippet;
        class?: string;
    } = $props();

    let isOpen = $state(false);

    function toggleOpen() {
        if (disabled) return;
        isOpen = !isOpen;
    }

    function handleSelect(optValue: string | number) {
        value = optValue;
        isOpen = false;
        onchange?.(optValue);
    }

    let displayTitle = $derived(() => {
        const found = options.find((o) => o.value === value);
        return found ? found.text : title;
    });
</script>

<div
    class="smu-dropdown-item {isOpen
        ? 'smu-dropdown-item--active'
        : ''} {className}"
>
    {#if isOpen}
        <div
            class="smu-dropdown-item__overlay"
            onclick={() => (isOpen = false)}
        ></div>
        <div class="smu-dropdown-item__content">
            {#if children}
                {@render children()}
            {:else}
                {#each options as option}
                    <div
                        class="smu-dropdown-item__option {option.value === value
                            ? 'smu-dropdown-item__option--active'
                            : ''}"
                        onclick={() => handleSelect(option.value)}
                    >
                        <span class="smu-dropdown-item__option-text"
                            >{option.text}</span
                        >
                        {#if option.value === value}
                            <span class="smu-dropdown-item__option-icon">✓</span
                            >
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    .smu-dropdown-item {
        position: relative;

        &__overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 2000;
        }

        &__content {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 2010;
            overflow-y: auto;
            max-height: 80vh;
            background: var(--smu-background-2);
        }

        &__option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            font-size: var(--smu-font-size-md);
            line-height: 24px;
            cursor: pointer;

            &:active {
                background: var(--smu-active-color);
            }

            &--active {
                color: var(--smu-primary-color);
            }

            &-icon {
                color: var(--smu-primary-color);
                font-size: 16px;
            }
        }
    }
</style>
