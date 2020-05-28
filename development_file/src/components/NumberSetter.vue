<template lang="pug">
  div(class="numberBar")
    div(class="numberBar__quantity")
      button(type="button" class="numberBar__quantity__control numberBar__quantity__control--minus"  @click="removeCount") －
      input(type="number" name="quantity" min="1" v-model="quantity" readonly)
      button(type="button" class="numberBar__quantity__control numberBar__quantity__control--plus" @click="addCount") ＋
    span(class="numberBar__stock" v-if="stockShow") remain：
      span(class="text-red" v-if="stock < 10") {{stock}}
      span(class="text-blue" v-else-if="stock > 10 && stock < 25") {{stock}}
      span(class="text-green" v-else) {{stock}}
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.numberBar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto calc(#{$grid-gap}* 2);

  &__label {
    min-width: 4em;
    margin-right: 0.5em;
  }

  &__stock {
    position: absolute;
    bottom: calc(0px - calc(#{$grid-gap}* 1.1));
    right: calc(#{$grid-gap}/ 2);
    font-size: $font-size-light;
  }

  &__quantity {
    position: relative;
    width: 100%;
    border-radius: $border-radius;

    &__control {
      position: absolute;
      bottom: 50%;
      transform: translateY(50%);
      min-width: 50px;
      height: 100%;
      padding: 0;
      color: $color-gray-light;
      font-size: $font-size-light;
      border-radius: $border-radius;
      background-color: transparent;
      transition: $transition-fast;
      cursor: pointer;

      &--minus {
        left: 0;
      }

      &--plus {
        right: 0;
      }

      &:hover {
        color: $color-main;
        font-size: $font-size-medium;
        transition: $transition-fast;
      }
    }

    input {
      padding: 0 50px;
      text-align: center;
    }
  }
}
</style>

<script>
export default {
  props: ["stock", "stockShow", "count"],
  data() {
    return {
      quantity: 1
    };
  },
  methods: {
    addCount() {
      if (this.quantity <= this.stock - 1) {
        this.quantity++;
        this.$emit("quantity", this.quantity);
      }
    },
    removeCount() {
      if (this.quantity >= 2) {
        this.quantity--;
        this.$emit("quantity", this.quantity);
      }
    },
    getCount() {
      if (this.count !== undefined) {
        this.quantity = this.count;
      } else {
        this.quantity = 1;
      }
    }
  },
  created() {
    this.getCount();
  }
};
</script>