<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        contactInfo = {},
        isEditing = false,
        isSaving = false,
        showSetDefault = true,
        setDefaultLabel = "设为默认联系人",
        telValidator,
        onSave,
        onDelete,
        class: className = "",
    }: {
        contactInfo?: { name?: string; tel?: string; isDefault?: boolean };
        isEditing?: boolean;
        isSaving?: boolean;
        showSetDefault?: boolean;
        setDefaultLabel?: string;
        telValidator?: (tel: string) => boolean;
        onSave?: (info: any) => void;
        onDelete?: (info: any) => void;
        class?: string;
    } = $props();

    let name = $state(contactInfo.name || "");
    let tel = $state(contactInfo.tel || "");
    let isDefault = $state(contactInfo.isDefault || false);
    let telError = $state("");

    function handleSave() {
        if (!name.trim()) return;
        if (telValidator && !telValidator(tel)) {
            telError = "请填写正确的电话号码";
            return;
        }
        telError = "";
        onSave?.({ name, tel, isDefault });
    }

    function handleDelete() {
        onDelete?.({ name, tel, isDefault });
    }
</script>

<div class="smu-contact-edit {className}">
    <div class="smu-contact-edit__fields">
        <div class="smu-contact-edit__field">
            <label class="smu-contact-edit__label">姓名</label>
            <input
                class="smu-contact-edit__input"
                type="text"
                placeholder="请输入姓名"
                bind:value={name}
            />
        </div>
        <div class="smu-contact-edit__field">
            <label class="smu-contact-edit__label">电话</label>
            <input
                class="smu-contact-edit__input"
                type="tel"
                placeholder="请输入电话"
                bind:value={tel}
            />
            {#if telError}<div class="smu-contact-edit__error">
                    {telError}
                </div>{/if}
        </div>
        {#if showSetDefault}
            <div class="smu-contact-edit__switch">
                <span>{setDefaultLabel}</span>
                <label class="smu-contact-edit__toggle">
                    <input type="checkbox" bind:checked={isDefault} />
                    <span class="smu-contact-edit__toggle-track"></span>
                </label>
            </div>
        {/if}
    </div>
    <div class="smu-contact-edit__buttons">
        <button
            class="smu-contact-edit__btn smu-contact-edit__btn--save"
            disabled={isSaving}
            onclick={handleSave}
        >
            {isSaving ? "保存中..." : "保存"}
        </button>
        {#if isEditing}
            <button
                class="smu-contact-edit__btn smu-contact-edit__btn--delete"
                onclick={handleDelete}
            >
                删除
            </button>
        {/if}
    </div>
</div>

<style lang="scss">
    .smu-contact-edit {
        padding: var(--smu-padding-md);

        &__field {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid var(--smu-border-color);
        }

        &__label {
            min-width: 60px;
            color: var(--smu-text-color);
            font-size: var(--smu-font-size-md);
        }

        &__input {
            flex: 1;
            border: none;
            outline: none;
            font-size: var(--smu-font-size-md);
            padding: 4px 0;
        }

        &__error {
            color: var(--smu-danger-color);
            font-size: var(--smu-font-size-sm);
            margin-top: 4px;
        }

        &__switch {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            font-size: var(--smu-font-size-md);
        }

        &__toggle {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;

            input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            &-track {
                position: absolute;
                inset: 0;
                background: var(--smu-gray-4);
                border-radius: 12px;
                cursor: pointer;
                transition: background 0.3s;

                &::before {
                    content: "";
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    left: 2px;
                    bottom: 2px;
                    background: var(--smu-white);
                    border-radius: 50%;
                    transition: transform 0.3s;
                }
            }

            input:checked + &-track {
                background: var(--smu-primary-color);
                &::before {
                    transform: translateX(20px);
                }
            }
        }

        &__buttons {
            margin-top: var(--smu-padding-md);
        }

        &__btn {
            display: block;
            width: 100%;
            height: 44px;
            border: none;
            border-radius: var(--smu-radius-max);
            font-size: var(--smu-font-size-lg);
            cursor: pointer;

            &--save {
                color: var(--smu-white);
                background: var(--smu-primary-color);
                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }

            &--delete {
                margin-top: 8px;
                color: var(--smu-text-color);
                background: var(--smu-background);
            }
        }
    }
</style>
