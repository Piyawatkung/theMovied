<template>
  <section class="searching">
    <div class="container">
      <div class="grid-container">
        <div class="items">
          <input
            class="form-control input"
            @keyup="filterText($event.target.value)"
          />
        </div>
        <div class="items">
          <button class="button" @click="searching()">Search</button>
        </div>
      </div>
      <div v-if="filter && filter.length >= 0" class="details">
        <div v-for="(item, index) in filter" :key="index" class="items">
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
              <button
                class="btn btn-highlight white-text"
                @click="addToCart(item)"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: null,
      form: {
        text: null,
      },
      storageKey: 'cartItems',
      items: [],
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || []
    this.commitStore()
  },
  methods: {
    filterText(req) {
      this.form.text = req
    },

    async searching() {
      const filters = await this.$axios.$get(
        `https://api.themoviedb.org/3/search/movie?api_key=c653d694f3ae733f27f14ada515ac74c&query=${this.form.text}`
      )
      this.filter = filters.results
    },

    addToCart(item) {
      const checkDuplicate = this.items.find((x) => x.id === item.id)

      if (checkDuplicate) {
        this.$swal.fire(
          'The item is in the shopping cart.',
          'clicked the button!',
          'error'
        )
        return
      }

      this.items = [...this.items, item]
      this.setStorage()
    },
    setStorage() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items))
      this.commitStore()
    },
    commitStore() {
      this.$store.commit('update', this.items.length)
    },
  },
}
</script>

<style lang="scss" scoped>
.searching {
  padding-top: 30px;
}
.grid-container {
  grid-gap: 20px;
  .input {
    height: 35px;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 30px;
  }

  .button {
    background-color: #f2f2f2;
    border: 1px solid #000;
    height: 35px;
    font-size: 14px;
    padding: 0 50px;
    border-radius: 6px;
    color: #000;
    cursor: pointer;
  }
  .items {
    &:nth-child(1) {
      grid-column: span 6;
      input {
        font-size: 18px;
        padding: 0px 20px;
      }
    }
    &:nth-child(2) {
      grid-column: span 2;
    }
  }
}

.details {
  padding-top: 50px;
  .items {
    grid-column: span 12;
    color: #fff;
    margin-bottom: 20px;
  }
  .grid-container {
    grid-gap: 20px;
    .item {
      &:nth-child(1) {
        grid-column: span 2;
        img {
          box-shadow: 1px 5px 5px 2px #0c0c0c;
          border-radius: 10px;
          width: 100%;
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
  }

  padding-bottom: 20px;
}
</style>