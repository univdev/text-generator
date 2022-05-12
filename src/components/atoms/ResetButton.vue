<style lang="less" scoped>

</style>

<template>
  <el-button
    v-bind="{ ...$attrs, ...$props }"
    type="danger"
    @click="onClick"
  >
    <i class="mdi mdi-close" />
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
