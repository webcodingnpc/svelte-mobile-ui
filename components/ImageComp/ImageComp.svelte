<script lang="ts">
  import Icon from '../Icon/Icon.svelte'
  import Loading from '../Loading/Loading.svelte'

  let {
    src = '',
    alt = '',
    fit = 'fill',
    width = '',
    height = '',
    radius = 0,
    round = false,
    lazyLoad = false,
    showError = true,
    showLoading = true,
    errorIcon = 'photo',
    loadingIcon = '',
    onclick,
    class: className = '',
  }: {
    src?: string
    alt?: string
    fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    width?: string | number
    height?: string | number
    radius?: string | number
    round?: boolean
    lazyLoad?: boolean
    showError?: boolean
    showLoading?: boolean
    errorIcon?: string
    loadingIcon?: string
    onclick?: (e: MouseEvent) => void
    class?: string
  } = $props()

  let loading = $state(true)
  let error = $state(false)

  const style = $derived([
    width ? `width: ${typeof width === 'number' ? width + 'px' : width}` : '',
    height ? `height: ${typeof height === 'number' ? height + 'px' : height}` : '',
    radius ? `border-radius: ${typeof radius === 'number' ? radius + 'px' : radius}; overflow: hidden` : '',
    round ? 'border-radius: 50%; overflow: hidden' : '',
  ].filter(Boolean).join('; '))

  function onLoad() { loading = false }
  function onError() { loading = false; error = true }
</script>

<div class="smu-image {className}" {style} onclick={onclick}>
  {#if !error}
    <img
      class="smu-image__img"
      {src} {alt}
      style="object-fit: {fit}"
      onload={onLoad}
      onerror={onError}
    />
  {/if}
  {#if loading && showLoading}
    <div class="smu-image__loading">
      {#if loadingIcon}
        <Icon name={loadingIcon} size="32" />
      {:else}
        <Loading type="spinner" size="22" />
      {/if}
    </div>
  {/if}
  {#if error && showError}
    <div class="smu-image__error">
      <Icon name={errorIcon} size="32" />
    </div>
  {/if}
</div>

<style lang="scss">
  .smu-image {
    position: relative;
    display: inline-block;
    overflow: hidden;

    &__img {
      display: block;
      width: 100%;
      height: 100%;
    }

    &__loading,
    &__error {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--smu-gray-6);
      font-size: var(--smu-font-size-md);
      background: var(--smu-background);
    }
  }
</style>
