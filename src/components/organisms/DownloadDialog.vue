<style lang="less" scoped>

</style>

<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    class="download-dialog"
    @update:model-value="onChangeVisible"
  >
    <link-form
      :uri="downloadUri"
    />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LinkForm from '@/components/molecules/LinkForm.vue';

export default defineComponent({
  components: {
    LinkForm,
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: false,
      default: '다운로드',
    },
    visible: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    downloadUri: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
  },
  emits: ['update:visible'],
  setup(_, { emit }) {
    const onChangeVisible = (flag: boolean) => {
      emit('update:visible', flag);
    };
    return {
      onChangeVisible,
    };
  },
});
</script>
