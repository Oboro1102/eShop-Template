<template lang="pug">
  footer(class="footer")
    div(class="footer__info")
      div(class="footer__info__item")
        router-link(class="footer__info__item__logo" to="/") YOUR LOGO

      div(class="footer__info__item")
        h5(class="footer__info__item__title") ABOUT
        ul(class="footer__info__item__link")
          li(class="footer__info__item__link__item")
            router-link(to="/about") About Us
          li(class="footer__info__item__link__item") 
            router-link(to="/service") Terms of Service
          li(class="footer__info__item__link__item") 
            router-link(to="/privacy") Privacy Policy

      div(class="footer__info__item")
        h5(class="footer__info__item__title") CONTACT
        ul(class="footer__info__item__link")
          li(class="footer__info__item__link__item") 
            router-link(to="/contact") Contact Us

    div(class="footer__copyright") &copy; 2018 - {{localYear}} Design &amp; Coding by ツキノリュウ.
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.footer {
  color: $color-gray-medium;
  font-size: $font-size-light;
  background-color: $color-gray-deep;

  &__info {
    @include container;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: calc(#{$grid-gap}* 2) $grid-gap 0;

    &__item {
      margin-right: $grid-width;
      padding-bottom: calc(#{$grid-gap}* 1.5);

      &:last-of-type {
        margin-right: 0;
      }

      &__logo {
        @include link-style {
          color: $color-yellow;
        }
        font-size: $font-size-medium;
        font-weight: $font-weight-bold;
      }

      &__title {
        margin: 0 0 calc(#{$grid-gap}/ 2);
        font-size: $font-size-normal;
        font-weight: $font-weight-medium;
      }

      &__link {
        @include list-style;

        &__item {
          margin-bottom: calc(#{$grid-gap}/ 2);

          &:last-of-type {
            margin-bottom: 0;
          }

          a {
            @include link-style {
              opacity: $opacity-hover;
            }
            color: $color-gray-medium;
          }
        }
      }
    }
  }

  &__copyright {
    @include container;
    padding: 0 $grid-gap calc(#{$grid-gap}/ 2);
    font-size: $font-size-thin;
    text-align: center;
  }
}
</style>

<script>
export default {
  computed: {
    localYear() {
      return new Date().getFullYear();
    }
  }
};
</script>
