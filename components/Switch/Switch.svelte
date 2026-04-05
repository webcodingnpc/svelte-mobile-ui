<script lang="ts">
  import Loading from '../Loading/Loading.svelte'

  let {
    checked = $bindable(false),
    loading = false,
    disabled = false,
    size = '26px',
    activeColor = '',
    inactiveColor = '',
    activeValue = true,
    inactiveValue = false,
    onChange,
    class: className = '',
  }: {
    checked?: boolean | any
    loading?: boolean
    disabled?: boolean
    size?: string | number
    activeColor?: string
    inactiveColor?: string
    activeValue?: any
    inactiveValue?: any
    onChange?: (val: any) => void
    class?: string
  } = $props()

  const isChecked = $derived(checked === activeValue)
  const sizeStr = $derived(typeof size === 'number' ? size + 'px' : size)

  function toggle() {
    if (disabled || loading) return
    const newVal = isChecked ? inactiveValue : activeValue
    checked = newVal
    onChange?.(newVal)
  }
</script>

<div
  class="smu-switch {isChecked ? 'smu-switch--on' : ''} {disabled ? 'smu-switch--disabled' : ''} {loading ? 'smu-switch--loading' : ''} {className}"
  style="font-size: {sizeStr}; {isChecked && activeColor ? `background: ${activeColor}` : ''} {!isChecked && inactiveColor ? `background: ${inactiveColor}` : ''}"
  role="switch"
  aria-checked={isChecked}
  tabindex="0"
  onclick={toggle}
>
  <div class="smu-switch__node">
    {#if loading}
      <Loading size="65%" class="smu-switch__loading" color={isChecked ? (activeColor || 'var(--smu-primary-color)') : (inactiveColor || 'var(--smu-gray-5)')} />
    {/if}
  </div>
</div>

<style lang="scss">
  .smu-switch {
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    width: 2em;
    height: 1em;
    background: rgba(120, 120, 128, 0.16);
    border-radius: 1em;
    cursor: pointer;
    transition: background var(--smu-duration-base);

    &--on {
      background: var(--smu-primary-color);

      .smu-switch__node {
        transform: translateX(1em);
        background: var(--smu-white);
      }
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--smu-disabled-opacity);
    }

    &__node {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      background: var(--smu-white);
      border-radius: 50%;
      box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
      transition: transform var(--smu-duration-base) cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }

    &__loading { display: flex; }
  }
</style>
