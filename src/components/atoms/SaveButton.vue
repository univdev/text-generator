<template>
  <el-button
    v-bind="{ ...$attrs, ...$props }"
    type="primary"
    @click="onClick"
  >
    <i class="mdi mdi-content-save" />
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['click'],
  setup(_, { emit }) {
    const onClick = () => {
      emit('click');
    };
    return {
      onClick,
    };
  },
});
</script>

