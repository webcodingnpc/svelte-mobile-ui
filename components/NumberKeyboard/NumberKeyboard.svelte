<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    children,
    class: className = '',
    ...restProps
  }: {
    children?: Snippet
    class?: string
    [key: string]: any
  } = $props()
</script>

<div class="smu-numberkeyboard {className}">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .smu-numberkeyboard {
    position: relative;
  }
</style>