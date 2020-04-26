<template>
  <div class="page">
    <h1>Subcontracting</h1>
    <button>Place a Subcontract</button>
    <br>
    <h2>Available Contracts</h2>
    <div class="flex-wrap">
      <div class="card">
        <div class="title">
          <h2>Rutebaga</h2>
          <p>300lb / $150</p>
        </div>
        <p>Farmer John</p>
        <p>Sunset Farms to Aidan's market</p>
        <p>3.6 miles</p>
        <button>Accept Subcontract</button>
      </div>
      <div class="card">
        <div class="title">
          <h2>Onions</h2>
          <p>200lb / $100</p>
        </div>
        <p>Waterway Farms</p>
        <p>Waterway Farms to Aidan's market</p>
        <p>5.6 miles</p>
        <button>Accept Subcontract</button>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Subcontracting',
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
    font-size: 4.5rem;
  }
}

button {
  background-color: #def;
  border: none;
  border-radius: 3px;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 15px 25px;
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
    background-color: #cdf;
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