<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Badge from '../Badge/Badge.svelte'
  import type { Snippet } from 'svelte'

  let {
    name = '',
    icon = '',
    dot = false,
    badge = '',
    isActive = false,
    activeColor = '',
    inactiveColor = '',
    children,
    iconSlot,
    onclick,
    class: className = '',
  }: {
    name?: string | number
    icon?: string
    dot?: boolean
    badge?: string | number
    isActive?: boolean
    activeColor?: string
    inactiveColor?: string
    children?: Snippet
    iconSlot?: Snippet
    onclick?: () => void
    class?: string
  } = $props()

  const color = $derived(isActive ? (activeColor || 'var(--smu-primary-color)') : (inactiveColor || 'var(--smu-gray-7)'))
</script>

<div class="smu-tabbar-item {isActive ? 'smu-tabbar-item--active' : ''} {className}" style="color: {color}" onclick={onclick} role="tab" tabindex="0">
  <div class="smu-tabbar-item__icon">
    {#if iconSlot}
      <Badge {dot} content={badge}>{@render iconSlot()}</Badge>
    {:else if icon}
      <Badge {dot} content={badge}><Icon name={icon} size="22" /></Badge>
    {/if}
  </div>
  {#if children}
    <div class="smu-tabbar-item__text">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-tabbar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--smu-gray-7);
    font-size: var(--smu-font-size-sm);
    line-height: 1;
    cursor: pointer;

    &--active { color: var(--smu-primary-color); }

    &__icon {
      position: relative;
      margin-bottom: 4px;
      font-size: 22px;
    }

    &__text {
      font-size: var(--smu-font-size-xs);
    }
  }
</style>
