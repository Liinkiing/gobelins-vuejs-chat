<template>
  <div>
    <h1>Je suis la page de login</h1>
    <form @submit.prevent="connectUser">
      <label>Nom d'utilisateur
        <input type="text" v-model="username" placeholder="Votre nom d'utilisateur">
        <button type="submit">Valider</button>
      </label>
    </form>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import User from "../../models/User";

  import {EventBus} from '../../main'

  export default {
    name: 'login',
    data() {
      return {
        state: store.state,
        username: ""
      }
    },
    methods: {
      connectUser() {
        let user = new User(this.username);
        store.connectUser(user);
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
