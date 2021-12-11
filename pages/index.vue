<template>
  <div>
    <section class="header">
      <div
        class="background-header"
        :style="`background-image:url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${listBanner.backdrop_path})`"
      >
        <div class="container">
          <div class="grid-container">
            <div class="items">
              <div class="group-items">
                <h1 class="name">{{ listBanner.name }}</h1>
                <p class="overview">
                  {{ listBanner.overview }}
                </p>
                <div class="group-button">
                  <div class="items">
                    <a
                      :href="listBanner.homepage"
                      class="link-btn"
                      target="_blank"
                      >WATCH</a
                    >
                  </div>
                  <div class="items">
                    <button
                      class="btn btn-highlight white-text"
                      @click="addToCart(listBanner)"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="items"></div>
          </div>
        </div>
        <div class="color-background"></div>
      </div>
    </section>

    <section class="body">
      <section class="movie">
        <div class="container">
          <h2 class="pb-1">What's Popular</h2>
          <div class="grid-container">
            <div v-for="(item, index) in results" :key="index" class="card">
              <img
                :src="
                  `https://www.themoviedb.org/t/p/w220_and_h330_face/` +
                  item.backdrop_path
                "
                alt=""
              />
              <span class="vote-average">{{ item.vote_average }}</span>
              <h5 class="name">{{ item.original_title }}</h5>
              <p class="date">{{ item.release_date }}</p>
              <button
                class="btn btn-highlight white-text"
                @click="addToCart(item)"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="introduction-movie">
        <div class="video-wrapper">
          <div class="wrapper-color"></div>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Y1PufTyBdts?controls=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
          <div class="container">
            <div class="grid-container">
              <div class="items">
                <h2 class="name">SPIDER MAN : NO WAY HOME</h2>
                <p class="overview">
                  With Spider-Man's identity now revealed, our friendly
                  neighborhood web-slinger is unmasked and no longer able to
                  separate his normal life as Peter Parker from the high stakes
                  of being a superhero. When Peter asks for help from Doctor
                  Strange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="all-movie">
        <div class="container">
          <h2 class="pb-1">All Movie</h2>

          <div class="grid-container">
            <div
              v-for="(item, index) in listMovieB.results"
              :key="index"
              class="card"
            >
              <img
                v-if="item.backdrop_path"
                :src="
                  `https://www.themoviedb.org/t/p/w220_and_h330_face/` +
                  item.backdrop_path
                "
              />
              <img v-else src="../assets/images/noimage.png" />
              <span class="vote-average">{{ item.vote_average }}</span>
              <h5 class="name">{{ item.original_title }}</h5>
              <p class="date">{{ item.release_date }}</p>
              <button
                class="btn btn-highlight white-text"
                @click="addToCart(item)"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { results } = await $axios.$get(
      `https://api.themoviedb.org/3/search/movie?api_key=c653d694f3ae733f27f14ada515ac74c&query=a`
    )
    const listMovieB = await $axios.$get(
      `https://api.themoviedb.org/3/search/movie?api_key=c653d694f3ae733f27f14ada515ac74c&query=love`
    )

    const listBanner = await $axios.$get(
      `https://api.themoviedb.org/3/tv/88329?api_key=c653d694f3ae733f27f14ada515ac74c&query=88329-hawkeye`
    )

    console.log(listBanner)
    return {
      results,
      listMovieB,
      listBanner,
    }
  },

  data() {
    return {
      storageKey: 'cartItems',
      items: [],
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || []
    this.commitStore()
  },
  methods: {
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
h2 {
  color: #fff;
}

section.header {
  width: 100%;
  .background-header {
    /* background-image: url('../assets/images/movie02.jpeg'); */
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    height: 600px;
    .color-background {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(9, 9, 121, 0) 75%,
        rgba(0, 212, 255, 0) 100%
      );
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 0;
      top: 0;
      pointer-events: none;
    }
    .container {
      height: 100%;
      position: relative;
      z-index: 1;
      .grid-container {
        align-items: center;
        height: 100%;
        .group-button {
          display: flex;
          margin-top: 20px;
          .items {
            display: flex;
            align-items: center;
          }
        }
        .group-items {
          h1.name {
            color: #fff;
          }
          p.overview {
            color: #fff;
          }
        }
        .items {
          &:nth-child(1) {
            grid-column: span 5;
            margin-right: 10px;
            img {
              margin: auto;
              width: 300px;
            }
          }
          &:nth-child(2) {
            grid-column: span 7;
          }
        }
      }
    }
  }
}

section.body {
  padding: 50px 0px;
  section.movie {
    .grid-container {
      grid-gap: 30px;
      .card {
        grid-column: span 2;
        position: relative;
        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 1px 5px 5px 2px #0c0c0c;
        }
        span.vote-average {
          position: absolute;
          font-size: 12px;
          top: 10px;
          right: 10px;
          color: #fff;
          background-color: map-get($colors, 'primary');
          padding: 10px;
          border-radius: 30px;
        }
        h5 {
          padding-top: 10px;
          color: #fff;
        }
        p.date {
          color: #666;
          margin-bottom: 10px;
        }
      }
    }
  }

  section.introduction-movie {
    padding: 50px 0px;
    iframe {
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .video-wrapper {
      width: 100%;
      height: 500px;
      position: relative;
      overflow: hidden;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .wrapper-color {
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 9, 121, 0) 75%,
        rgba(0, 212, 255, 0) 100%
      );
    }
    .items {
      position: relative;
      color: white;
      text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
      grid-column: span 4;
      text-align: left;
    }
  }

  section.all-movie {
    .group-search {
      padding-bottom: 20px;
    }
    .grid-container {
      grid-gap: 30px;
      .card {
        grid-column: span 2;
        position: relative;
        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 1px 5px 5px 2px #0c0c0c;
        }
        span.vote-average {
          position: absolute;
          font-size: 12px;
          top: 10px;
          right: 10px;
          color: #fff;
          background-color: map-get($colors, 'primary');
          padding: 10px;
          border-radius: 30px;
        }
        h5 {
          padding-top: 10px;
          color: #fff;
        }
        p.date {
          color: #666;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
