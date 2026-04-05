<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    active = $bindable(0),
    fixed = true,
    border = true,
    zIndex = 1,
    activeColor = '',
    inactiveColor = '',
    placeholder = false,
    safeAreaInsetBottom = true,
    onChange,
    children,
    class: className = '',
  }: {
    active?: number | string
    fixed?: boolean
    border?: boolean
    zIndex?: number
    activeColor?: string
    inactiveColor?: string
    placeholder?: boolean
    safeAreaInsetBottom?: boolean
    onChange?: (active: number | string) => void
    children?: Snippet
    class?: string
  } = $props()
</script>

{#if fixed && placeholder}
  <div class="smu-tabbar__placeholder" style="height: 50px"></div>
{/if}
<div
  class="smu-tabbar {fixed ? 'smu-tabbar--fixed' : ''} {border ? 'smu-hairline--top' : ''} {safeAreaInsetBottom ? 'smu-safe-area-bottom' : ''} {className}"
  style="z-index: {zIndex}"
>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-tabbar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: content-box;
    height: 50px;
    background: var(--smu-background-2);

    &--fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }

    &__placeholder {
      box-sizing: content-box;
    }
  }
</style>
