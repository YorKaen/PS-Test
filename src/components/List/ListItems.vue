<template lang="pug">
.list
    .list-head.d-flex
        button.btn.list-hide.mr-1
            span.arrow(@click="showList = !showList" :class="{hidden: !showList}")
                span
                span
        .list-index List {{ listData.id + 1}}
    .list-content.pl-6(v-show="showList")
        item-color(v-for='(item, index) in listData.items' :key="item.id" :itemData="item" :index="index" ).mb-1
</template>

<script>
// import XXX from "@/components/XXX.vue";
import ItemColor from "../Items/ItemColor";
export default {
  name: "ListItems",
  components: { ItemColor },
  props: {
    listData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showList: true,
  }),
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.arrow {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  position: relative;
  line-height: 22px;
  transition: all 0.2s ease;
  span {
    top: 0.5rem;
    position: absolute;
    width: 0.75rem;
    height: 0.1rem;
    background-color: black;
    display: inline-block;

    &:first-of-type {
      left: 0;
      transform: rotate(45deg);
    }
    &:last-of-type {
      right: 0;
      transform: rotate(-45deg);
    }
  }
  &.hidden {
    transform: rotate(-90deg);
    span {
      &:first-of-type {
      }

      &:last-of-type {
      }
    }
  }
}
</style>
