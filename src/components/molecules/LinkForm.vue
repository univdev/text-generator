<style lang="less" scoped>
  .link-form {
    .description {
      margin-bottom: 16px;
    }
  }
</style>

<template>
  <div class="link-form">
    <p class="description">
      <slot>
        이미지 URI를 추출하였습니다.
      </slot>
    </p>
    <el-input
      :model-value="uri"
      size="large"
      readonly
      @click="onClickField"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    uri: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
  },
  emits: [
    'click:uri-field',
  ],
  setup(_, { emit }) {
    const selectInputText = (input: HTMLInputElement) => {
      input && input.select();
    };
    const onClickField = (event: MouseEvent) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const value: string = target.value;
      selectInputText(target);
      emit('click:uri-field', value);
    };
    return {
      onClickField,
    }
  },
});
</script>

