<template>
  <div class="page">
    <div class="content">
      <h1>Discover</h1>
      <h2>Local Markets</h2>
      <div class="flex-wrap">
        <div class="card" v-for="item in markets" :key="item.id">
          <div class="title">
            <h2>{{item.id}}</h2>
            <p>Rating</p>
          </div>
          <p>Location</p>
          <p>Date</p>
          <p>Some Vendors</p>
        </div>
      </div>
      <br>
      <h2>Local Farms</h2>
    </div>
    <Hello />
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  name: 'Index',
  data () {
    return {
      markets: [],
      lat: 0,
      long: 0
    }
  },
  components: {
    Hello
  },
  mounted () {
    // Check if user logged in, if so, hide the Hello component
    // Get markets
  },
  methods: {
    setLat (l) {
      this.lat = l
      console.log(l)
    },
    setLong (l) {
      this.long = l
      console.log(l)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;

  h1 {
    font-size: 5rem;
  }

  @media screen and (max-width: 768px) {
    > .content > * {
      opacity: 0;
      animation: fade-in 0.5s forwards;
      
      @for $i from 0 through 20 {
        &:nth-child(#{$i + 1}) {
          animation-delay: 0.1s * $i;
        }
      }
    }
  }
}

.flex-wrap {
  display: flex;
  flex-direction: row;
  margin: 0 10px;
  padding-bottom: 5px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #fca;
    border-radius: 10px;
  }

  .card {
    background-color: #fdd;
    border-radius: 5px;
    font-family: 'nunitolight';
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