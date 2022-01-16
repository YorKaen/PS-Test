<template lang="pug">
.app.container
    .app__links.d-flex.w-100.flex-between
        //router-link(to="/").px-2.py-1.txt-1.border-black.mr-1 домой?
        router-link(to="/test-api").px-2.py-1.txt-1.border-secondary.mr-1.txt-center.txt-white.app-link Получение и обработка данных через API
        router-link(to="/test-sort").px-2.py-1.txt-1.border-secondary.mr-1.txt-center.txt-white.app-link Добавление новых обьектов
        router-link(to="/test-lists").px-2.py-1.txt-1.border-secondary.mr-1.txt-center.txt-white.app-link Динамическое изменение списков
    .app__view
        router-view
</template>

<style lang="scss">
@import "src/assets/scss/project/mymixins";
.app {
  margin-top: 4em;
}
.app__links {
  .app-link {
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: $black-1;
    }
    &.router-link-active {
      border-color: $primary;
      background-color: $black-1;
    }
  }
}

</style>
