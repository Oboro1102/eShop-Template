<template lang="pug">
  table(class="orderList")
    thead
      tr
        th Order #
        th Placed
        th Details
        th Total
        th Status
    tbody
      tr(v-for="(item,index) in data" ,:key="item.serial")
        td(class="orderSn") # {{item.serial}}
        td(class="orderTime") {{item.time}}
        td(class="orderDetails")
          div(class="orderList__row")
            div(class="cover" :style="{'background-image': 'url(' + item.goods.src + ')'}")
            router-link(:to="{name:'Product',params:item.goods}" target="_blank") {{item.goods.title}} x {{item.goods.count}}
            span(class="spec") {{item.goods.spec}} size
        td(class="orderTotal") $ {{(item.goods.count * item.goods.price).toLocaleString()}}
        td(class="orderStatus" :class="{'text-green':item.status === 'arrived','text-blue':item.status === 'paid','text-red':item.status === 'unpaid'}") {{item.status}}
</template>

<style lang="scss" scoped>
@import "../assets/scss/_mixin";

.orderList {
  width: 100%;
  word-break: break-all;
  border-collapse: collapse;

  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  thead {
    tr {
      border-bottom: 1px solid $color-gray-deep;

      th {
        padding: 0.5em;
        font-size: $font-size-light;
        font-weight: $font-weight-black;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid $color-gray-thin;

      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        background-color: #fafafa;
      }

      td {
        vertical-align: middle;
        padding: calc(#{$grid-gap}/ 2) 0.5em;

        @include breakpoint-md {
          padding: calc(#{$grid-gap}/ 2) 0;
        }

        &.orderTime {
          font-size: $font-size-light;
        }

        &.orderDetails {
          .cover {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            margin-right: 0.5em;
            border-radius: $border-radius-round;
            background-position: center;
            background-size: cover;
          }

          .spec {
            color: $color-gray-medium;
            font-size: $font-size-light;
          }

          a {
            margin-right: 0.5em;
          }
        }

        &.orderTotal {
          color: $color-red;
        }

        &.orderStatus {
          color: $color-gray-medium;
          font-size: $font-size-light;
        }
      }
    }
  }

  @include breakpoint-md {
    display: block;

    thead {
      display: none;
    }

    tbody {
      display: block;

      tr {
        display: block;
        border-bottom: 1px solid $color-black;

        &:hover {
          background-color: transparent;
        }

        td {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          border-bottom: 1px solid $color-gray-light;
          font-size: 0.9rem;

          &:last-of-type {
            border-bottom: none;
          }

          &::before {
            margin-right: auto;
            color: $color-black;
          }

          // Tag for mobile
          &.orderSn::before {
            content: "Order #";
          }
          &.orderTime::before {
            content: "Placed";
          }
          &.orderDetails::before {
            content: "Details";
          }
          &.orderTotal::before {
            content: "Total";
          }
          &.orderStatus::before {
            content: "Status";
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: ["data"]
};
</script>