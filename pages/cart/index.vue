<template>
  <div class="container">
    <h2 class="pb-1">List Movie</h2>
    <div class="grid-container">
      <div v-for="(item, index) in items" :key="index" class="items">
        <div class="grid-container">
          <div class="item">
            <img
              v-if="item.backdrop_path"
              :src="
                `https://www.themoviedb.org/t/p/w220_and_h330_face/` +
                item.backdrop_path
              "
            />
            <img v-else src="../../assets/images/noimage.png" />
          </div>
          <div class="item">
            <span class="vote-average">
              <span class="material-icons"> star </span
              >{{ item.vote_average }} | {{ item.release_date }}</span
            >

            <h5 class="name">{{ item.original_title }}</h5>
            <p class="overview">{{ item.overview }}</p>
          </div>
          <div class="item">
            <button class="btn btn-del" @click="deleteCart(item.id)">
              <span class="material-icons"> delete </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="group-footer">
      <button class="btn" @click="shopping">Shopping</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storageKey: 'cartItems',
      items: [],
      cartItems: [],
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || []
    this.cartItems = this.items
  },

  methods: {
    shopping() {
      let timerInterval
      this.$swal.fire({
        title: 'Please Pay',
        html: 'Inside <strong></strong> seconds.<br/><br/>',

        timer: 60000,
        didOpen: () => {
          this.$swal.showLoading()
          timerInterval = setInterval(() => {
            this.$swal.getHtmlContainer().querySelector('strong').textContent =
              (this.$swal.getTimerLeft() / 1000).toFixed(0)
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        },
      })
    },
    setStorage() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items))
      this.commitStore()
    },
    showAll() {
      this.cartItems = this.items
    },
    deleteCart(id) {
      this.items = this.items.filter((x) => x.id !== id)
      this.setStorage()
      this.showAll()
    },
    commitStore() {
      this.$store.commit('update', this.items.length)
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  color: #fff;
}
.grid-container {
  grid-gap: 20px;
  .items {
    grid-column: span 12;
    color: #fff;
    .grid-container {
      img {
        width: 100%;
      }
    }
  }
  .item {
    &:nth-child(1) {
      grid-column: span 2;
      img {
        box-shadow: 1px 5px 5px 2px #0c0c0c;
        border-radius: 10px;
      }
    }
    &:nth-child(2) {
      grid-column: span 8;
      .vote-average {
        .material-icons {
          font-size: 14px;
          color: #f99e12;
        }
      }
      .name {
        font-size: 24px;
      }
      .overview {
        padding: 10px 0px;
      }
    }
    &:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      grid-column: span 2;
    }
  }
  padding-bottom: 20px;
}
.group-footer {
  padding-top: 20px;
  border-top: 2px solid #fff;
  display: flex;
  justify-content: flex-end;
  button {
    font-size: 18px;
  }
}
</style>