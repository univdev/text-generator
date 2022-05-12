<style lang="less" scoped>

</style>

<template>
  <el-button
    v-bind="{ ...$attrs, ...$props }"
    :color="color"
    native-type="button"
    circle
  >
    <i class="mdi mdi-github"/>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String as PropType<string>,
      required: false,
      default: '#171515',
    },
  },
});
</script>
