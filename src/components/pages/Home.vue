<template>
  <div>
    <h1>Je suis la homepage</h1>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';


  export default {
    name: 'homepage',
    data() {
      return {
        state: store.state
      }
    },
    created() {
      if(!this.state.user) {
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss">

</style>
