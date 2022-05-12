<style lang="less" scoped>
  .generator-controller {
    display: flex;
    align-content: center;
  }
</style>

<template>
  <div class="generator-controller">
    <el-button
      type="primary"
      @click="onClickSaveButton"
    >
      <i class="mdi mdi-content-save" />
    </el-button>
    <el-button
      type="danger"
      @click="onClickResetButton"
    >
      <i class="mdi mdi-close" />
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['save', 'reset'],
  setup(_, { emit }) {
    const onClickSaveButton = () => {
      emit('save');
    };
    const onClickResetButton = () => {
      emit('reset');
    };
    return {
      onClickSaveButton,
      onClickResetButton,
    }
  },
})
</script>

