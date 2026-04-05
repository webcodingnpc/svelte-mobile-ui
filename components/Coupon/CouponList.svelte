<script lang="ts">
    import type { Snippet } from "svelte";
    import CouponCell from "./CouponCell.svelte";

    let {
        code = $bindable(""),
        coupons = [],
        disabledCoupons = [],
        chosenCoupon = $bindable(-1),
        enabledTitle = "可用优惠券",
        disabledTitle = "不可用优惠券",
        exchangeButtonText = "兑换",
        exchangeButtonLoading = false,
        exchangeButtonDisabled = false,
        showExchangeBar = true,
        showCloseButton = true,
        closeButtonText = "不使用优惠",
        inputPlaceholder = "请输入优惠码",
        showCount = true,
        currency = "¥",
        emptyImage = "",
        onchange,
        onexchange,
        children,
        class: className = "",
    }: {
        code?: string;
        coupons?: any[];
        disabledCoupons?: any[];
        chosenCoupon?: number;
        enabledTitle?: string;
        disabledTitle?: string;
        exchangeButtonText?: string;
        exchangeButtonLoading?: boolean;
        exchangeButtonDisabled?: boolean;
        showExchangeBar?: boolean;
        showCloseButton?: boolean;
        closeButtonText?: string;
        inputPlaceholder?: string;
        showCount?: boolean;
        currency?: string;
        emptyImage?: string;
        onchange?: (index: number) => void;
        onexchange?: (code: string) => void;
        children?: Snippet;
        class?: string;
    } = $props();

    let activeTab = $state(0);

    function handleSelect(index: number) {
        chosenCoupon = index;
        onchange?.(index);
    }

    function handleExchange() {
        if (!code || exchangeButtonDisabled || exchangeButtonLoading) return;
        onexchange?.(code);
    }
</script>

<div class="smu-coupon-list {className}">
    {#if showExchangeBar}
        <div class="smu-coupon-list__exchange">
            <input
                class="smu-coupon-list__input"
                type="text"
                placeholder={inputPlaceholder}
                bind:value={code}
            />
            <button
                class="smu-coupon-list__exchange-btn"
                disabled={exchangeButtonDisabled ||
                    exchangeButtonLoading ||
                    !code}
                onclick={handleExchange}
            >
                {exchangeButtonText}
            </button>
        </div>
    {/if}

    <div class="smu-coupon-list__tabs">
        <div
            class="smu-coupon-list__tab {activeTab === 0
                ? 'smu-coupon-list__tab--active'
                : ''}"
            onclick={() => (activeTab = 0)}
        >
            {enabledTitle}{#if showCount}
                ({coupons.length}){/if}
        </div>
        <div
            class="smu-coupon-list__tab {activeTab === 1
                ? 'smu-coupon-list__tab--active'
                : ''}"
            onclick={() => (activeTab = 1)}
        >
            {disabledTitle}{#if showCount}
                ({disabledCoupons.length}){/if}
        </div>
    </div>

    <div class="smu-coupon-list__content">
        {#if activeTab === 0}
            {#if coupons.length > 0}
                {#each coupons as coupon, i}
                    <CouponCell
                        {...coupon}
                        {currency}
                        chosen={chosenCoupon === i}
                        onclick={() => handleSelect(i)}
                    />
                {/each}
            {:else}
                <div class="smu-coupon-list__empty">暂无可用优惠券</div>
            {/if}
        {:else if disabledCoupons.length > 0}
            {#each disabledCoupons as coupon}
                <CouponCell {...coupon} {currency} disabled />
            {/each}
        {:else}
            <div class="smu-coupon-list__empty">暂无不可用优惠券</div>
        {/if}
    </div>

    {#if showCloseButton}
        <div class="smu-coupon-list__close" onclick={() => onchange?.(-1)}>
            {closeButtonText}
        </div>
    {/if}
</div>

<style lang="scss">
    .smu-coupon-list {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--smu-background);

        &__exchange {
            display: flex;
            align-items: center;
            padding: 8px var(--smu-padding-md);
            background: var(--smu-background-2);
        }

        &__input {
            flex: 1;
            height: 32px;
            padding: 0 8px;
            border: 1px solid var(--smu-border-color);
            border-radius: var(--smu-radius-sm);
            font-size: var(--smu-font-size-md);
            outline: none;
        }

        &__exchange-btn {
            margin-left: 8px;
            padding: 0 16px;
            height: 32px;
            color: var(--smu-white);
            background: var(--smu-primary-color);
            border: none;
            border-radius: var(--smu-radius-sm);
            font-size: var(--smu-font-size-sm);
            cursor: pointer;

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }

        &__tabs {
            display: flex;
            background: var(--smu-background-2);
        }

        &__tab {
            flex: 1;
            padding: 12px 0;
            text-align: center;
            font-size: var(--smu-font-size-md);
            color: var(--smu-gray-6);
            cursor: pointer;

            &--active {
                color: var(--smu-text-color);
                font-weight: var(--smu-font-bold);
                border-bottom: 2px solid var(--smu-primary-color);
            }
        }

        &__content {
            flex: 1;
            overflow-y: auto;
            padding: var(--smu-padding-sm) 0;
            background: var(--smu-background-2);
        }

        &__empty {
            padding: 60px 0;
            text-align: center;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-md);
        }

        &__close {
            padding: 12px 0;
            text-align: center;
            color: var(--smu-text-color);
            font-size: var(--smu-font-size-md);
            font-weight: var(--smu-font-bold);
            background: var(--smu-background-2);
            cursor: pointer;
            border-top: 1px solid var(--smu-border-color);

            &:active {
                background: var(--smu-active-color);
            }
        }
    }
</style>
