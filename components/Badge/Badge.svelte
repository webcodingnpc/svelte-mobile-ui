<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    content = '',
    color = '',
    dot = false,
    max = 0,
    showZero = true,
    offset,
    children,
    class: className = '',
  }: {
    content?: string | number
    color?: string
    dot?: boolean
    max?: number
    showZero?: boolean
    offset?: [number, number]
    children?: Snippet
    class?: string
  } = $props()

  const displayContent = $derived(() => {
    if (dot) return ''
    if (typeof content === 'number' && max > 0 && content > max) return max + '+'
    if (content === 0 && !showZero) return ''
    return String(content ?? '')
  })

  const badgeStyle = $derived([
    color ? `background: ${color}` : '',
    offset ? `transform: translate(${offset[0]}px, ${offset[1]}px)` : '',
  ].filter(Boolean).join('; '))
</script>

<div class="smu-badge__wrapper {className}">
  {#if children}{@render children()}{/if}
  {#if dot || displayContent()}
    <div class="smu-badge {dot ? 'smu-badge--dot' : ''} {!children ? 'smu-badge--fixed' : ''}" style={badgeStyle}>
      {#if !dot}{displayContent()}{/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    color: var(--smu-white);
    font-size: var(--smu-font-size-xs);
    font-weight: var(--smu-font-bold);
    line-height: 14px;
    text-align: center;
    background: var(--smu-danger-color);
    border: 1px solid var(--smu-white);
    border-radius: var(--smu-radius-max);

    &__wrapper {
      position: relative;
      display: inline-block;
    }

    &--dot {
      width: 8px;
      min-width: 0;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }

    &--fixed:not(.smu-badge--dot) {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    &--dot.smu-badge--fixed {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
</style>
