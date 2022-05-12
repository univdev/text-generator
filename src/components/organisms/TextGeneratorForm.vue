<style lang="less" scoped>
  .text-generator-form {
    .font-size-field {
      width: 100%;
    }
  }
</style>

<template>
  <el-form
    class="text-generator-form"
  >
    <el-form-item>
      <el-input
        :model-value="text"
        :placeholder="textPlaceholder"
        :size="fieldSize"
        @input="onInput('text', $event)"
      />
    </el-form-item>
    <el-form-item>
      <el-input-number
        class="font-size-field"
        :model-value="fontSize"
        :placeholder="fontSizePlaceholder"
        :controls-position="fontSizeFieldControlsPosition"
        :size="fieldSize"
        @input="onInput('font-size', $event)"
      />
    </el-form-item>
    <el-form-item
      :label="colorPlaceholder"
    >
      <el-color-picker
        :model-value="color"
        @change="onInput('color', $event)"
      />
    </el-form-item>
    <el-form-item
      :label="backgroundColorPlaceholder"
    >
      <el-color-picker
        :model-value="backgroundColor"
        @change="onInput('color', $event)"
      />
    </el-form-item>
    <el-form-item
      :label="controlsPlaceholder"
    >
      <el-checkbox
        :model-value="bold"
        :label="boldPlaceholder"
        @change="onInput('bold', $event)"
      />
      <el-checkbox
        :model-value="italic"
        :label="italicPlaceholder"
        @change="onInput('italic', $event)"
      />
      <el-checkbox
        :model-value="underline"
        :label="underlinePlaceholder"
        @change="onInput('underline', $event)"
      />
    </el-form-item>
    <slot />
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { ComponentSize } from 'element-plus';

export type ChangableValueKeyTypes = 
  'text' | 
  'font-size' |
  'color' |
  'italic' |
  'bold' |
  'underline' |
  'background-color';

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    textPlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    fontSize: {
      type: Number as PropType<number>,
      required: false,
      default: 14,
    },
    fontSizePlaceholder: {
      type: String as PropType<string>,
      required: false,
      default: null,
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
    'update:text',
    'update:font-size',
    'update:color',
    'update:italic',
    'update:bold',
    'update:underline',
    'update:background-color',
  ],
  setup(_, { emit }) {
    const onInput = (key: ChangableValueKeyTypes, value: string | boolean | number) => {
      emit(`update:${key}`, value);
    };
    return {
      onInput,
    };
  },
});
</script>
