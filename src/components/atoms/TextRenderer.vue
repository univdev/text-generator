<style lang="less" scoped>
  .text-renderer {
    width: 100%;
    border: 1px solid #EEE;
  }
</style>

<template>
  <canvas
    ref="canvas"
    width="640"
    height="320"
    class="text-renderer"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';

export type StylesType = {
  fontSize?: number,
  color?: string,
  italic?: boolean,
  bold?: boolean,
  underline?: boolean,
  backgroundColor?: string,
};

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    fontSize: {
      type: Number as PropType<number>,
      required: false,
      default: 14,
    },
    color: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    italic: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    underline: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    bold: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    backgroundColor: {
      type: String as PropType<string>,
      required: false,
      default: '#FFF',
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        ...props,
      };
    });
    const canvas: Ref<HTMLCanvasElement | undefined> = ref();
    const intializeCanvas = (canvas: HTMLCanvasElement) => {
      const [width, height] = [canvas.width, canvas.height];
      const ratio = window.devicePixelRatio;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
    };
    const getCanvasSize = (canvas: HTMLCanvasElement): [number, number] => {
      const [width, height] = [canvas.width, canvas.height];
      const ratio = window.devicePixelRatio;
      return [width * ratio, height * ratio];
    };
    const renderText = (canvas: HTMLCanvasElement, text: string, styles?: StylesType) => {
      const [width, height] = getCanvasSize(canvas);
      const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      const fontStyle = [
        styles?.bold && 'bold',
        styles?.italic && 'italic',
        styles?.fontSize && `${styles.fontSize}px`,
        'Nanum Gothic',
      ].filter((i) => i).join(' ');
      context.clearRect(0, 0, width, height);
      context.save();
      context.fillStyle = styles && styles.color || 'black';
      context.textAlign = 'center';
      context.font = fontStyle;
      context.fillText(text, width / 2, height / 2);
      if (styles?.underline) drawLine(context, text, width, height);
      context.restore();
    };
    const drawLine = (context: CanvasRenderingContext2D, text: string, width: number, height: number) => {
      const measure = context.measureText(text);
      context.save();
      const x = (width / 2) - (measure.width / 2);
      const y = (height / 2) + (measure.actualBoundingBoxAscent / 2) - 2;
      context.fillRect(x, y, measure.width, 2);
      context.restore();
    };
    onMounted(() => {
      intializeCanvas(canvas.value as HTMLCanvasElement);
      renderText(
        canvas.value as HTMLCanvasElement,
        styles.value.text,
        styles.value,
      );
    });
    watch([styles], () => {
      renderText(
        canvas.value as HTMLCanvasElement,
        styles.value.text,
        styles.value,
      );
    });
    return {
      styles,
      canvas,
    };
  },
});
</script>
