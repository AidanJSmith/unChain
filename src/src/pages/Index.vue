<template>
  <div>
    <h1>Local Markets</h1>
    <div class="flex-wrap">
      <div class="card">
        <h2>Some Market</h2>
        <p>Location</p>
        <p>Date</p>
        <p>Some Vendors</p>
        <p>Rating</p>
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

<style scoped>

</style>