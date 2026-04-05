<script lang="ts">
  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    readonly = false,
    barHeight = '2px',
    buttonSize = '24px',
    activeColor = '',
    inactiveColor = '',
    vertical = false,
    onChange,
    class: className = '',
  }: {
    value?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    readonly?: boolean
    barHeight?: string
    buttonSize?: string
    activeColor?: string
    inactiveColor?: string
    vertical?: boolean
    onChange?: (value: number) => void
    class?: string
  } = $props()

  let root: HTMLDivElement
  const progress = $derived(((value - min) / (max - min)) * 100)

  function onClick(e: MouseEvent) {
    if (disabled || readonly) return
    const rect = root.getBoundingClientRect()
    let ratio: number
    if (vertical) {
      ratio = 1 - (e.clientY - rect.top) / rect.height
    } else {
      ratio = (e.clientX - rect.left) / rect.width
    }
    const val = min + ratio * (max - min)
    value = Math.round(val / step) * step
    value = Math.max(min, Math.min(max, value))
    onChange?.(value)
  }
</script>

<div
  bind:this={root}
  class="smu-slider {vertical ? 'smu-slider--vertical' : ''} {disabled ? 'smu-slider--disabled' : ''} {className}"
  style="{vertical ? 'width' : 'height'}: {barHeight}; {inactiveColor ? `background: ${inactiveColor}` : ''}"
  onclick={onClick}
  role="slider"
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
>
  <div class="smu-slider__bar" style="{vertical ? 'height' : 'width'}: {progress}%; {activeColor ? `background: ${activeColor}` : ''}">
    <div class="smu-slider__button-wrapper">
      <div class="smu-slider__button" style="width: {buttonSize}; height: {buttonSize}"></div>
    </div>
  </div>
</div>

<style lang="scss">
  .smu-slider {
    position: relative;
    width: 100%;
    height: 2px;
    background: var(--smu-active-color);
    border-radius: var(--smu-radius-max);
    cursor: pointer;

    &--vertical {
      display: inline-block;
      width: 2px;
      height: 100%;

      .smu-slider__bar { width: 100%; }
      .smu-slider__button-wrapper { top: auto; right: 50%; bottom: 0; transform: translate(50%, 50%); }
    }

    &--disabled { cursor: not-allowed; opacity: var(--smu-disabled-opacity); }

    &__bar {
      position: relative;
      height: 100%;
      background: var(--smu-primary-color);
      border-radius: inherit;
      transition: width var(--smu-duration-fast), height var(--smu-duration-fast);
    }

    &__button-wrapper {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      cursor: grab;
    }

    &__button {
      width: 24px;
      height: 24px;
      background: var(--smu-white);
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
</style>
