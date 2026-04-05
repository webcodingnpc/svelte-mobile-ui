<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    value = $bindable(''),
    disabled = false,
    direction = 'vertical',
    iconSize = '20px',
    checkedColor = '',
    onChange,
    children,
    class: className = '',
  }: {
    value?: any
    disabled?: boolean
    direction?: 'horizontal' | 'vertical'
    iconSize?: string
    checkedColor?: string
    onChange?: (value: any) => void
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-radio-group smu-radio-group--{direction} {className}" role="radiogroup">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-radio-group {
    &--vertical > :global(*) { margin-bottom: 8px; }
    &--horizontal { display: flex; flex-wrap: wrap; gap: 8px 12px; }
  }
</style>
