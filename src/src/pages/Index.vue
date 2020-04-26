<template>
  <div class="page">
    <h1>Local Markets</h1>
    <div class="flex-wrap">
      <div class="card">
        <div class="title">
          <h2>Some Marketasdfasdfasdf</h2>
          <p>Rating</p>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
          <p>Rating</p>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
          <p>Rating</p>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
          <p>Rating</p>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
    </div>
    <Hello />
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  name: 'Index',
  components: {
    Hello
  },
  mounted () {
    // Check if user logged in, if so, hide the Hello component
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
}

.flex-wrap {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  .card {
    background-color: #bde;
    border-radius: 5px;
    margin-right: 15px;
    min-width: 300px;
    opacity: 0;
    animation: fade-in 0.5s forwards;

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 0 10px;

      h2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;  
      }
    }
  }

  @for $i from 0 through 20 {
    :nth-child(#{$i + 1}) {
      animation-delay: 0.1s * $i;
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>