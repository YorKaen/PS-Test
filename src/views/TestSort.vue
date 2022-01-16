<template lang="pug">
section.test.test-sort
    h1.test__title.txt-white Тестовое задание на добавление новых обьектов
    .txt-1.fw-b.test__desc.txt-white.mb-2  Добавление нового элемента в список товаров. Список сохраняется при обновлении страницы. Если постов нет, то отображается соотвествующий текст. Для теста, при первом заходе список создается из данных JSON. Использование миксинов Vue. Сохранение и получение данных (список предметов) через Vuex (модули) и localStorage. Верстка резиновая, адаптивная.
    .test-sort__nav.nav
    .test-sort__content.content.d-flex.flex-col.flex-row-md(v-if="isLoaded" v-cloak)
        .content__side.side
            form-validate
        .content__items.items.wrap(v-if="sortedPosts.length > 0 && true")
            item-removable(v-for="item in sortedPosts" :key="item.id" :itemData="item" @removeItem="removeItem").bg-white.d-flex.flex-col.r-10
            //.item(v-for="item in sortedPosts" :key="item.id").bg-white.d-flex.flex-col.r-10
            //    .item__remove(@click="removeItem(item)")
            //        icon-delete(:fill="'white'" :width="20" :height="28")
            //    .item__img
            //        img(:src="item.imgPath")
            //    .item__body.p-2.mt-2.d-flex.flex-col
            //        .item__title.mb-2 {{ item.title }}
            //        .item__desc.mb-2 {{ item.description }}
            //        .item__price.mb-1.mt-a {{ formatPrice(item.price) }} руб.
        .no-content__items(v-else)
            h3.txt-white.txt-center.w-100 ...Постов нет
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет загрузка
</template>

<script>
import IconDelete from "../components/Icons/IcoDelete";
import itemJson from "../db/items.json";
import FormValidate from "../components/Form/FormValidate";
import ItemRemovable from "../components/Items/ItemRemovable";

export default {
  name: "TestSort",
  components: { ItemRemovable, FormValidate, IconDelete },
  data: () => ({
    itemsArray: [],
    isLoaded: true,
  }),
  created() {},
  mounted() {},
  methods: {
    //Добавление, удаление обьектов
    removeItem(item) {
      this.$store.commit("sort/M_REMOVE_ITEM", item);
    },
    addItem(item) {
      this.$store.dispatch("sort/A_ITEMS_ADD", item);
    },
    saveItems() {
      this.$store.commit("sort/M_SAVE_ITEMS");
    },
  },
  computed: {
    //Основной узел сортировки, при отсутствии массива (первое посещение, ошибки), выводит массив по умолчанию
    sortedPosts() {
      if (this.$store.state.sort.itemsSaved) {
        return this.$store.state.sort.itemsSaved;
      } else {
        this.$store.commit("sort/M_INITIAL_ITEMS", itemJson);
        return this.$store.state.sort.itemsSaved;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
.test-sort {
  &__nav {
  }
  &__content {
    display: flex;
    position: relative;
    gap: 2em;
    @include breakpoint(lg) {
      display: grid;
      gap: 1em;
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

</style>
