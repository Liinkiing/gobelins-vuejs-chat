<template>
  <div id="app">
    <button v-if="state.user" @click="disconnectUser">Se déconnecter</button>
    <router-view></router-view>
  </div>
</template>

<script>

  import store from './stores/AppStore';
  import {EventBus} from "./main";
  import User from "./models/User";

  export default {
    name: 'app',
    data() {
      return {
        state: store.state
      }
    },
    created() {
      EventBus.$on('user-connected', this.onUserConnected);
      EventBus.$on('user-disconnected', this.onUserDisconnected);
      if(localStorage.getItem("user")) {
        let user = User.fromJSON(localStorage.getItem("user"));
        if(user) store.connectUser(user);
      }
    },
    methods: {
      disconnectUser() {
        store.disconnectUser();
      },

      onUserDisconnected(user) {
        console.log(user.username + " s'est déconnecté");
        this.$router.push({name: 'login'})
      },
      onUserConnected(user) {
        console.log(user.username + " s'est connecté");
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style>

</style>
