<template>
  <div id="app">
    <button v-if="state.user" @click="disconnectUser">Se déconnecter</button>
    <router-view></router-view>
    <ul>
      <li v-for="user in state.users">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>

  import store from './stores/AppStore';
  import {EventBus} from "./main";
  import User from "./models/User";

  import {socket} from './main';

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
      socket.on('connect', () => {
          console.log("Connecté au serveur WebSocket");
      });
      socket.on('user connected', (user) => {
        console.log(user, "s'est connecté");
        store.addUser(user);
      });
      socket.on('user disconnected', (user) => {
        console.log("déco");
        store.removeUser(user);
      });
      if (localStorage.getItem("user")) {
        let user = User.fromJSON(localStorage.getItem("user"));
        if (user) store.connectUser(user);
      }
    },
    methods: {
      disconnectUser() {
        store.disconnectUser();
      },

      onUserDisconnected(user) {
        console.log(user.username + " s'est déconnecté");
        socket.emit('user disconnected', user);
        this.$router.push({name: 'login'})
      },
      onUserConnected(user) {
//        console.log(user.username + " s'est connecté");
        socket.emit('user connected', user);
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style>

</style>
