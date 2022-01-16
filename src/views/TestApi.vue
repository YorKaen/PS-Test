<template lang="pug">
section.test.test-api
    h1.test__title.txt-white Тестовое задание на работу с API
    .txt-1.fw-b.test__desc.txt-white.mb-2 Данные берутся с jsonplaceholder.typicode.com, два разных запроса обьединяют данные в единый массив, и выводят в посты. Есть фильтр постов по автору, активируется только после 2 введенных символов (без разницы на регистр). По умолчанию количество постов 9, после фильтра показывает все прошедшие фильтр. Если в поиске ничего не нашлось, будет выдана соотвествующая надпись. Верстка резиновая, адаптивная.
    .content(v-if="isLoaded" v-cloak)
        .test-api__form.form.w-100
            input(v-model="postsFilter" placeholder="Filter by author...").form-input.mb-1.w-100.p-1
            .txt.txt-gray.mb-3 Имена для теста -
                span(v-for="item in usersArray" :key="item.id") {{ " " + item.name + ", "}}
        .test-api__posts.posts.d-flex.flex-col.wrap.d-grid-lg.grid-3.gap-20(v-if="sortedPosts.length > 0")
            post-default(v-for="item in sortedPosts" :key="item.id" :item="item").p-2.border-black.bg-white.d-flex.flex-col
        .no-content(v-else)
            .txt-white.txt-center.w-100 ...Ничего не найдено
    .no-content(v-else="isLoaded")
        h3.txt-white.txt-center.w-100 ...Идет загрузка

</template>

<script>
import urlTest from "../components/config/urlTestPlaceholder";
import PostDefault from "../components/Items/Post";

export default {
  name: "TestApi",
  components: { PostDefault },
  data: () => ({
    isLoaded: false,
    postsFilter: "",
    postsArray: [],
    usersArray: [],
    postsAmount: 99,
  }),
  created() {},
  mounted() {
    this.setupPosts();
  },
  methods: {
    //Получение постов и юзеров, и продолжение после успеха. Установка юзеров в отдельный массив
    setupPosts() {
      const getPosts = urlTest.getPosts(this.postsAmount).then((res) => {
        return res.data;
      });
      const getUsers = urlTest.getUsers().then((res) => {
        return res.data;
      });
      Promise.all([getPosts, getUsers]).then((values) => {
        const posts = values[0];
        this.usersArray = values[1];
        this.matchAuthors(posts);
        this.isLoaded = true;
      });
    },
    //При совпадении id автора поста и id среди юзеров - заносятся в обьект в новый массив с этим автором
    matchAuthors(posts) {
      this.postsArray = posts.map((item) => {
        let id = item.userId;
        item.author = this.findUserId(id);
        return item;
      });
    },
    findUserId(id) {
      let selectUser = this.usersArray.find((user) => {
        return user.id === id;
      });
      return selectUser.name;
    },
  },
  computed: {
    sortedPosts() {
      console.log(this.postsFilter);
      if (this.postsFilter.trim().length > 1) {
        return this.postsArray.filter((item) =>
          item.author
            .toLocaleLowerCase()
            .includes(this.postsFilter.toLocaleLowerCase())
        );
      } else return this.postsArray.slice(0, 9);
    },
  },
};
</script>

<style lang="scss" scoped>
.test-api {
  &__form {
    display: flex;
    flex-direction: column;
    .form-input {
      min-width: 22ch;
      max-width: 30%;
      margin: 0 auto 1em;
    }
  }
}
</style>
