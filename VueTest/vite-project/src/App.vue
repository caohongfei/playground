<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

import { ref, reactive, version, shallowRef, shallowReactive, readonly, watch, isRef, unref, toRef, toRaw, computed, watchEffect } from 'vue'
const v = {k: 5, j: {m: 8}}
const param = reactive(v)
const derived = computed(() => param)
window.p1 = v
window.p2 = param

const theme = reactive({
  color: 'red'
})

const hello = ref(undefined)
const a = ref(1)
const b = computed(() => {
  console.log('inside computed')
  return a.value + 5
})

function f() {
  console.log('start, b=', b.value)
  a.value = 11
  console.log('end, b=', b.value)
}
watch(b, () => {
  hello.value.f1()
}, {
  flush: 'post'
})
</script>

<template>
  <div>
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <p>I am inside p</p>
    <HelloWorld msg="Vite + Vue" :any-obj="b" ref="hello"/>
    <div>{{ version }} <button @click="f">Click me</button></div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
p {
  color: v-bind('theme.color');
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
