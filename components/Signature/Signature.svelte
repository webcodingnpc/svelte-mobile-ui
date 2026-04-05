<script lang="ts">
    import { onMount } from "svelte";

    let {
        type = "",
        penColor = "#000",
        lineWidth = 3,
        backgroundColor = "",
        clearButtonText = "清空",
        confirmButtonText = "确认",
        onclear,
        onconfirm,
        onstart,
        onsigning,
        onend,
        class: className = "",
    }: {
        type?: string;
        penColor?: string;
        lineWidth?: number;
        backgroundColor?: string;
        clearButtonText?: string;
        confirmButtonText?: string;
        onclear?: () => void;
        onconfirm?: (data: {
            image: string;
            canvas: HTMLCanvasElement;
        }) => void;
        onstart?: () => void;
        onsigning?: () => void;
        onend?: () => void;
        class?: string;
    } = $props();

    let canvasEl: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;
    let isDrawing = false;
    let isEmpty = $state(true);

    onMount(() => {
        ctx = canvasEl.getContext("2d");
        resizeCanvas();
    });

    function resizeCanvas() {
        if (!canvasEl) return;
        const rect = canvasEl.parentElement!.getBoundingClientRect();
        canvasEl.width = rect.width;
        canvasEl.height = rect.height;
        if (ctx && backgroundColor) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        }
    }

    function getPoint(e: TouchEvent | MouseEvent) {
        const rect = canvasEl.getBoundingClientRect();
        if ("touches" in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        }
        return {
            x: (e as MouseEvent).clientX - rect.left,
            y: (e as MouseEvent).clientY - rect.top,
        };
    }

    function handleStart(e: TouchEvent | MouseEvent) {
        if (!ctx) return;
        isDrawing = true;
        isEmpty = false;
        const point = getPoint(e);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        onstart?.();
    }

    function handleMove(e: TouchEvent | MouseEvent) {
        if (!isDrawing || !ctx) return;
        e.preventDefault();
        const point = getPoint(e);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        onsigning?.();
    }

    function handleEnd() {
        isDrawing = false;
        onend?.();
    }

    function handleClear() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        if (backgroundColor) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        }
        isEmpty = true;
        onclear?.();
    }

    function handleConfirm() {
        if (!canvasEl) return;
        const image = canvasEl.toDataURL(`image/${type || "png"}`);
        onconfirm?.({ image, canvas: canvasEl });
    }

    export function resize() {
        resizeCanvas();
    }

    export function clear() {
        handleClear();
    }
</script>

<div class="smu-signature {className}">
    <div class="smu-signature__content">
        <canvas
            bind:this={canvasEl}
            ontouchstart={handleStart}
            ontouchmove={handleMove}
            ontouchend={handleEnd}
            onmousedown={handleStart}
            onmousemove={handleMove}
            onmouseup={handleEnd}
            onmouseleave={handleEnd}
        ></canvas>
    </div>
    <div class="smu-signature__footer">
        <button
            class="smu-signature__btn smu-signature__btn--clear"
            onclick={handleClear}
        >
            {clearButtonText}
        </button>
        <button
            class="smu-signature__btn smu-signature__btn--confirm"
            onclick={handleConfirm}
        >
            {confirmButtonText}
        </button>
    </div>
</div>

<style lang="scss">
    .smu-signature {
        padding: var(--smu-padding-xs);

        &__content {
            height: 200px;
            border: 1px solid var(--smu-border-color);
            border-radius: var(--smu-radius-lg);
            overflow: hidden;

            canvas {
                display: block;
                width: 100%;
                height: 100%;
                cursor: crosshair;
                touch-action: none;
            }
        }

        &__footer {
            display: flex;
            justify-content: flex-end;
            padding: var(--smu-padding-xs) 0;
            gap: 8px;
        }

        &__btn {
            padding: 6px 16px;
            font-size: var(--smu-font-size-md);
            border-radius: var(--smu-radius-sm);
            cursor: pointer;

            &--clear {
                color: var(--smu-text-color);
                background: var(--smu-background);
                border: 1px solid var(--smu-border-color);
            }

            &--confirm {
                color: var(--smu-white);
                background: var(--smu-primary-color);
                border: none;
            }
        }
    }
</style>
