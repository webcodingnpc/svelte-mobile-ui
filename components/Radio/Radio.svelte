<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    checked = $bindable(false),
    disabled = false,
    shape = 'round',
    iconSize = '20px',
    checkedColor = '',
    labelPosition = 'right',
    labelDisabled = false,
    name = '',
    onclick,
    children,
    class: className = '',
  }: {
    checked?: boolean
    disabled?: boolean
    shape?: 'round' | 'square' | 'dot'
    iconSize?: string
    checkedColor?: string
    labelPosition?: 'left' | 'right'
    labelDisabled?: boolean
    name?: string
    onclick?: () => void
    children?: Snippet
    class?: string
  } = $props()

  function toggle() {
    if (disabled) return
    checked = true
    onclick?.()
  }
</script>

<div class="smu-radio {disabled ? 'smu-radio--disabled' : ''} smu-radio--label-{labelPosition} {className}" onclick={toggle} role="radio" aria-checked={checked} tabindex="0">
  {#if labelPosition === 'left' && children}
    <span class="smu-radio__label">{@render children()}</span>
  {/if}
  <div class="smu-radio__icon smu-radio__icon--{shape} {checked ? 'smu-radio__icon--checked' : ''}" style="font-size: {iconSize}; {checked && checkedColor ? `border-color: ${checkedColor}; background: ${shape === 'dot' ? 'var(--smu-white)' : checkedColor}` : ''}">
    {#if shape === 'dot'}
      <div class="smu-radio__dot" style="{checked && checkedColor ? `background: ${checkedColor}` : ''}"></div>
    {:else}
      <Icon name="success" size="0.8em" />
    {/if}
  </div>
  {#if labelPosition === 'right' && children}
    <span class="smu-radio__label">{@render children()}</span>
  {/if}
</div>

<style lang="scss">
  .smu-radio {
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    user-select: none;

    &--disabled { cursor: not-allowed; opacity: var(--smu-disabled-opacity); }
    &--label-left { flex-direction: row-reverse; }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 1.25em;
      height: 1.25em;
      font-size: 20px;
      color: transparent;
      border: 1px solid var(--smu-gray-5);
      transition: all var(--smu-duration-fast);
      border-radius: 50%;

      &--square { border-radius: var(--smu-radius-sm); }

      &--checked {
        color: var(--smu-white);
        background: var(--smu-primary-color);
        border-color: var(--smu-primary-color);
      }
    }

    &__dot {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: var(--smu-primary-color);
      transition: all var(--smu-duration-fast);
    }

    &__label {
      margin-left: var(--smu-padding-xs);
      color: var(--smu-text-color);
      font-size: var(--smu-font-size-md);
      line-height: 20px;

      .smu-radio--label-left & {
        margin: 0 var(--smu-padding-xs) 0 0;
      }
    }
  }
</style>
