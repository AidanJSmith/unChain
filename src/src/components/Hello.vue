<template>
  <div class="hello">
    <img class="logo" src="../assets/unChained_Square.svg" />
    <div class="step">
      <form>
        <div>
          <input type="text" placeholder="Name">
          <input type="text" placeholder="Email">
          <div class="flex-row">
            <button>Register</button>
            <button>Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hello { // Is it me, you're looking for?
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
      color: #000;
      margin: 5px 0;
      padding: 10px 20px;
      flex: 1 1;
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
