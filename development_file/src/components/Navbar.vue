<template lang="pug">
  nav(class="navbar")
    div(class="navbar__logo")
      router-link(to="/") YOUR LOGO
    div(class="navbar__search" v-if="windowInnerWidth")
      input(type="search" name="searchGoods" placeholder="Search goods..." @keyup.enter="searchData")
    button(type="button" class="navbar__trigger" v-if="!windowInnerWidth" @click="showMenu" @blur="hideMenu") MENU
    ul(class="navbar__menu" :class="{'show':!windowInnerWidth && menuShow}" v-if="menuShow")
      li(class="navbar__search" v-if="!windowInnerWidth")
        input(type="search" name="searchGoods" placeholder="Search goods..." @mouseover="typing = true" @mouseleave="typing = false" @blur="hideMenu" @keyup.enter="searchData")
      li(class="navbar__menu__link" v-for="(item,index) in navLinks" :key="index")
        router-link(:to="item.href") {{item.title}}        
      li(class="navbar__menu__link" v-if="checkLogin === ''")
        router-link(to="/login") 
          |LOGIN
      li(class="navbar__menu__link" v-if="checkLogin !== ''")
        router-link(:class="{'active':childrenRoute !== -1}" to="/account/member") 
          |ACCOUNT
      li(class="navbar__menu__link" v-if="checkLogin !== ''")
        button(class="navbar__menu__link--logout" @click="logOut")
          |LOGOUT
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.navbar {
  @include fixed-object;
  top: 0;
  left: 0;
  z-index: $layer-lv4;
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(#{$grid-gap}/ 2) $grid-gap;
  background-color: $color-gray-deep;

  @include breakpoint-lg {
    padding: calc(#{$grid-gap}/ 1.5) $grid-gap;
  }

  &__logo {
    max-width: calc(#{$grid-width}* 2 + #{$grid-gap});

    a {
      @include link-style {
        color: $color-yellow;
      }
      font-size: $font-size-medium;
      font-weight: $font-weight-bold;
    }
  }

  &__search {
    width: 100%;
    max-width: calc(#{$grid-width}* 4 + calc(#{$grid-gap}* 3));
    margin: 0 auto;

    input {
      border: 0;
    }

    @include breakpoint-lg {
      margin-bottom: $grid-gap;
    }
  }

  &__trigger {
    display: block;
    margin-left: auto;
    padding: 0 1em;
    color: $color-white;
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;
    background-color: $color-blue;
    border-radius: $border-radius-round;

    &:hover {
      color: $color-black;
      background-color: $color-yellow;
    }
  }

  &__menu {
    @include list-style;
    display: flex;
    align-items: center;
    font-size: $font-size-medium;
    font-weight: $font-weight-bold;

    &.show {
      position: fixed;
      top: calc(#{$grid-gap} + 65px);
      right: $grid-gap;
      z-index: $layer-lv4;
      display: block;
      max-width: calc(100vw - calc(#{$grid-gap}* 2));
      padding: 1em;
      background-color: $color-gray-deep;
      border-radius: $border-radius;
    }

    &__link {
      margin-right: $grid-gap;

      &:last-of-type {
        margin-right: 0;
      }

      @include breakpoint-sm {
        margin-right: $grid-gap-rwd;
      }

      a {
        @include link-style {
          color: $color-yellow;
        }

        &.active {
          color: $color-yellow;
        }
      }

      &--logout {
        padding: 0;
        color: $color-white;
        font-size: $font-size-medium;
        font-weight: $font-weight-bold;
        background-color: transparent;

        &:hover {
          color: $color-yellow;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      result: [],
      menuShow: false,
      typing: false,
      windowWidth: 0,
      windowRWDWidth: 991.98
    };
  },
  computed: {
    navLinks() {
      return [
        {
          href: "/news",
          title: "NEWS"
        },
        {
          href: "/product",
          title: "SHOP"
        }
      ];
    },
    checkLogin() {
      return this.$store.state.token;
    },
    windowInnerWidth() {
      return this.windowWidth >= this.windowRWDWidth;
    },
    childrenRoute() {
      return this.$route.path.indexOf("/account");
    }
  },
  watch: {
    windowWidth() {
      this.windowWidth < this.windowRWDWidth
        ? (this.menuShow = false)
        : (this.menuShow = true);
    },
    menuShow() {
      this.menuShow && this.windowWidth < this.windowRWDWidth
        ? (document.querySelector("body").style.overflow = "hidden")
        : document.querySelector("body").removeAttribute("style");
    }
  },
  methods: {
    showMenu() {
      this.menuShow = !this.menuShow;
    },
    hideMenu() {
      if (!this.typing) {
        setTimeout(() => {
          this.menuShow = false;
        }, 200);
      }
    },
    logOut() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => console.log(err));
    },
    searchData() {
      let dataBase = this.$store.state.goods,
        inputValue = document.querySelector('input[name="searchGoods"]').value,
        keywords = inputValue.toLowerCase().trim(),
        filterData = dataBase.filter(keyword => {
          return keyword.title.toLowerCase().includes(keywords);
        }),
        result = JSON.parse(JSON.stringify(filterData));

      if (keywords === "") {
        alert("Please enter keywords");
      } else {
        if (this.$route.name === "Search") {
          this.$store
            .dispatch("SEARCH_RESULT", result)
            .catch(err => console.log(err));
        } else {
          this.$store
            .dispatch("SEARCH_RESULT", result)
            .then(() => {
              this.$router.push("/search");
            })
            .catch(err => console.log(err));
        }
      }

      if (!this.windowInnerWidth) {
        this.menuShow = false;
      }
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }
};
</script>