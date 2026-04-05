<script lang="ts">
  let {
    percentage = 0,
    strokeWidth = 4,
    color = '',
    trackColor = '',
    pivotText = '',
    pivotColor = '',
    textColor = '',
    inactive = false,
    showPivot = true,
    class: className = '',
  }: {
    percentage?: number
    strokeWidth?: number | string
    color?: string
    trackColor?: string
    pivotText?: string
    pivotColor?: string
    textColor?: string
    inactive?: boolean
    showPivot?: boolean
    class?: string
  } = $props()

  const bg = $derived(inactive ? 'var(--smu-gray-5)' : (color || 'var(--smu-primary-color)'))
  const text = $derived(pivotText || `${percentage}%`)
</script>

<div class="smu-progress {className}">
  <span
    class="smu-progress__track"
    style="height: {typeof strokeWidth === 'number' ? strokeWidth + 'px' : strokeWidth}; {trackColor ? `background: ${trackColor}` : ''}"
  >
    <span
      class="smu-progress__portion"
      style="width: {percentage}%; background: {bg}"
    >
      {#if showPivot}
        <span
          class="smu-progress__pivot"
          style="color: {textColor || 'var(--smu-white)'}; background: {pivotColor || bg}"
        >{text}</span>
      {/if}
    </span>
  </span>
</div>

<style lang="scss">
  .smu-progress {
    position: relative;
    height: 4px;
    border-radius: var(--smu-radius-max);

    &__track {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      background: var(--smu-gray-3);
      border-radius: inherit;
    }

    &__portion {
      position: absolute;
      left: 0;
      height: 100%;
      background: var(--smu-primary-color);
      border-radius: inherit;
      transition: width var(--smu-duration-base);
    }

    &__pivot {
      position: absolute;
      top: 50%;
      right: 0;
      box-sizing: border-box;
      min-width: 3.6em;
      padding: 0 5px;
      font-size: var(--smu-font-size-xs);
      line-height: 1.6;
      text-align: center;
      word-break: keep-all;
      background: var(--smu-primary-color);
      border-radius: 1em;
      transform: translate(50%, -50%);
    }
  }
</style>
