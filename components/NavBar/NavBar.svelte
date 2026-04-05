<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    title = '',
    leftText = '',
    rightText = '',
    leftArrow = false,
    border = true,
    fixed = false,
    placeholder = false,
    safeAreaInsetTop = false,
    zIndex = 1,
    onclickLeft,
    onclickRight,
    leftSlot,
    rightSlot,
    titleSlot,
    class: className = '',
  }: {
    title?: string
    leftText?: string
    rightText?: string
    leftArrow?: boolean
    border?: boolean
    fixed?: boolean
    placeholder?: boolean
    safeAreaInsetTop?: boolean
    zIndex?: number
    onclickLeft?: () => void
    onclickRight?: () => void
    leftSlot?: Snippet
    rightSlot?: Snippet
    titleSlot?: Snippet
    class?: string
  } = $props()
</script>

{#if fixed && placeholder}
  <div class="smu-nav-bar__placeholder" style="height: 46px"></div>
{/if}
<div
  class="smu-nav-bar {border ? 'smu-hairline--bottom' : ''} {fixed ? 'smu-nav-bar--fixed' : ''} {safeAreaInsetTop ? 'smu-safe-area-top' : ''} {className}"
  style="z-index: {zIndex}"
>
  <div class="smu-nav-bar__left" onclick={onclickLeft} role="button" tabindex="0">
    {#if leftSlot}
      {@render leftSlot()}
    {:else}
      {#if leftArrow}<Icon name="arrow-left" class="smu-nav-bar__arrow" />{/if}
      {#if leftText}<span class="smu-nav-bar__text">{leftText}</span>{/if}
    {/if}
  </div>
  <div class="smu-nav-bar__title smu-ellipsis">
    {#if titleSlot}{@render titleSlot()}{:else}{title}{/if}
  </div>
  <div class="smu-nav-bar__right" onclick={onclickRight} role="button" tabindex="0">
    {#if rightSlot}
      {@render rightSlot()}
    {:else}
      {#if rightText}<span class="smu-nav-bar__text">{rightText}</span>{/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .smu-nav-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 46px;
    padding: 0 var(--smu-padding-md);
    background: var(--smu-background-2);
    user-select: none;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }

    &__title {
      max-width: 60%;
      margin: 0 auto;
      color: var(--smu-text-color);
      font-weight: var(--smu-font-bold);
      font-size: var(--smu-font-size-lg);
      text-align: center;
    }

    &__left,
    &__right {
      position: absolute;
      display: flex;
      align-items: center;
      padding: 0 var(--smu-padding-md);
      font-size: var(--smu-font-size-md);
      cursor: pointer;
    }

    &__left { left: 0; }
    &__right { right: 0; }

    &__text { color: var(--smu-primary-color); }
    &__arrow { font-size: 16px; color: var(--smu-primary-color); }
  }
</style>
