export const mixinValidate = {
  methods: {
    noEmptyCheck(value) {
      if (value !== "" && value !== null) {
        return true;
      } else return false;
    },
    noLettersCheck(value) {
      return !!(value.match(/^[0-9]+$/) && true);
    },
  },
};
