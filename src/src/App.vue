<template>
  <div id="app">
    <main>
      <router-view></router-view>
      <footer>
        <div class="container">
          <router-link to="/dashboard">
            <span class="oi" data-glyph="home" title="Home"></span>
          </router-link>
          <router-link to="/">
            <span class="oi" data-glyph="magnifying-glass" title="Search"></span>
          </router-link>
          <router-link to="/account">
            <span class="oi" data-glyph="person" title="Account"></span>
          </router-link>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@font-face {
  font-family: 'nunitolight';
  src: url('./assets/fonts/nunito-light-webfont.woff2') format('woff2'),
        url('./assets/fonts/nunito-light-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@import url("https://use.typekit.net/eyp4egm.css");
@import url('./assets/fonts/open-iconic.min.css');

body {
  margin: 0;
}

#app {
  font-family: poiret-one, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  min-height: 100vh;
  position: relative;

  footer {
    background-color: #ccc;
    line-height: 75px;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .container {
      color: #333;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      max-width: 700px;
      margin: auto;

      a {
        color: inherit;
      }

      .oi {
        color: inherit;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
