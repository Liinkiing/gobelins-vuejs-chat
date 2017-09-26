<template>
  <div>
    <h1>Je suis la page de login</h1>
    <form>
      <label>Nom d'utilisateur
        <input type="text" v-model="user" placeholder="Votre nom d'utilisateur">
        <button type="submit">Valider</button>
      </label>
    </form>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';

  export default {
    name: 'login',
    data() {
      return {
        state: store.state,
        user: ""
      }
    },
    created() {
      if(this.state.user) {
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style lang="scss">

</style>
