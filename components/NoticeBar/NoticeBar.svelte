<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import type { Snippet } from 'svelte'

  let {
    text = '',
    mode = '',
    color = '',
    background = '',
    leftIcon = '',
    wrapable = false,
    scrollable = true,
    delay = 1,
    speed = 60,
    children,
    onclick,
    onclose,
    class: className = '',
  }: {
    text?: string
    mode?: '' | 'closeable' | 'link'
    color?: string
    background?: string
    leftIcon?: string
    wrapable?: boolean
    scrollable?: boolean
    delay?: number
    speed?: number
    children?: Snippet
    onclick?: (e: MouseEvent) => void
    onclose?: () => void
    class?: string
  } = $props()

  let show = $state(true)

  function handleClose(e: MouseEvent) {
    e.stopPropagation()
    show = false
    onclose?.()
  }
</script>

{#if show}
  <div
    class="smu-notice-bar {wrapable ? 'smu-notice-bar--wrapable' : ''} {className}"
    style="{color ? `color: ${color}` : ''}; {background ? `background: ${background}` : ''}"
    onclick={onclick}
    role={mode === 'link' ? 'link' : undefined}
  >
    {#if leftIcon}
      <Icon name={leftIcon} class="smu-notice-bar__left-icon" />
    {/if}
    <div class="smu-notice-bar__wrap">
      <div class="smu-notice-bar__content {scrollable && !wrapable ? 'smu-notice-bar__content--scrollable' : ''}" style={scrollable && !wrapable ? `animation-delay: ${delay}s; animation-duration: ${text.length / speed * 10}s` : ''}>
        {#if children}{@render children()}{:else}{text}{/if}
      </div>
    </div>
    {#if mode === 'closeable'}
      <Icon name="cross" class="smu-notice-bar__right-icon" onclick={handleClose} />
    {:else if mode === 'link'}
      <Icon name="arrow" class="smu-notice-bar__right-icon" />
    {/if}
  </div>
{/if}

<style lang="scss">
  .smu-notice-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 var(--smu-padding-md);
    color: #ed6a0c;
    font-size: var(--smu-font-size-md);
    line-height: 24px;
    background: #fffbe8;

    &--wrapable {
      height: auto;
      padding: var(--smu-padding-xs) var(--smu-padding-md);

      .smu-notice-bar__wrap { height: auto; }
      .smu-notice-bar__content { position: relative; white-space: normal; word-wrap: break-word; }
    }

    &__left-icon {
      min-width: 24px;
      font-size: 16px;
      margin-right: 4px;
    }

    &__right-icon {
      min-width: 24px;
      font-size: 16px;
      margin-left: 4px;
      cursor: pointer;
    }

    &__wrap {
      position: relative;
      flex: 1;
      overflow: hidden;
    }

    &__content {
      position: absolute;
      white-space: nowrap;

      &--scrollable {
        animation: smu-notice-scroll linear infinite;
      }
    }
  }

  @keyframes smu-notice-scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
</style>
