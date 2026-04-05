<script lang="ts">
    let {
        title = "",
        condition = "",
        description = "",
        startAt = 0,
        endAt = 0,
        valueDesc = 0,
        unitDesc = "",
        reason = "",
        value = 0,
        currency = "¥",
        disabled = false,
        chosen = false,
        onclick,
        class: className = "",
    }: {
        title?: string;
        condition?: string;
        description?: string;
        startAt?: number;
        endAt?: number;
        valueDesc?: number | string;
        unitDesc?: string;
        reason?: string;
        value?: number;
        currency?: string;
        disabled?: boolean;
        chosen?: boolean;
        onclick?: () => void;
        class?: string;
    } = $props();

    function formatDate(ts: number): string {
        if (!ts) return "";
        const d = new Date(ts * 1000);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    }
</script>

<div
    class="smu-coupon-cell {chosen ? 'smu-coupon-cell--chosen' : ''} {disabled
        ? 'smu-coupon-cell--disabled'
        : ''} {className}"
    onclick={() => !disabled && onclick?.()}
>
    <div class="smu-coupon-cell__value">
        <span class="smu-coupon-cell__currency">{currency}</span>
        <span class="smu-coupon-cell__amount">{valueDesc || value}</span>
        {#if unitDesc}<span class="smu-coupon-cell__unit">{unitDesc}</span>{/if}
    </div>
    <div class="smu-coupon-cell__info">
        <div class="smu-coupon-cell__name">{title}</div>
        {#if condition}<div class="smu-coupon-cell__condition">
                {condition}
            </div>{/if}
        {#if startAt || endAt}
            <div class="smu-coupon-cell__date">
                {formatDate(startAt)} - {formatDate(endAt)}
            </div>
        {/if}
        {#if description}<div class="smu-coupon-cell__desc">
                {description}
            </div>{/if}
    </div>
</div>

<style lang="scss">
    .smu-coupon-cell {
        display: flex;
        align-items: center;
        padding: 14px 0;
        margin: 0 var(--smu-padding-md);
        cursor: pointer;
        border-bottom: 1px solid var(--smu-border-color);

        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &--chosen {
            .smu-coupon-cell__value {
                color: var(--smu-danger-color);
            }
        }

        &__value {
            min-width: 80px;
            text-align: center;
            color: var(--smu-danger-color);
        }

        &__currency {
            font-size: var(--smu-font-size-sm);
            vertical-align: middle;
        }

        &__amount {
            font-size: 24px;
            font-weight: var(--smu-font-bold);
            vertical-align: middle;
        }

        &__unit {
            font-size: var(--smu-font-size-xs);
            vertical-align: middle;
        }

        &__info {
            flex: 1;
            padding-left: 12px;
        }

        &__name {
            font-size: var(--smu-font-size-md);
            font-weight: var(--smu-font-bold);
            line-height: 20px;
        }

        &__condition,
        &__date,
        &__desc {
            margin-top: 4px;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-sm);
            line-height: 18px;
        }
    }
</style>
