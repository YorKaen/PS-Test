<template lang="pug">
section.test.test-lists
    h1.test__title.txt-white
    .txt-1.fw-b.test__desc.txt-white.mb-2
    .test-lists__content.content.d-flex.flex-col.flex-row-md(v-if="isLoaded" v-cloak)
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет работа
</template>

<script>
export default {
  name: "TestLists",
  components: {},
  data: () => ({
    isLoaded: false,
  }),
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
</style>
