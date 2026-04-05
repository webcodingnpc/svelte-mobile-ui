<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        list = [],
        addText = "新建联系人",
        defaultTagText = "默认",
        onAdd,
        onEdit,
        onSelect,
        class: className = "",
    }: {
        list?: Array<{
            id?: string | number;
            name: string;
            tel: string;
            isDefault?: boolean;
        }>;
        addText?: string;
        defaultTagText?: string;
        onAdd?: () => void;
        onEdit?: (item: any, index: number) => void;
        onSelect?: (item: any, index: number) => void;
        class?: string;
    } = $props();
</script>

<div class="smu-contact-list {className}">
    {#if list.length > 0}
        {#each list as item, i}
            <div
                class="smu-contact-list__item"
                onclick={() => onSelect?.(item, i)}
            >
                <div class="smu-contact-list__info">
                    <div class="smu-contact-list__name">
                        {item.name}
                        {#if item.isDefault}
                            <span class="smu-contact-list__tag"
                                >{defaultTagText}</span
                            >
                        {/if}
                    </div>
                    <div class="smu-contact-list__tel">{item.tel}</div>
                </div>
                <div
                    class="smu-contact-list__edit"
                    onclick={(e) => {
                        e.stopPropagation();
                        onEdit?.(item, i);
                    }}
                >
                    编辑
                </div>
            </div>
        {/each}
    {:else}
        <div class="smu-contact-list__empty">暂无联系人</div>
    {/if}

    <div class="smu-contact-list__add" onclick={() => onAdd?.()}>
        {addText}
    </div>
</div>

<style lang="scss">
    .smu-contact-list {
        &__item {
            display: flex;
            align-items: center;
            padding: 12px var(--smu-padding-md);
            background: var(--smu-background-2);
            cursor: pointer;

            &:not(:last-child) {
                border-bottom: 1px solid var(--smu-border-color);
            }

            &:active {
                background: var(--smu-active-color);
            }
        }

        &__info {
            flex: 1;
        }

        &__name {
            font-size: var(--smu-font-size-md);
            font-weight: var(--smu-font-bold);
            line-height: 24px;
        }

        &__tag {
            display: inline-block;
            margin-left: 8px;
            padding: 0 4px;
            color: var(--smu-primary-color);
            font-size: var(--smu-font-size-xs);
            line-height: 18px;
            border: 1px solid var(--smu-primary-color);
            border-radius: var(--smu-radius-sm);
            font-weight: normal;
        }

        &__tel {
            margin-top: 4px;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-sm);
        }

        &__edit {
            padding: 4px 12px;
            color: var(--smu-primary-color);
            font-size: var(--smu-font-size-sm);
            cursor: pointer;
        }

        &__empty {
            padding: 40px 0;
            text-align: center;
            color: var(--smu-gray-6);
            font-size: var(--smu-font-size-md);
        }

        &__add {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 12px 0;
            text-align: center;
            color: var(--smu-white);
            font-size: var(--smu-font-size-lg);
            background: var(--smu-primary-color);
            cursor: pointer;

            &:active {
                opacity: 0.8;
            }
        }
    }
</style>
