<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    name = '',
    icon = '',
    label = '',
    value = '',
    border = true,
    isLink = true,
    disabled = false,
    readonly = false,
    isExpanded = $bindable(false),
    children,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    name?: string | number
    icon?: string
    label?: string
    value?: string
    border?: boolean
    isLink?: boolean
    disabled?: boolean
    readonly?: boolean
    isExpanded?: boolean
    children?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()

  function toggle() {
    if (disabled || readonly) return
    isExpanded = !isExpanded
  }
</script>

<div class="smu-collapse-item {isExpanded ? 'smu-collapse-item--expanded' : ''} {className}">
  <div class="smu-cell smu-cell--clickable {border ? 'smu-cell--border' : ''}" onclick={toggle} role="button" tabindex="0">
    {#if icon}<Icon name={icon} class="smu-cell__left-icon" />{/if}
    <div class="smu-cell__title">
      {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
      {#if label}<div class="smu-cell__label">{label}</div>{/if}
    </div>
    <div class="smu-cell__value">{value}</div>
    {#if isLink}
      <Icon name="arrow-down" class="smu-collapse-item__arrow {isExpanded ? 'smu-collapse-item__arrow--expanded' : ''}" />
    {/if}
  </div>
  {#if isExpanded}
    <div class="smu-collapse-item__wrapper">
      <div class="smu-collapse-item__content">
        {#if children}{@render children()}{/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-collapse-item {
    position: relative;

    &__arrow {
      transition: transform var(--smu-duration-base);
      color: var(--smu-gray-6);
      font-size: 16px;

      &--expanded { transform: rotate(180deg); }
    }

    &__wrapper {
      overflow: hidden;
    }

    &__content {
      padding: 12px 16px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      line-height: 1.5;
      background: var(--smu-background-2);
    }
  }

  .smu-cell {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: var(--smu-background-2);
    &--clickable { cursor: pointer; &:active { background: var(--smu-active-color); } }
    &--border::after {
      position: absolute; content: ''; right: 16px; bottom: 0; left: 16px;
      border-bottom: 1px solid var(--smu-border-color); transform: scaleY(0.5);
    }
    &__left-icon { margin-right: 4px; font-size: 16px; }
    &__title { flex: 1; font-size: var(--smu-font-size-md); line-height: 24px; }
    &__value { color: var(--smu-gray-6); font-size: var(--smu-font-size-md); }
    &__label { margin-top: 4px; color: var(--smu-gray-6); font-size: var(--smu-font-size-sm); }
  }
</style>