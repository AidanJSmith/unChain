<template>
  <div id="hello">
    <img class="logo" src="../assets/unChained_Square.svg" alt="Logo" />
    <div class="step">
      <form>
        <div id="step-1">
          <input type="text" placeholder="Name" aria-label="Name">
          <input type="text" placeholder="Email" aria-label="Email">
          <div class="flex-row">
            <button @click="showNextStep($event);">Register</button>
            <button @click="showNextStep($event);">Login</button>
          </div>
        </div>
        <div class="hidden" id="step-2">
          <input type="text" placeholder="ZIP Code" aria-label="ZIP Code">
          <button>Use Current Location</button>
          <div class="flex-row">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    showNextStep (e) {
      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#hello { // Is it me, you're looking for?
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
}

.logo {
  width: 200px;
  margin: 10px auto;
  animation: fade-in 1.5s forwards;
}

.step {
  margin: 10px auto;
  width: 320px;
  height: 0;
  overflow: hidden;
  animation: slide-down 1s 0.5s forwards;

  form {
    div {
      display: flex;
      flex-direction: column;
    }

    .flex-row {
      flex-direction: row;
    }

    input {
      border: #aaa solid 1px;
      border-radius: 3px;
      display: block;
      flex: 1 1;
      font-size: 1rem;
      margin: 5px 0;
      padding: 10px 15px;
    }

    button {
      border: #aaa solid 1px;
      color: #000;
      margin: 5px 0;
      padding: 10px 20px;
      flex: 1 1;
      transition-duration: 0.3s;

      &:hover {
        background-color: #f53;
        color: #fff;
        outline: none;
      }
    }

    .hidden {
      display: none;
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

@keyframes slide-down {
  0% {
    height: 0;
  }
  100% {
    height: 100px;
    padding-bottom: 100px;
  }
}
</style>
