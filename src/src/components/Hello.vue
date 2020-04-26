<template>
  <div id='hello'>
    <img class='logo' src='../assets/unChained_Square.svg' alt='Logo' />
    <div class='step'>
      <form>
        <div id='step-1'>
          <input type='text' placeholder='Email' aria-label='Email'>
          <input type='password' placeholder='Password' aria-label='Password'>
          <div class='flex-row'>
            <button @click='showNextStep($event);'>Register</button>
            <button @click='showNextStep($event);'>Login</button>
          </div>
        </div>
        <div class='hidden' id='step-2'>
          <div class='flex-row'>
            <input type='combobox' id="city" placeholder="Your City" />
            <button id='continueWithArea' class='hidden' @click='showNextStep($event);'>Go</button>
          </div>
          <p>or</p>
          <button @click='showNextStep($event);'>Use Current Location</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      step: 1,
      isFarmer: false,
      zip: null
    }
  },
  methods: {
    showNextStep (e) {
      document.getElementById(`step-${this.step}`).style.display = 'none'
      this.step += 1
      if (this.step === 3) {
        document.getElementById('hello').style.opacity = 0
        setTimeout(() => {
          document.getElementById('hello').style.display = 'none'
        }, 1000)
        e.preventDefault()
      }
      document.getElementById(`step-${this.step}`).style.display = 'flex'
      e.preventDefault()
    },
    locale () {
      fetch('https://secure.geobytes.com/AutoCompleteCity?key=7c756203dbb38590a66e01a5a3e1ad96&callback=?&q=').then()
    }
  },
  watch: {
    'zip': function () {
      if (this.zip) {
        document.getElementById('continueWithArea').style.display = 'unset'
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
#hello { // Is it me, you're looking for?
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  transition-duration: 1s;
  display: none;
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
      border: #ccc solid 1px;
      border-radius: 3px;
      display: block;
      flex: 1 1;
      font-size: 1rem;
      margin: 5px 0;
      padding: 10px 15px;
    }

    button {
      background-color: #eee;
      border: #ccc solid 1px;
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
