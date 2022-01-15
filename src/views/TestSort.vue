<template lang="pug">
section.test.test-sort
    h1.test__title.txt-white Тестовое задание на добавление новых элементов и сортировку
    .txt-1.fw-b.test__desc.txt-white.mb-2 Данные берутся с jsonplaceholder.typicode.com, два разных запроса обьединяют данные в единый массив, и выводят в посты. Есть фильтр постов по автору, активируется только после 2 введенных символов. По умолчанию количество постов 9, после фильтра показывает все прошедшие фильтр. Верстка резиновая, адаптивная.
    .test-sort__nav.nav
    .test-sort__content.content.d-flex.flex-col.flex-row-md(v-if="isLoaded" v-cloak)
        .content__side.side
            .form.border-black.bg-white.p-3.r-10
                .form__row.mb-2
                    label#labelName.form-label.txt-dark.txt-label.txt-after Наименование товара
                    input#inputName.form-input(@change="validate($event)" autocomplete="off" placeholder="Введите наименование товара" required="required" type="text").w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="debugIsInvalid").txt-danger Поле является обязательным
                .form__row.mb-2
                    label#labelDescription.form-label.txt-dark.txt-label Описание товара
                    textarea#inputDescription.form-input.form-textarea(@change="validate()" autocomplete="off" placeholder="Введите описание товара" ).w-100.r-20.p-1.size-1.shadow-1.mt-1
                .form__row.mb-2
                    label#labelImage.form-label.txt-dark.txt-label.txt-after Ссылка на изображение товара
                    input#inputImage.form-input(@change="validate()" autocomplete="off" placeholder="Введите ссылку" required="required" type="text").w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="debugIsInvalid").txt-danger Поле является обязательным
                .form__row.mb-2
                    label#labelPrice.form-label.txt-dark.txt-label.txt-after Цена товара
                    input#inputPrice.form-input(@change="validate()" autocomplete="off" placeholder="Введите цену" required="required" type="text").w-100.r-20.p-1.size-1.shadow-1.mt-1
                    .form-error(v-if="debugIsInvalid").txt-danger Поле является обязательным
                .form__row
                    button.btn.bg-secondary.w-100.py-1.r-10
                        .txt.txt-white.txt-center Добавить товар
        .content__items.items.wrap
            .item(v-for="item in debugNumber").border-black.bg-white.d-flex.flex-col.r-10
                .item__remove
                    icon-delete(:fill="'white'" :width="20" :height="28")
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
    debugIsInvalid: false,
    debugNumber: 9,
  }),
  created() {},
  mounted() {},
  methods: {
    validate(e) {
      console.log(e.target.value);
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
  .form__row {
    position: relative;
    .form-error {
      transition: all 0.3s ease-in-out;
      position: absolute;
      bottom: 1em;
      z-index: 0;
      opacity: 0;
      user-select: none;
    }
    &.is-invalid {
      .form-input {
        border-color: $danger;
      }
      .form-error {
        bottom: -1.2em;
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
