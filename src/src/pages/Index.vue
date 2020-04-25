<template>
  <div>
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