<template lang="pug">
  transition(name="faed" mode="in-out" appear)
    div(class="toTop" v-if="scrollOffsetTop" @click="scrollToTop")
      svg(width="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50")
        g(class="svgButton")
          line(x1="25" y1="6.67" x2="8.53" y2="23.15")
          line(x1="25" y1="6.67" x2="41.47" y2="23.15")
          line(x1="25" y1="6.67" x2="25" y2="31.52")
          line(x1="7.92" y1="43.33" x2="42.08" y2="43.33")
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.toTop {
  @include fixed-object;
  bottom: 5vh;
  right: $grid-gap;
  z-index: $layer-lv4;
  width: 3rem;
  height: 3rem;
  line-height: 2.5;
  text-align: center;
  color: $color-white;
  background-color: $color-blue;
  border-radius: $border-radius-round;
  transition: $transition-fast;
  cursor: pointer;

  &:hover {
    background-color: $color-red;
  }

  .svgButton {
    fill: none;
    stroke: $color-white;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-width: 7px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      windowOffsetTop: 0,
      defaultOffsetTop: 1
    };
  },
  computed: {
    scrollOffsetTop() {
      return this.windowOffsetTop >= this.defaultOffsetTop;
    }
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    },
    setOffsetTop() {
      this.windowOffsetTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop;
    }
  },
  mounted() {
    this.setOffsetTop();
    window.addEventListener("scroll", () => {
      this.setOffsetTop();
    });
  }
};
</script>