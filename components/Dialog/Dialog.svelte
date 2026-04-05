<script lang="ts">
  import Popup from '../Popup/Popup.svelte'
  import Button from '../Button/Button.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    title = '',
    message = '',
    messageAlign = 'center',
    theme = 'default',
    showConfirmButton = true,
    showCancelButton = false,
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    confirmButtonColor = '',
    cancelButtonColor = '',
    closeOnClickOverlay = false,
    width = '320px',
    onConfirm,
    onCancel,
    onclose,
    children,
    footerSlot,
    class: className = '',
  }: {
    show?: boolean
    title?: string
    message?: string
    messageAlign?: 'left' | 'center' | 'right'
    theme?: 'default' | 'round-button'
    showConfirmButton?: boolean
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonColor?: string
    cancelButtonColor?: string
    closeOnClickOverlay?: boolean
    width?: string
    onConfirm?: () => void
    onCancel?: () => void
    onclose?: () => void
    children?: Snippet
    footerSlot?: Snippet
    class?: string
  } = $props()

  function handleConfirm() { onConfirm?.(); show = false }
  function handleCancel() { onCancel?.(); show = false }
</script>

<Popup bind:show position="center" overlay={true} zIndex={2010} onclose={() => { onclose?.() }}>
  <div class="smu-dialog {className}" style="width: {width}">
    {#if title}
      <div class="smu-dialog__header">{title}</div>
    {/if}
    <div class="smu-dialog__content" style="text-align: {messageAlign}">
      {#if children}{@render children()}{:else if message}{message}{/if}
    </div>
    {#if footerSlot}
      {@render footerSlot()}
    {:else}
      <div class="smu-dialog__footer {theme === 'round-button' ? 'smu-dialog__footer--round' : ''}">
        {#if showCancelButton}
          {#if theme === 'round-button'}
            <Button type="default" round size="large" onclick={handleCancel} class="smu-dialog__cancel" color={cancelButtonColor}>{cancelButtonText}</Button>
          {:else}
            <button class="smu-dialog__cancel" onclick={handleCancel} style="{cancelButtonColor ? `color: ${cancelButtonColor}` : ''}" type="button">{cancelButtonText}</button>
          {/if}
        {/if}
        {#if showConfirmButton}
          {#if theme === 'round-button'}
            <Button type="primary" round size="large" onclick={handleConfirm} class="smu-dialog__confirm" color={confirmButtonColor}>{confirmButtonText}</Button>
          {:else}
            <button class="smu-dialog__confirm" onclick={handleConfirm} style="{confirmButtonColor ? `color: ${confirmButtonColor}` : ''}" type="button">{confirmButtonText}</button>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</Popup>

<style lang="scss">
  .smu-dialog {
    position: relative;
    width: 320px;
    overflow: hidden;
    font-size: var(--smu-font-size-lg);
    background: var(--smu-background-2);
    border-radius: 16px;

    &__header {
      padding-top: 26px;
      font-weight: var(--smu-font-bold);
      line-height: 24px;
      text-align: center;
    }

    &__content {
      padding: 26px var(--smu-padding-lg);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
      color: var(--smu-text-color-2);
      max-height: 60vh;
      overflow-y: auto;
    }

    &__footer {
      display: flex;
      overflow: hidden;
      user-select: none;

      &--round { padding: 8px 24px 16px; gap: 12px; }
    }

    &__confirm,
    &__cancel {
      flex: 1;
      height: 48px;
      margin: 0;
      padding: 0;
      font-size: var(--smu-font-size-lg);
      border: none;
      cursor: pointer;
      background: var(--smu-background-2);

      &:active { background: var(--smu-active-color); }
    }

    &__confirm { color: var(--smu-primary-color); font-weight: var(--smu-font-bold); }
    &__cancel { color: var(--smu-text-color); }

    &__footer:not(&__footer--round) {
      border-top: 1px solid var(--smu-border-color);
    }

    &__footer:not(&__footer--round) &__cancel + &__confirm {
      border-left: 1px solid var(--smu-border-color);
    }
  }
</style>