<template>
  <div class="default">
    <CommonNavbar />
    <Nuxt />
    <CommonFooter />
  </div>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.btn-highlight {
  background-color: map-get($colors, 'primary');
}

.btn-del {
  background-color: #c52c2c;
  color: #fff;
}

.btn {
  border: 0px solid;
  padding: 10px 25px;
  border-radius: 30px;
  cursor: pointer;
}

.white-text {
  color: #fff;
}

.link-btn {
  text-decoration: none;
  color: #000;
  background-color: #fff;
  font-size: 14px;
  padding: 5px 25px;
  border-radius: 30px;
}

.pb-1 {
  padding-bottom: 10px;
}
</style>