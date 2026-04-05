<script lang="ts">
    let {
        round = false,
        width = "40%",
        class: className = "",
    }: {
        round?: boolean;
        width?: string;
        class?: string;
    } = $props();
</script>

<div
    class="smu-skeleton-title {round
        ? 'smu-skeleton-title--round'
        : ''} {className}"
    style="width: {width}"
></div>

<style lang="scss">
    .smu-skeleton-title {
        height: 16px;
        margin: var(--smu-padding-sm) 0;
        padding: 0 var(--smu-padding-md);
        background: var(--smu-active-color);
        animation: smu-skeleton-blink 1.2s ease-in-out infinite;

        &--round {
            border-radius: var(--smu-radius-max);
        }
    }

    @keyframes smu-skeleton-blink {
        50% {
            opacity: 0.6;
        }
    }
</style>
