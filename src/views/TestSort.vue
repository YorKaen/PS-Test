<template lang="pug">
section.test.test-sort
    h1.test__title.txt-white Тестовое задание на добавление новых элементов и сортировку
    .txt-1.fw-b.test__desc.txt-white.mb-2 Данные берутся с jsonplaceholder.typicode.com, два разных запроса обьединяют данные в единый массив, и выводят в посты. Есть фильтр постов по автору, активируется только после 2 введенных символов. По умолчанию количество постов 9, после фильтра показывает все прошедшие фильтр. Верстка резиновая, адаптивная.
    .test-sort__nav.nav
    .test-sort__content.content.d-flex.flex-col.flex-row-md(v-if="isLoaded" v-cloak)
        .content__side.side
            .form.border-black.bg-white.p-2
        .content__items.items.wrap
            .item(v-for="item in testNumber").border-black.bg-white.d-flex.flex-col
                .item__remove
                    icon-delete(:fill="'white'" :width="32" :height="32")
                .item__img
                    img(src="@/assets/img_test-sort/testimg.png")
                .item__body.p-2.mt-2.d-flex.flex-col
                    .item__title.mb-2 Наименование товара
                    .item__desc.mb-2 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк
                    .item__price.mb-1.mt-a 10 0000000000000 руб.
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет загрузка
</template>

<script>
import IconDelete from "../components/Icons/IcoDelete";
export default {
  name: "TestSort",
  components: { IconDelete },
  data: () => ({
    isLoaded: true,
    testNumber: 9,
  }),
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
.test-sort {
  &__nav {
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 420px 1fr;
    gap: 1em;
    grid-template-areas: "side side" "items items";
    position: relative;
    @include breakpoint(lg) {
      grid-template-columns: 332px 1fr;
      grid-template-rows: auto;
      grid-template-areas: "side items";
    }
  }
}

.content {
  &__items {
    grid-area: items;
    gap: 1em;
    display: grid;
    grid-template-columns: 1fr;
    @include breakpoint(sm) {
      grid-template-columns: 1fr 1fr;
    }
    @include breakpoint(xl) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  &__side {
    grid-area: side;
  }
}

.item {
  position: relative;
  //overflow: hidden;
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
    background-color: #ff8484;
    border-radius: 0.5em;
    display: flex;
    place-content: center;
    padding: 0.3em;
  }
  &__img {
    height: 100%;
    max-height: 300px;
    overflow: hidden;
    @include breakpoint(lg) {
      max-height: 200px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      @include breakpoint(lg) {
        max-height: 200px;
      }
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
