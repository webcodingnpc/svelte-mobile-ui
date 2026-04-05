<script lang="ts">
    let {
        row = 3,
        rowWidth = "100%",
        round = false,
        class: className = "",
    }: {
        row?: number;
        rowWidth?: string | string[];
        round?: boolean;
        class?: string;
    } = $props();

    function getRowWidth(index: number): string {
        if (Array.isArray(rowWidth)) {
            return rowWidth[index] || "100%";
        }
        if (index === row - 1) {
            return "60%";
        }
        return rowWidth;
    }
</script>

<div class="smu-skeleton-paragraph {className}">
    {#each Array(row) as _, i}
        <div
            class="smu-skeleton-paragraph__row {round
                ? 'smu-skeleton-paragraph__row--round'
                : ''}"
            style="width: {getRowWidth(i)}"
        ></div>
    {/each}
</div>

<style lang="scss">
    .smu-skeleton-paragraph {
        padding: 0 var(--smu-padding-md);

        &__row {
            height: 16px;
            background: var(--smu-active-color);
            animation: smu-skeleton-blink 1.2s ease-in-out infinite;

            &:not(:first-child) {
                margin-top: 12px;
            }

            &--round {
                border-radius: var(--smu-radius-max);
            }
        }
    }

    @keyframes smu-skeleton-blink {
        50% {
            opacity: 0.6;
        }
    }
</style>
