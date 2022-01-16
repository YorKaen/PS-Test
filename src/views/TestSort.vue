<template lang="pug">
section.test.test-sort
    h1.test__title.txt-white Тестовое задание на добавление новых элементов и сортировку
    .txt-1.fw-b.test__desc.txt-white.mb-2  Добавление нового элемента в список товаров. Список сохраняется при обновлении страницы. Если постов нет, то отображается соотвествующий текст. Для теста, при первом заходе список создается из данных JSON. Использование миксинов Vue. Сохранение и получение данных (список предметов) через Vuex (модули) и localStorage. Верстка резиновая, адаптивная.
    .test-sort__nav.nav
    .test-sort__content.content.d-flex.flex-col.flex-row-md(v-if="isLoaded" v-cloak)
        .content__side.side
            .form.bg-white.p-3.r-10
                .form__row.mb-3(:class="{'is-invalid': !validItem.title}")
                    label#labelName.form-label.txt-dark.txt-label.txt-after Наименование товара
                    input#inputName.form-input(@change="changedInput()" v-model="newItem.title" autocomplete="off" placeholder="Введите наименование товара" required="required" type="text" ).w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="!validItem.title").txt-danger Поле является обязательным
                .form__row.mb-3
                    label#labelDescription.form-label.txt-dark.txt-label Описание товара
                    textarea#inputDescription.form-input.form-textarea(v-model="newItem.description" autocomplete="off" placeholder="Введите описание товара" ).w-100.r-20.p-1.size-1.shadow-1.mt-1
                .form__row.mb-3(:class="{'is-invalid': !validItem.imgPath}")
                    label#labelImage.form-label.txt-dark.txt-label.txt-after Ссылка на изображение товара
                    input#inputImage.form-input(@change="changedInput()" v-model="newItem.imgPath" autocomplete="off" placeholder="Введите ссылку" required="required" type="text").w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="!validItem.imgPath").txt-danger Поле является обязательным
                .form__row.mb-4(:class="{'is-invalid': !validItem.price}")
                    label#labelPrice.form-label.txt-dark.txt-label.txt-after Цена товара
                    input#inputPrice.form-input(@change="changedInput()"  v-model="newItem.price" autocomplete="off" placeholder="Введите цену" required="required" type="text").w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="!validItem.price").txt-danger В поле должны быть цифры
                .form__row
                    button(:disabled="isFormButtonDisabled" @click="addItem").btn.bg-secondary.w-100.py-1.r-10
                        .txt.txt-white.txt-center(v-if="!isFormButtonDisabled") Добавить товар
                        .txt.txt-white.txt-center(v-else) Заполните необходимые поля
        .content__items.items.wrap(v-if="sortedPosts.length > 0 && true")
            .item(v-for="item in sortedPosts" :key="item.id").bg-white.d-flex.flex-col.r-10
                .item__remove(@click="removeItem(item)")
                    icon-delete(:fill="'white'" :width="20" :height="28")
                .item__img
                    img(:src="item.imgPath")
                .item__body.p-2.mt-2.d-flex.flex-col
                    .item__title.mb-2 {{ item.title }}
                    .item__desc.mb-2 {{ item.description }}
                    .item__price.mb-1.mt-a {{ formatPrice(item.price) }} руб.
        .no-content__items(v-else)
            h3.txt-white.txt-center.w-100 ...Постов нет
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет загрузка
</template>

<script>
import IconDelete from "../components/Icons/IcoDelete";
import itemJson from "../db/items.json";
import { mixinValidate } from "../mixins/mixinValidate";

