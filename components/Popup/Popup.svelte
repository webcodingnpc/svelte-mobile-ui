<script lang="ts">
  import Overlay from '../Overlay/Overlay.svelte'
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    position = 'center',
    round = false,
    closeable = false,
    closeIcon = 'cross',
    closeIconPosition = 'top-right',
    overlay = true,
    lockScroll = true,
    duration = 0.3,
    safeAreaInsetBottom = false,
    safeAreaInsetTop = false,
    zIndex = 2000,
    onclose,
    children,
    class: className = '',
  }: {
    show?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
    round?: boolean
    closeable?: boolean
    closeIcon?: string
    closeIconPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    overlay?: boolean
    lockScroll?: boolean
    duration?: number
    safeAreaInsetBottom?: boolean
    safeAreaInsetTop?: boolean
    zIndex?: number
    onclose?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function close() {
    show = false
    onclose?.()
  }
</script>

{#if show}
  {#if overlay}
    <Overlay {show} zIndex={zIndex} onclick={close} />
  {/if}
  <div
    class="smu-popup smu-popup--{position} {round ? 'smu-popup--round' : ''} {safeAreaInsetBottom ? 'smu-safe-area-bottom' : ''} {safeAreaInsetTop ? 'smu-safe-area-top' : ''} {className}"
    style="z-index: {zIndex}; animation-duration: {duration}s"
    role="dialog"
  >
    {#if children}{@render children()}{/if}
    {#if closeable}
      <div class="smu-popup__close-icon smu-popup__close-icon--{closeIconPosition}" onclick={close} role="button" tabindex="0">
        <Icon name={closeIcon} />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background: var(--smu-background-2);
    transition: transform var(--smu-duration-base);
    -webkit-overflow-scrolling: touch;

    &--center {
      top: 50%;
      left: 0;
      right: 0;
      width: fit-content;
      max-width: calc(100vw - var(--smu-padding-md) * 2);
      margin: 0 auto;
      transform: translateY(-50%);
      animation: smu-fade-in var(--smu-duration-base);
    }

    &--top {
      top: 0;
      left: 0;
      width: 100%;
      animation: smu-slide-top-in var(--smu-duration-base);
    }

    &--bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      animation: smu-slide-bottom-in var(--smu-duration-base);
    }

    &--left {
      top: 0;
      left: 0;
      height: 100%;
      animation: smu-slide-left-in var(--smu-duration-base);
    }

    &--right {
      top: 0;
      right: 0;
      height: 100%;
      animation: smu-slide-right-in var(--smu-duration-base);
    }

    &--round {
      &.smu-popup--top { border-radius: 0 0 16px 16px; }
      &.smu-popup--bottom { border-radius: 16px 16px 0 0; }
      &.smu-popup--left { border-radius: 0 16px 16px 0; }
      &.smu-popup--right { border-radius: 16px 0 0 16px; }
      &.smu-popup--center { border-radius: 16px; }
    }

    &__close-icon {
      position: absolute;
      z-index: 1;
      color: var(--smu-gray-5);
      font-size: 22px;
      cursor: pointer;

      &--top-right { top: 16px; right: 16px; }
      &--top-left { top: 16px; left: 16px; }
      &--bottom-right { bottom: 16px; right: 16px; }
      &--bottom-left { bottom: 16px; left: 16px; }
    }
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes smu-slide-top-in {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  @keyframes smu-slide-bottom-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes smu-slide-left-in {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes smu-slide-right-in {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
</style>
