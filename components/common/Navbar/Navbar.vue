<template>
  <div class="navbar">
    <div class="container">
      <div class="grid-container">
        <div class="items">
          <p>LOGO</p>
        </div>
        <div class="items">
          <nuxt-link to="/"> Home </nuxt-link>
          <nuxt-link to="/search"> Search </nuxt-link>
          <nuxt-link to="/cart">
            <div class="item-cart">
              <span class="material-icons">shopping_bag</span>
              <p>{{ total }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      return this.$store.state.total
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 20px 0px;
  width: 100%;
  z-index: 2;
  .grid-container {
    align-items: center;
    .items {
      grid-column: span 6;
      &:nth-child(1) {
        color: #fff;
      }
      &:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        a {
          text-decoration: none;
          margin: 0px 15px;
          color: #fff;
          &:nth-child(3) {
            position: relative;
            .item-cart {
              p {
                position: absolute;
                top: -5px;
                font-size: 12px;
                width: 20px;
                height: 20px;
                right: -10px;
                background-color: #c83630;
                border-radius: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;
                margin: 0;
              }
            }
          }
        }
        button {
          margin-left: auto;
        }
      }
    }
  }
}
</style>

