<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    value = '',
    label = '',
    icon = '',
    size = '',
    border = true,
    center = false,
    isLink = false,
    required = false,
    arrowDirection = 'right',
    clickable = false,
    titleClass = '',
    valueClass = '',
    labelClass = '',
    onclick,
    children,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    value?: string | number
    label?: string
    icon?: string
    size?: '' | 'large'
    border?: boolean
    center?: boolean
    isLink?: boolean
    required?: boolean
    arrowDirection?: 'up' | 'down' | 'left' | 'right'
    clickable?: boolean | null
    titleClass?: string
    valueClass?: string
    labelClass?: string
    onclick?: (e: MouseEvent) => void
    children?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()

  const isClickable = $derived(clickable ?? isLink)
</script>

<div
  class="smu-cell {size ? `smu-cell--${size}` : ''} {center ? 'smu-cell--center' : ''} {required ? 'smu-cell--required' : ''} {border ? 'smu-cell--border' : ''} {isClickable ? 'smu-cell--clickable' : ''} {className}"
  role={isClickable ? 'button' : undefined}
  tabindex={isClickable ? 0 : undefined}
  onclick={onclick}
>
  {#if icon}
    <Icon name={icon} class="smu-cell__left-icon" />
  {/if}
  <div class="smu-cell__title {titleClass}">
    {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
    {#if label}<div class="smu-cell__label {labelClass}">{label}</div>{/if}
  </div>
  <div class="smu-cell__value {valueClass}">
    {#if children}{@render children()}{:else}{value}{/if}
  </div>
  {#if isLink}
    <Icon name="arrow" class="smu-cell__right-icon smu-cell__right-icon--{arrowDirection}" />
  {/if}
</div>

<style lang="scss">
  .smu-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: var(--smu-text-color);
    font-size: var(--smu-font-size-md);
    line-height: 24px;
    background: var(--smu-background-2);

    &--border::after {
      position: absolute;
      box-sizing: border-box;
      content: '';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid var(--smu-border-color);
      transform: scaleY(0.5);
    }

    &--center { align-items: center; }

    &--required::before {
      position: absolute;
      left: 8px;
      color: var(--smu-danger-color);
      font-size: var(--smu-font-size-md);
      content: '*';
    }

    &--clickable {
      cursor: pointer;
      &:active { background: var(--smu-active-color); }
    }

    &--large {
      padding-top: 12px;
      padding-bottom: 12px;

      .smu-cell__title { font-size: var(--smu-font-size-lg); }
      .smu-cell__label { font-size: var(--smu-font-size-md); }
    }

    &__left-icon {
      margin-right: 4px;
      font-size: 16px;
      line-height: 24px;
    }

    &__right-icon {
      margin-left: 4px;
      color: var(--smu-gray-6);
      font-size: 16px;
      line-height: 24px;
      flex-shrink: 0;

      &--up { transform: rotate(90deg); }
      &--down { transform: rotate(-90deg); }
      &--left { transform: rotate(0deg); }
    }

    &__title {
      flex: 1;
    }

    &__value {
      position: relative;
      overflow: hidden;
      color: var(--smu-gray-6);
      text-align: right;
      vertical-align: middle;
      word-wrap: break-word;
    }

    &__label {
      margin-top: 4px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-sm);
      line-height: var(--smu-line-height-sm);
    }
  }
</style>
