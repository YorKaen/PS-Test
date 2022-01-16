<template lang="pug">
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

</template>

<script>
// import XXX from "@/components/XXX.vue";
import { mixinValidate } from "../../mixins/mixinValidate";

export default {
  name: "FormValidate",
  components: {},
  mixins: [mixinValidate],
  props: {},
  data: () => ({
    isFormButtonDisabled: true,
    isFieldsFilled: false,
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
  }),
  created() {},
  mounted() {},
  methods: {
    //Первая (декоративная) проверка на заполненные поля, если верно, проверяются ошибки
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
    //Все значения проходят через проверку в миксине, затем проверяется каждое поле в массиве на соотвествие
    validate() {
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
    //Сброс после успешного создания обьекта
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
      this.isFieldsFilled = false;
      this.isFormButtonDisabled = true;
    },
    //Еще проверка при нажатии кнопки, присвоение новому обьекту id, и отправка наверх на добавление в массив
    addItem() {
      if (this.validate()) {
        let tempItem = this.newItem;
        tempItem.id = Date.now();
        this.resetForm();
        this.$emit("addItem", tempItem);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/project/mymixins";
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
</style>
