<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  import store from './stores/AppStore';

  export default {
    name: 'app',
    data() {
      return {
        state: store.state
      }
    },
    methods: {

    }
  }
</script>

<style>

</style>
