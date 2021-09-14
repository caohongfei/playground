<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <p><router-link to="/">Go to Home</router-link></p>
  <p><router-link to="/about">Go to About</router-link></p>
  <router-view></router-view>
  <hr>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {count: [8]}
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
