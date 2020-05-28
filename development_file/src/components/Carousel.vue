<template lang="pug">
  div(class="carousel")
    button(type="button" class="carousel__next" @click="next" v-if="carouselData.length >= 2") ＞
    button(type="button" class="carousel__previous" @click="previous" v-if="carouselData.length >= 2") ＜
    ul(class="carousel__list")
      li(v-for="(item,index) in carouselData" :key="item.id" v-show="item.carouselShow")
        router-link(:to="{name:linkPage,params:item}" v-if="linkPage") 
          img(:src="item.src" :alt="item.title")
        img(:src="item.src" :alt="item.title" v-else)
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.carousel {
  position: relative;
  width: 100%;

  &::after {
    position: absolute;
    bottom: -5px;
    left: 0;
    z-index: $layer-lv1;
    content: "";
    width: 100%;
    height: 150px;
    background: linear-gradient(
      0deg,
      rgba(242, 242, 242, 1) 20%,
      rgba(255, 255, 255, 0) 100%
    );

    @include breakpoint-lg {
      display: none;
    }
  }

  &__next,
  &__previous {
    position: absolute;
    bottom: 60%;
    transform: translateY(40%);
    z-index: $layer-lv1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 4rem;
    color: $color-white;
    background-color: $color-red;
    font-size: $font-size-medium;
    font-weight: $font-weight-black;
    opacity: $opacity-hover;
    transition: $transition-fast;
    cursor: pointer;

    &:hover {
      background-color: $color-black;
      opacity: 1;
      transition: $transition-fast;
    }
  }

  &__next {
    right: 0;
    border-radius: $border-radius 0 0 $border-radius;
  }

  &__previous {
    left: 0;
    border-radius: 0 $border-radius $border-radius 0;
  }

  &__list {
    @include list-style;
    display: flex;
    align-items: center;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 100%;
      max-height: 700px;
      text-align: center;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
}
</style>

<script>
export default {
  props: ["data", "autoplay", "linkPage"],
  data() {
    return {
      carouselData: []
    };
  },
  computed: {
    currentCarousel() {
      return this.carouselData.filter(item => item.carouselShow === true);
    }
  },
  methods: {
    getData() {
      let serverData = JSON.parse(JSON.stringify(this.data));
      serverData.forEach(element => {
        element.carouselShow = false;
      });
      this.carouselData = serverData;
      this.carouselData[0].carouselShow = true;
    },
    next() {
      let currentCarouselIndex = this.carouselData.indexOf(
        this.currentCarousel[0]
      );

      if (currentCarouselIndex + 1 <= this.carouselData.length - 1) {
        this.carouselData[currentCarouselIndex].carouselShow = false;
        this.carouselData[currentCarouselIndex + 1].carouselShow = true;
      } else {
        this.carouselData[currentCarouselIndex].carouselShow = false;
        this.carouselData[0].carouselShow = true;
      }
    },
    previous() {
      let currentCarouselIndex = this.carouselData.indexOf(
        this.currentCarousel[0]
      );

      if (currentCarouselIndex - 1 >= 0) {
        this.carouselData[currentCarouselIndex].carouselShow = false;
        this.carouselData[currentCarouselIndex - 1].carouselShow = true;
      } else {
        this.carouselData[currentCarouselIndex].carouselShow = false;
        this.carouselData[this.carouselData.length - 1].carouselShow = true;
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    setInterval(() => {
      this.next();
    }, this.autoplay);
  }
};
</script>