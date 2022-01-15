<template lang="pug">
.post
    h3.post__title.pb-1.let-upper {{ item.title }}
    .post__line.line.mb-a
    .post__body.mt-1.let-upper {{ item.body }}
    .txt.txt-gray.ml-a.mt-2 Author: {{ item.author }}

</template>

<script>
// import XXX from "@/components/XXX.vue";
export default {
  name: "PostDefault",
  components: {},
  props: ["item"],
  data: () => ({}),
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
//Project Specific
</style>
