<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    active = $bindable(0),
    type = 'line',
    color = '',
    background = '',
    lineWidth = 40,
    lineHeight = 3,
    sticky = false,
    animated = false,
    swipeable = false,
    scrollspy = false,
    ellipsis = true,
    shrink = false,
    onChange,
    items = [],
    children,
    class: className = '',
  }: {
    active?: number | string
    type?: 'line' | 'card'
    color?: string
    background?: string
    lineWidth?: number | string
    lineHeight?: number | string
    sticky?: boolean
    animated?: boolean
    swipeable?: boolean
    scrollspy?: boolean
    ellipsis?: boolean
    shrink?: boolean
    onChange?: (index: number | string) => void
    items?: Array<{ title: string; name?: string; disabled?: boolean; badge?: string | number; dot?: boolean }>
    children?: Snippet
    class?: string
  } = $props()

  function handleClick(index: number, name?: string) {
    const val = name ?? index
    active = val
    onChange?.(val)
  }
</script>

<div class="smu-tabs smu-tabs--{type} {className}">
  <div class="smu-tabs__wrap {type === 'line' ? 'smu-hairline--top-bottom' : ''}" style="{background ? `background: ${background}` : ''}">
    <div class="smu-tabs__nav smu-tabs__nav--{type}" role="tablist">
      {#each items as item, i}
        {@const isActive = (item.name ?? i) === active}
        <div
          class="smu-tab {isActive ? 'smu-tab--active' : ''} {item.disabled ? 'smu-tab--disabled' : ''} {shrink ? 'smu-tab--shrink' : ''} {ellipsis ? 'smu-ellipsis' : ''}"
          style="{isActive && type === 'card' && color ? `color: var(--smu-white); border-color: ${color}; background: ${color}` : ''} {!isActive && type === 'card' && color ? `border-color: ${color}; color: ${color}` : ''} {isActive && type === 'line' && color ? `color: ${color}` : ''}"
          role="tab"
          tabindex="0"
          onclick={() => !item.disabled && handleClick(i, item.name)}
        >
          <span class="smu-tab__text">{item.title}</span>
          {#if item.dot}<div class="smu-tab__dot"></div>{/if}
          {#if item.badge}<div class="smu-tab__badge">{item.badge}</div>{/if}
        </div>
      {/each}
      {#if type === 'line'}
        <div class="smu-tabs__line" style="width: {typeof lineWidth === 'number' ? lineWidth + 'px' : lineWidth}; height: {typeof lineHeight === 'number' ? lineHeight + 'px' : lineHeight}; {color ? `background: ${color}` : ''}; transform: translateX({(typeof active === 'number' ? active : 0) * 100}%)"></div>
      {/if}
    </div>
  </div>
  {#if children}
    <div class="smu-tabs__content">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-tabs {
    position: relative;

    &__wrap {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar { display: none; }
    }

    &__nav {
      position: relative;
      display: flex;
      user-select: none;

      &--line {
        box-sizing: content-box;
        height: 100%;
        padding-bottom: 15px;
      }

      &--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0 var(--smu-padding-md);
        border: 1px solid var(--smu-primary-color);
        border-radius: var(--smu-radius-sm);
      }
    }

    &__line {
      position: absolute;
      bottom: 15px;
      left: 0;
      z-index: 1;
      height: 3px;
      background: var(--smu-primary-color);
      border-radius: var(--smu-radius-max);
      transition: transform var(--smu-duration-base);
    }

    &__content {
      margin: var(--smu-padding-md) 0;
    }
  }

  .smu-tab {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 var(--smu-padding-base);
    color: var(--smu-text-color);
    font-size: var(--smu-font-size-md);
    line-height: 44px;
    cursor: pointer;

    &--active { color: var(--smu-text-color); font-weight: var(--smu-font-bold); }
    &--disabled { color: var(--smu-gray-5); cursor: not-allowed; }
    &--shrink { flex: none; padding: 0 var(--smu-padding-xs); }

    &__dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background: var(--smu-danger-color);
      border-radius: 50%;
    }

    &__badge {
      position: absolute;
      top: 2px;
      right: -4px;
      min-width: 16px;
      padding: 0 3px;
      color: var(--smu-white);
      font-size: var(--smu-font-size-xs);
      line-height: 14px;
      text-align: center;
      background: var(--smu-danger-color);
      border-radius: var(--smu-radius-max);
    }
  }
</style>
