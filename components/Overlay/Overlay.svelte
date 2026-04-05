<script lang="ts">
  let {
    show = false,
    zIndex = 1,
    duration = 0.3,
    lockScroll = true,
    customStyle = '',
    onclick,
    class: className = '',
  }: {
    show?: boolean
    zIndex?: number
    duration?: number
    lockScroll?: boolean
    customStyle?: string
    onclick?: (e: MouseEvent) => void
    class?: string
  } = $props()
</script>

{#if show}
  <div
    class="smu-overlay {className}"
    style="z-index: {zIndex}; animation-duration: {duration}s; {customStyle}"
    onclick={onclick}
    role="presentation"
  ></div>
{/if}

<style lang="scss">
  .smu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    animation: smu-fade-in var(--smu-duration-base);
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