export default {
  name: "TestSort",
  components: { IconDelete },
  mixins: [mixinValidate],
  data: () => ({
    newItem: {
      title: "",
      description: "",
      imgPath: "",
      price: "",
    },
    validItem: {
      title: true,
      imgPath: true,
      price: true,
    },
    isButtonTextOn: false,
    isFormButtonDisabled: true,
    isFieldsFilled: false,
    itemsArray: [],
    isLoaded: true,
  }),
  created() {},
  mounted() {},
  methods: {
    changedInput() {
      this.checkEmptyFields();
      if (this.isFieldsFilled) {
        this.checkForm();
      }
    },
    checkForm() {
      if (!this.validate()) {
        this.isFormButtonDisabled = true;
      }
    },
    checkEmptyFields() {
      if (this.noEmptyCheck(this.newItem.title)) {
        if (this.noEmptyCheck(this.newItem.imgPath)) {
          if (this.noEmptyCheck(this.newItem.price)) {
            this.isFieldsFilled = true;
          }
        }
      }
    },
    validate() {
      console.log("validate + " + Date.now());
      this.validItem.title = this.noEmptyCheck(this.newItem.title);
      this.validItem.imgPath = this.noEmptyCheck(this.newItem.imgPath);
      this.validItem.price = this.noLettersCheck(this.newItem.price);
      for (let field in this.validItem) {
        if (this.validItem[field] === false) {
          return false;
        }
      }
      this.isFormButtonDisabled = false;
      return true;
    },

    ////Проверка формы на ошибки, вызывает стили и текст об ошибке
    //validateForm() {
    //  this.validItem.title = this.noemptyCheck(this.newItem.title);
    //  this.validItem.imgPath = this.noemptyCheck(this.newItem.imgPath);
    //  this.validItem.price = this.onlynumbersCheck(this.newItem.price);
    //  for (const field in this.validItem) {
    //    return this.validItem[field] !== false;
    //  }
    //},
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    removeItem(item) {
      this.$store.commit("sort/M_REMOVE_ITEM", item);
    },
    addItem() {
      if (this.validate()) {
        let tempItem = this.newItem;
        tempItem.id = Date.now();
        this.resetForm();
        this.$store.dispatch("sort/A_ITEMS_ADD", tempItem);
      }
    },
    resetForm() {
      this.newItem = {
        title: "",
        description: "",
        imgPath: "",
        price: "",
      };
      this.validItem = {
        title: true,
        imgPath: true,
        price: true,
      };
      this.isButtonTextOn = false;
      this.isFormButtonDisabled = true;
    },
    saveItems() {
      this.$store.commit("sort/M_SAVE_ITEMS");
    },
    //createItem(item) {
    //  this.$store.commit("local/addNewItem", item);
    //  this.getDataItems();
    //},
    //removeItem(item) {
    //  this.itemsArray = this.itemsArray.filter((i) => i.id !== item.id);
    //  this.storeItems(this.itemsArray);
    //},
    //storeItems(newArray) {
    //  this.$store.commit("local/setStorageItems", newArray);
    //},
    //getDataItems() {
    //  Promise.resolve(this.$store.state.local.savedItems)
    //    .then((data) => (this.itemsArray = [...data]))
    //    .catch((error) => console.log(error));
    //},
  },
  computed: {
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

button[disabled] {
  background-color: $gray-1;
  user-select: none;
  cursor: default;
  .txt {
    color: $gray-2;
  }
}

.txt-after {
  position: relative;

  &:after {
    position: absolute;
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: $danger;
    margin-left: 2px;
  }
}

.form {
  position: sticky;
  top: 0;
  .form__row {
    position: relative;
    .form-error {
      transition: all 0.3s ease-in-out;
      position: absolute;
      bottom: 1em;
      z-index: 0;
      opacity: 0;
      user-select: none;
      font-size: em(12);
    }
    &.is-invalid {
      .form-input {
        border-color: $danger;
      }
      .form-error {
        bottom: -1.4em;
        opacity: 1;
      }
    }
  }
}

.form-input {
  padding: em(11) em(16);
  border: 2px solid transparent;
  min-width: 284px;
  border-radius: 8px;
  z-index: 1;
  transition: border-color 0.3s ease-in-out;
}

.size-1 {
  height: 36px;
}

.form-textarea {
  word-break: break-word;
  height: 100%;
  min-height: em(108);
  resize: vertical;
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
    @include breakpoint(lg) {
      //height: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      @include breakpoint(lg) {
        //max-height: 200px;
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
