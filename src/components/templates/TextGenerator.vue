<style lang="less" scoped>

</style>

<template>
  <div class="text-generator">
    <el-row
      justify="center"
    >
      <el-col
        :xl="8"
      >
        <text-generator-form
          :text="text"
          :text-placeholder="textPlaceholder"
          :font-size="fontSize"
          :font-size-placeholder="fontSizePlaceholder"
          :color="color"
          :italic="italic"
          :underline="underline"
          :bold="bold"
          :background-color="backgroundColor"
          @update:text="onUpdateValue('text', $event)"
          @update:font-size="onUpdateValue('font-size', $event)"
          @update:background-color="onUpdateValue('background-color', $event)"
          @update:bold="onUpdateValue('bold', $event)"
          @update:italic="onUpdateValue('italic', $event)"
          @update:underline="onUpdateValue('underline', $event)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { ComponentSize } from 'element-plus';
import TextGeneratorForm from '@/components/molecules/TextGeneratorForm.vue';

export default defineComponent({
  components: {
    TextGeneratorForm,
  },
  props: {
    text: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    textPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '텍스트',
    },
    fontSize: {
      type: Number as PropType<number>,
      required: false,
      default: 14,
    },
    fontSizePlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '폰트 사이즈',
    },
    fontSizeFieldControlsPosition: {
      type: String as PropType<string>,
      required: false,
      default: 'right',
    },
    color: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    colorPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '글씨 색상',
    },
    italic: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    italicPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '기울기',
    },
    underline: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    underlinePlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '밑줄',
    },
    bold: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    boldPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '굵게',
    },
    backgroundColor: {
      type: String as PropType<string>,
      required: false,
      default: '#FFF',
    },
    backgroundColorPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '배경 색상',
    },
    fieldSize: {
      type: String as PropType<ComponentSize>,
      required: false,
      default: 'large',
    },
    controlsPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: '글씨 효과',
    },
  },
  emits: [
    ...TextGeneratorForm.emits as string[],
  ],
  methods: {
    onUpdateValue(key: string, value: string | number | boolean) {
      this.$emit(`update:${key}`, value);
    },
  },
});
</script>
