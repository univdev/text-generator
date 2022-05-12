<style lang="less" scoped>
  .text-generator {
    .renderer {
      margin-bottom: 16px;
    }
    .github-button {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
  }
</style>

<template>
  <div class="text-generator">
    <el-row
      justify="center"
    >
      <el-col
        :xl="8"
      >
        <text-renderer
          ref="renderer"
          class="renderer"
          :font-size="fontSize"
          :text="text"
          :color="color"
          :background-color="backgroundColor"
          :bold="bold"
          :italic="italic"
          :underline="underline"
        />
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
          @update:color="onUpdateValue('color', $event)"
          @update:background-color="onUpdateValue('background-color', $event)"
          @update:bold="onUpdateValue('bold', $event)"
          @update:italic="onUpdateValue('italic', $event)"
          @update:underline="onUpdateValue('underline', $event)"
        />
        <generator-controller
          @save="onSave"
          @reset="onReset"
        />
      </el-col>
    </el-row>
    <github-button
      class="github-button --el-box-shadow"
      size="large"
      @click="onClickGithubButton"
    />
    <download-dialog
      v-model:visible="isVisibleDownloadDialog"
      :download-uri="downloadUri"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import type { ComponentSize } from 'element-plus';
import DownloadDialog from '@/components/organisms/DownloadDialog.vue';
import TextGeneratorForm from '@/components/organisms/TextGeneratorForm.vue';
import TextRenderer from '@/components/organisms/TextRenderer.vue';
import GeneratorController from '@/components/molecules/GeneratorController.vue';
import GithubButton from '@/components/atoms/GithubButton.vue';

export type RendererType = InstanceType<typeof TextRenderer>;

export default defineComponent({
  components: {
    DownloadDialog,
    TextRenderer,
    TextGeneratorForm,
    GeneratorController,
    GithubButton,
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
    'click:github-button',
    'reset',
    'save',
  ],
  setup(props, { emit }) {
    let downloadUri = ref('');
    const isVisibleDownloadDialog = ref(false);
    const renderer: Ref<RendererType | undefined> = ref();
    const onClickGithubButton = (e: MouseEvent) => {
      emit('click:github-button', e);
    };
    const onUpdateValue = (key: string, value: string | number | boolean) => {
      emit(`update:${key}`, value);
    };
    const onSave = () => {
      const uri = renderer.value?.crop() as string;
      downloadUri.value = uri;
      isVisibleDownloadDialog.value = true;
    };
    const onReset = () => {
      emit('reset');
    };
    return {
      downloadUri,
      renderer,
      isVisibleDownloadDialog,
      onClickGithubButton,
      onUpdateValue,
      onSave,
      onReset,
    };
  },
});
</script>
