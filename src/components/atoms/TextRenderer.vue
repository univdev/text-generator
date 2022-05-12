<style lang="less" scoped>
  .text-renderer {
    width: 100%;
    border: 1px solid #EEE;
  }
</style>

<template>
  <canvas
    ref="canvas"
    :width="width"
    :height="height"
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
    width: {
      type: Number as PropType<number>,
      required: false,
      default: 640,
    },
    height: {
      type: Number as PropType<number>,
      required: false,
      default: 320,
    },
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
    /**
     * 텍스트 그리기
     */
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
    /**
     * 밑줄 그리는 함수
     */
    const drawLine = (context: CanvasRenderingContext2D, text: string, width: number, height: number) => {
      const measure = context.measureText(text);
      context.save();
      const x = (width / 2) - (measure.width / 2);
      const y = (height / 2) + (measure.actualBoundingBoxAscent / 2) - 2;
      context.fillRect(x, y, measure.width, 2);
      context.restore();
    };
    const crop = () => {
      const originalCanvasContext = canvas.value?.getContext('2d');
      const [width, height] = getCanvasSize(canvas.value as HTMLCanvasElement);
      const image = originalCanvasContext?.getImageData(0, 0, width, height);
      const cloneCanvas = document.createElement('canvas');
      cloneCanvas.width = props.width;
      cloneCanvas.height = props.height;
      intializeCanvas(cloneCanvas);
      const cloneCanvasContext = cloneCanvas.getContext('2d');
      cloneCanvasContext?.putImageData(image as ImageData, 0, 0);

      return cropImageFromCanvas(cloneCanvasContext as CanvasRenderingContext2D);
    };
    const cropImageFromCanvas = (ctx: CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      let w = canvas.width, h = canvas.height;
      const pix = {
        x:[] as number[],
        y:[] as number[],
      };
      const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      let index = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          index = (y * w + x) * 4;
          if (imageData.data[index + 3] > 0) {
            pix.x.push(x);
            pix.y.push(y);
          } 
        }
      }
      pix.x.sort((a, b) => a - b);
      pix.y.sort((a, b) => a - b);
      var n = pix.x.length-1;

      w = 1 + pix.x[n] - pix.x[0];
      h = 1 + pix.y[n] - pix.y[0];
      var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

      canvas.width = w;
      canvas.height = h;
      ctx.putImageData(cut, 0, 0);

      return canvas.toDataURL();
    }
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
      crop,
    };
  },
});
</script>
