<script lang="ts">
  import Popup from '../Popup/Popup.svelte'
  import Loading from '../Loading/Loading.svelte'
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    show = $bindable(false),
    title = '',
    description = '',
    cancelText = '',
    closeable = true,
    closeIcon = 'cross',
    round = true,
    safeAreaInsetBottom = true,
    actions = [],
    onSelect,
    onCancel,
    onclose,
    children,
    class: className = '',
  }: {
    show?: boolean
    title?: string
    description?: string
    cancelText?: string
    closeable?: boolean
    closeIcon?: string
    round?: boolean
    safeAreaInsetBottom?: boolean
    actions?: Array<{ name: string; subname?: string; color?: string; loading?: boolean; disabled?: boolean; className?: string }>
    onSelect?: (action: any, index: number) => void
    onCancel?: () => void
    onclose?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function handleClose() { show = false; onclose?.() }
</script>

<Popup bind:show position="bottom" {round} {closeable} closeIcon={title ? closeIcon : ''} {safeAreaInsetBottom} onclose={handleClose}>
  <div class="smu-action-sheet {className}">
    {#if title}
      <div class="smu-action-sheet__header">{title}</div>
    {/if}
    {#if description}
      <div class="smu-action-sheet__description">{description}</div>
    {/if}
    {#if children}
      <div class="smu-action-sheet__content">{@render children()}</div>
    {:else}
      {#each actions as action, i}
        <button
          class="smu-action-sheet__item {action.disabled ? 'smu-action-sheet__item--disabled' : ''} {action.className || ''}"
          style="{action.color ? `color: ${action.color}` : ''}"
          disabled={action.disabled || action.loading}
          onclick={() => { if (!action.disabled && !action.loading) { onSelect?.(action, i); show = false } }}
          type="button"
        >
          {#if action.loading}
            <Loading size="20px" />
          {:else}
            <span class="smu-action-sheet__name">{action.name}</span>
            {#if action.subname}<div class="smu-action-sheet__subname">{action.subname}</div>{/if}
          {/if}
        </button>
      {/each}
    {/if}
    {#if cancelText}
      <div class="smu-action-sheet__gap"></div>
      <button class="smu-action-sheet__cancel" onclick={() => { show = false; onCancel?.() }} type="button">{cancelText}</button>
    {/if}
  </div>
</Popup>

<style lang="scss">
  .smu-action-sheet {
    max-height: 80vh;
    overflow-y: auto;
    color: var(--smu-text-color);

    &__header {
      padding: 12px 16px;
      font-weight: var(--smu-font-bold);
      font-size: var(--smu-font-size-lg);
      line-height: var(--smu-line-height-lg);
      text-align: center;
    }

    &__description {
      padding: 12px 16px;
      color: var(--smu-text-color-2);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
      text-align: center;
    }

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px 16px;
      font-size: var(--smu-font-size-lg);
      background: var(--smu-background-2);
      border: none;
      cursor: pointer;

      &:active { background: var(--smu-active-color); }
      &--disabled { color: var(--smu-gray-5); cursor: not-allowed; &:active { background: var(--smu-background-2); } }
    }

    &__subname {
      margin-top: var(--smu-padding-xs);
      color: var(--smu-text-color-2);
      font-size: var(--smu-font-size-sm);
    }

    &__gap { display: block; height: 8px; background: var(--smu-background); }

    &__cancel {
      display: block;
      width: 100%;
      padding: 14px;
      font-size: var(--smu-font-size-lg);
      background: var(--smu-background-2);
      border: none;
      cursor: pointer;
      &:active { background: var(--smu-active-color); }
    }
  }
</style>