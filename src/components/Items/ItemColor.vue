<template lang="pug">
.item.d-flex.flex-between
    .item-left.d-flex
        .item-name Item {{ index + 1}}
    .item-right.d-flex
        input(type="number" min="0" v-model="itemData.amount").input-number.mr-2
        input(type="color" v-model="itemData.color" ).input-color

</template>

<script>
// import XXX from "@/components/XXX.vue";

export default {
  name: "ItemColor",
  components: {},
  props: {
    itemData: {
      type: Object,
      required: true,
    },
    index: Number,
  },
  data: () => ({}),
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
//Project Specific
</style>
