<template lang="pug">
section.test.test-lists
    h1.test__title.txt-white Тестовое задание на работу с динамическими списками
    .txt-1.fw-b.test__desc.txt-white.mb-2 Создает указанное количество списков с указанным количеством предметов. Цвет и количество блоков в каждом ряду генерируется случайно. Слева можно менять количество блоков и их цвет, справа они отображаются в красивом виде.
    .test-lists__content(v-if="isLoaded" v-cloak).content.d-flex.flex-col.d-grid-md.grid-2.gap-20
        .content__config.config.bg-white.border-black.p-2
            .config__lists.lists(v-if="isItemsLoaded" )
                list-items(v-for="(list, index) in lists" :key="list.id" :listData="list").config__list
            .no-content(v-else)
                .txt-black.txt-center.w-100 ...Идет загрузка
        .content__display.bg-white.border-black.p-2
            .display__lists.lists(v-if="isItemsLoaded" )
                .list__result.result(v-for="(list, index) in lists" :key="list.id" )
                    .result-title List {{ index + 1 }}
                    .result-row(v-for="(row, index) in list.items" :key="row.id").d-flex.p-1.flex-wrap
                        .result-block.color-block(v-for="item in row.amount" :style="{ backgroundColor: row.color}").mr-1
            .no-content(v-else)
                .txt-black.txt-center.w-100 ...Идет загрузка
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет загрузка
</template>

<script>
import ItemColor from "../components/Items/ItemColor";
import ListItems from "../components/List/ListItems";
import { mixinRandom } from "../mixins/mixinRandom";

export default {
  name: "TestLists",
  components: { ListItems, ItemColor },
  data: () => ({
    isLoaded: true,
    lists: [],
    isItemsLoaded: false,
    listsNeeded: 3,
    itemsNeeded: 4,
  }),
  mixins: [mixinRandom],
  created() {},
  mounted() {
    this.fillLists();
  },
  methods: {
    fillLists() {
      const list = {};
      //Создаем листы
      for (let i = 0; i < this.listsNeeded; i++) {
        list.id = i;
        list.items = [];
        this.lists.push({ ...list });
      }
      //Добавляем в items каждого lists копию обьекта с случайными данными
      for (let i = 0; i < this.lists.length; i++) {
        const tempItem = {};
        for (let j = 0; j < this.itemsNeeded; j++) {
          tempItem.id = j;
          tempItem.amount = this.randomNumber(1, 16);
          tempItem.color = "#" + this.randomColor();
          this.lists[i].items.push({ ...tempItem });
        }
      }
      //Имитация загруженных данных
      this.isItemsLoaded = true;
      //console.log(this.lists);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
.color-block {
  width: 1em;
  height: 1em;
  background-color: black;
}
</style>
