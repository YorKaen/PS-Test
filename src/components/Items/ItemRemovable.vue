<template lang="pug">
.item
    .item__remove(@click="$emit('removeItem', itemData)")
        icon-delete(:fill="'white'" :width="20" :height="28")
    .item__img
        img(:src="itemData.imgPath")
    .item__body.p-2.mt-2.d-flex.flex-col
        .item__title.mb-2 {{ itemData.title }}
        .item__desc.mb-2 {{ itemData.description }}
        .item__price.mb-1.mt-a {{ formatPrice(itemData.price) }} руб.
</template>

<script>
// import XXX from "@/components/XXX.vue";
import IconDelete from "../Icons/IcoDelete";

export default {
  name: "ItemRemovable",
  components: { IconDelete },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  created() {},
  mounted() {},
  methods: {
    //Формат денежного значения в более приятный вид
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
.item {
  position: relative;
  &:hover {
    .item__remove {
      visibility: visible;
      opacity: 1;
    }
  }
  &__remove {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: absolute;
    top: -0.4em;
    right: -0.4em;
    background-color: $danger;
    border-radius: 0.5em;
    display: flex;
    place-content: center;
    width: 32px;
    height: 32px;
  }
  &__img {
    height: 300px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
  &__body {
    font-size: em(16);
    line-height: 20px;
    height: 100%;
  }
  &__title {
    font-size: em(20);
    line-height: 25px;
    font-weight: 600;
  }
  &__desc {
    flex-grow: 1;
  }

  &__price {
    font-size: em(24);
    line-height: 30px;
    font-weight: 600;
  }
}
</style>
