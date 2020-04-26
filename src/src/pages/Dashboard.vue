<template>
  <div class="page">
    <h1>Dashboard</h1>
    <h2>Your Orders</h2>
    <div class="flex-wrap">
      <div class="card">
        <div class="title">
          <h2>Rutebaga</h2>
          <p>$99.99</p>
        </div>
        <p>Some Market</p>
        <p>Pickup: Wednesday</p>
        <p>Quantity: 67</p>
      </div>
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
        </div>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
      </div>
    </div>
    <br>
    <h2>Your Markets</h2>
    <div class="flex-wrap">
      <div class="card">
        <div class="title">
          <h2>Some Market</h2>
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
    <br>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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