<script lang="ts">
    let {
        class: className = "",
    }: {
        class?: string;
    } = $props();
</script>

<div class="smu-skeleton-avatar {className}"></div>

<style lang="scss">
    .smu-skeleton-avatar {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: var(--smu-active-color);
        border-radius: 50%;
        animation: smu-skeleton-blink 1.2s ease-in-out infinite;
    }

    @keyframes smu-skeleton-blink {
        50% {
            opacity: 0.6;
        }
    }
</style>
