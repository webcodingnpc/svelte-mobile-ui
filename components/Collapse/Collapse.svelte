<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    value = $bindable([]),
    accordion = false,
    border = true,
    children,
    class: className = '',
  }: {
    value?: (string | number)[]
    accordion?: boolean
    border?: boolean
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-collapse {border ? 'smu-hairline--top-bottom' : ''} {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-collapse { position: relative; background: var(--smu-background-2); }
</style>