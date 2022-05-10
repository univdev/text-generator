<template>
  <text-generator-template
    v-model:text="payload.text"
    v-model:font-size="payload.fontSize"
    v-model:background-color="payload.backgroundColor"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TextGeneratorTemplate from '@/components/templates/TextGenerator.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    TextGeneratorTemplate,
  },
  setup() {
    const payload = reactive({
      backgroundColor: '#FF0000' as string,
      color: '#F00' as string,
      text: '텍스트' as string,
      fontSize: 14 as number,
    });

    return {
      payload,
    };
  },
});
</script>
