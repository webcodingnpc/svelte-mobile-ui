<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    dashed = false,
    hairline = true,
    contentPosition = 'center',
    children,
    class: className = '',
  }: {
    dashed?: boolean
    hairline?: boolean
    contentPosition?: 'left' | 'center' | 'right'
    children?: Snippet
    class?: string
  } = $props()
</script>

<div class="smu-divider {dashed ? 'smu-divider--dashed' : ''} {hairline ? 'smu-divider--hairline' : ''} smu-divider--content-{contentPosition} {className}" role="separator">
  {#if children}<span class="smu-divider__content">{@render children()}</span>{/if}
</div>

<style lang="scss">
  .smu-divider {
    display: flex;
    align-items: center;
    margin: var(--smu-padding-md) 0;
    color: var(--smu-text-color-2);
    font-size: var(--smu-font-size-md);
    line-height: var(--smu-line-height-md);
    border: 0;
    border-top: 1px solid var(--smu-border-color);

    &--hairline { border-top-width: 0.5px; }
    &--dashed { border-style: dashed; }

    &--content-left,
    &--content-center,
    &--content-right {
      border-top: 0;

      &::before,
      &::after {
        display: block;
        border-top: 1px solid var(--smu-border-color);
        content: '';
        flex: 1;
      }
    }

    &--content-center::before,
    &--content-center::after { flex: 1; }
    &--content-left::before { max-width: 10%; }
    &--content-right::after { max-width: 10%; }

    &__content {
      margin: 0 var(--smu-padding-md);
      white-space: nowrap;
    }
  }
</style>
