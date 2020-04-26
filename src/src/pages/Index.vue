<template>
  <div class="page">
    <div class="content">
      <h1>Discover</h1>
      <h2>Local Markets</h2>
      <p><b>Discover these great local markets.</b></p>
      <div class="flex-wrap">
        <div class="card" v-for="item in markets" :key="item.id">
          <router-link :to='"/market/" + encodeURIComponent(item.id)'>
            <div class="title">
              <h2>{{item.marketName}}</h2>
              <p>5/5</p>
            </div>
            <p>{{item.schedule.join(', ')}}</p>
            <p>{{item.description}}</p>
            <br>
          </router-link>
        </div>
      </div>
      <br>
      <h2>Local Products</h2>
      <p><b>Discover fresh local produce.</b></p>
      <div class="flex-wrap">
        <div class="card" v-for="item in products" :key="item.id">
          <div class="title">
            <h2>{{item.marketName}}</h2>
            <p>4.5/5</p>
          </div>
          <p>{{item.schedule.join(', ')}}</p>
          <p>{{item.description}}</p>
          <br>
        </div>
      </div>
      <br>
    </div>
    <Hello @set-lat="setLat" @set-long="setLong" />
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  name: 'Index',
  data () {
    return {
      markets: [],
      products: [],
      lat: 0,
      long: 0
    }
  },
  components: {
    Hello
  },
  mounted () {
    // Check if user logged in, if so, hide the Hello component
  },
  methods: {
    setLat (l) {
      this.lat = l
      if (this.lat && this.long) {
        this.searchMarkets()
      }
      console.log(l)
    },
    setLong (l) {
      this.long = l
      if (this.lat && this.long) {
        this.searchMarkets()
      }
      console.log(l)
    },
    searchMarkets () {
      // Get markets
      var xhr = new XMLHttpRequest()
      var self = this

      function redir (markets) {
        for (let key of Object.keys(markets)) {
          let xxhr = new XMLHttpRequest()

          xxhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
              self.markets.push(JSON.parse(`${this.responseText}`))
            }
          })

          let id = markets[key][0]
          console.log(markets)
          console.log(id)
          xxhr.open('GET', `http://localhost:8081/getMarket/${id}`)
          xxhr.setRequestHeader('Access-Control-Allow-Origin', '*')
          xxhr.send()
        }
      }

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          redir(JSON.parse(this.responseText))
        }
      })

      xhr.open('GET', `http://localhost:8081/marketsNear/${this.lat}/${this.long}`)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.send()
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

    a {
      text-decoration: none;
      color: #333;
    }

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