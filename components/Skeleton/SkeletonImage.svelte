<script lang="ts">
    let {
        class: className = "",
    }: {
        class?: string;
    } = $props();
</script>

<div class="smu-skeleton-image {className}">
    <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.667 0H5.333C2.388 0 0 2.388 0 5.333v21.334C0 29.612 2.388 32 5.333 32h21.334C29.612 32 32 29.612 32 26.667V5.333C32 2.388 29.612 0 26.667 0zm-16 5.333a4 4 0 110 8 4 4 0 010-8zm18.666 21.334a2.667 2.667 0 01-2.666 2.666H5.333a2.667 2.667 0 01-2.666-2.666V22l7.39-7.39a1.333 1.333 0 011.886 0L18 20.667l5.057-5.057a1.333 1.333 0 011.886 0l4.39 4.39v6.667z"
            opacity="0.8"
        />
    </svg>
</div>

<style lang="scss">
    .smu-skeleton-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 96px;
        height: 96px;
        background: var(--smu-active-color);
        animation: smu-skeleton-blink 1.2s ease-in-out infinite;

        svg {
            width: 32px;
            height: 32px;
            color: var(--smu-gray-5);
        }
    }

    @keyframes smu-skeleton-blink {
        50% {
            opacity: 0.6;
        }
    }
</style>
