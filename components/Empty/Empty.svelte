<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    image = 'default',
    imageSize = '',
    description = '',
    children,
    class: className = '',
  }: {
    image?: 'default' | 'error' | 'network' | 'search' | string
    imageSize?: string | number
    description?: string
    children?: Snippet
    class?: string
  } = $props()

  const imgStyle = $derived(imageSize ? `width: ${typeof imageSize === 'number' ? imageSize + 'px' : imageSize}; height: ${typeof imageSize === 'number' ? imageSize + 'px' : imageSize}` : '')
</script>

<div class="smu-empty {className}">
  <div class="smu-empty__image" style={imgStyle}>
    {#if image === 'default'}
      <svg viewBox="0 0 160 160"><path d="M80 20C44.6 20 16 48.6 16 84c0 28.4 18.5 52.5 44.1 60.8v7c0 4 3.6 8.2 8.2 8.2h23.4c4.6 0 8.2-3.6 8.2-8.2v-7C125.5 136.5 144 112.4 144 84c0-35.4-28.6-64-64-64z" fill="var(--smu-gray-3)"/><circle cx="60" cy="76" r="8" fill="var(--smu-gray-6)"/><circle cx="100" cy="76" r="8" fill="var(--smu-gray-6)"/><path d="M60 104c0 0 10 12 20 12s20-12 20-12" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/></svg>
    {:else if image === 'error'}
      <svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="var(--smu-gray-3)"/><path d="M60 60l40 40M100 60l-40 40" stroke="var(--smu-gray-6)" stroke-width="4"/></svg>
    {:else if image === 'network'}
      <svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="var(--smu-gray-3)"/><path d="M50 90c8-16 22-24 30-24s22 8 30 24" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/><path d="M40 70c12-24 30-36 40-36s28 12 40 36" fill="none" stroke="var(--smu-gray-6)" stroke-width="3"/></svg>
    {:else if image === 'search'}
      <svg viewBox="0 0 160 160"><circle cx="68" cy="68" r="40" fill="none" stroke="var(--smu-gray-3)" stroke-width="8"/><path d="M98 98l30 30" stroke="var(--smu-gray-3)" stroke-width="8"/></svg>
    {:else}
      <img src={image} alt="empty" />
    {/if}
  </div>
  {#if description}
    <p class="smu-empty__description">{description}</p>
  {/if}
  {#if children}
    <div class="smu-empty__bottom">{@render children()}</div>
  {/if}
</div>

<style lang="scss">
  .smu-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 0;

    &__image {
      width: 160px;
      height: 160px;

      img, svg {
        width: 100%;
        height: 100%;
      }
    }

    &__description {
      margin-top: var(--smu-padding-md);
      padding: 0 60px;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      line-height: var(--smu-line-height-md);
    }

    &__bottom {
      margin-top: 24px;
    }
  }
</style>
