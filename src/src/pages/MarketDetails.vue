<template>
  <div class="page">
    <h1>Market</h1>
    <h2>Aidan's market</h2>
    <div class="card">
      <h2>Times: Monday, Tuesday Wednesday</h2>
      <h2>Location: 123 Farm Fresh Way</h2>
    </div>
    <br>
    <h2>Available Products</h2>
    <div class="flex-wrap">
      <div class="card">
        <div class="title">
          <h2>Rutebaga</h2>
          <p>$13.99 - $15.99 / lb</p>
        </div>
        <p>Farmer John, Sunset Farms</p>
        <button>Place an Order</button>
      </div>
      <div class="card">
        <div class="title">
          <h2>Onions</h2>
          <p>$4.99 - $5.99 / lb</p>
        </div>
        <p>Waterway Farms</p>
        <button>Place an Order</button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Market',
  mounted () {
    // Check if user logged in, if so, hide the Hello component
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1000px;
  margin: auto;
  margin-bottom: 60px;
  overflow: hidden;

  h1 {
    font-size: 5rem;
  }
}

button {
  background-color: #def;
  border: none;
  border-radius: 3px;
  padding: 10px 15px;
  margin-bottom: 20px;
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
    background-color: #adf;
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