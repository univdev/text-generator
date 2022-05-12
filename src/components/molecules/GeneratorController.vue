<style lang="less" scoped>
  .generator-controller {
    display: flex;
    align-content: center;
  }
</style>

<template>
  <div class="generator-controller">
    <save-button
      @click="onClickSaveButton"
    />
    <reset-button
      @click="onClickResetButton"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SaveButton from '@/components/atoms/SaveButton.vue';
import ResetButton from '@/components/atoms/ResetButton.vue';

export default defineComponent({
  components: {
    SaveButton,
    ResetButton,
  },
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

