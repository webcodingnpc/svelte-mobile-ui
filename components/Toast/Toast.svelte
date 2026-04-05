<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Loading from '../Loading/Loading.svelte'
  import Overlay from '../Overlay/Overlay.svelte'

  let {
    show = $bindable(false),
    type = 'text',
    message = '',
    icon = '',
    position = 'middle',
    duration = 2000,
    overlay = false,
    forbidClick = false,
    closeOnClick = false,
    closeOnClickOverlay = false,
    zIndex = 2010,
    class: className = '',
  }: {
    show?: boolean
    type?: 'text' | 'loading' | 'success' | 'fail' | 'html'
    message?: string | number
    icon?: string
    position?: 'top' | 'middle' | 'bottom'
    duration?: number
    overlay?: boolean
    forbidClick?: boolean
    closeOnClick?: boolean
    closeOnClickOverlay?: boolean
    zIndex?: number
    class?: string
  } = $props()

  let timer: ReturnType<typeof setTimeout>

  $effect(() => {
    if (show && duration > 0 && type !== 'loading') {
      clearTimeout(timer)
      timer = setTimeout(() => { show = false }, duration)
    }
    return () => clearTimeout(timer)
  })

  const iconName = $derived(icon || (type === 'success' ? 'success' : type === 'fail' ? 'fail' : ''))
</script>

{#if show}
  {#if overlay || forbidClick}
    <Overlay show={true} zIndex={zIndex} customStyle={forbidClick && !overlay ? 'background: transparent' : ''} />
  {/if}
  <div
    class="smu-toast smu-toast--{position} smu-toast--{type === 'html' ? 'text' : (iconName || type === 'loading') ? 'icon' : 'text'} {className}"
    style="z-index: {zIndex + 1}"
    onclick={() => closeOnClick && (show = false)}
  >
    {#if type === 'loading'}
      <Loading class="smu-toast__loading" type="spinner" color="white" />
    {:else if iconName}
      <Icon name={iconName} class="smu-toast__icon" size="36" />
    {/if}
    {#if message}
      {#if type === 'html'}
        <div class="smu-toast__text">{@html message}</div>
      {:else}
        <div class="smu-toast__text">{message}</div>
      {/if}
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-toast {
    position: fixed;
    left: 50%;
    display: flex;
    max-width: 70%;
    padding: var(--smu-padding-xs) var(--smu-padding-sm);
    color: var(--smu-white);
    font-size: var(--smu-font-size-md);
    line-height: var(--smu-line-height-md);
    white-space: pre-wrap;
    word-break: break-all;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--smu-radius-lg);
    transform: translateX(-50%);
    animation: smu-fade-in var(--smu-duration-fast);

    &--top { top: 20%; }
    &--middle { top: 50%; transform: translate(-50%, -50%); }
    &--bottom { bottom: 20%; }

    &--icon {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 96px;
      min-height: 96px;
      padding: var(--smu-padding-md);
    }

    &--text {
      align-items: center;
      min-width: 96px;
      padding: var(--smu-padding-xs) var(--smu-padding-sm);
    }

    &__icon {
      font-size: 36px;
    }

    &__loading {
      margin: 0 auto;
    }

    &__text {
      margin-top: 8px;
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);

      .smu-toast--text & { margin-top: 0; }
    }
  }

  @keyframes smu-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
