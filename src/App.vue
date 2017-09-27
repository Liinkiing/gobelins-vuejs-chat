<template>
  <div id="app">
    <button v-if="state.user" @click="disconnectUser">Se déconnecter</button>
    <h1 v-if="state.user">Connecté en tant que {{ state.user.username }}</h1>
    <router-view></router-view>
    <ul>
      <li v-for="user in state.users">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>

  import store from './stores/AppStore';
  import {socket, EventBus} from "./main";
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
      socket.on('connect', () => {
          console.log("Connecté au serveur WebSocket");
      });
      socket.on('user connected', (user) => {
          console.log("connexion de " + user.id);
          store.setLoggedUserId(user.id);
      });
      socket.on('getUsers', (users) => {
        store.setUsers(users);
      });
      socket.on('user joined', (users) => {
        console.log("connexion d'un nouvel utilisateur", users);
          let final = users.filter(u => {if(this.state.user === null) return true; else return u.id !== store.state.user.id});
          store.setUsers(final);
      });
      socket.on('user left', (id) => {
        console.log("déco de " + id);
        store.removeUser(id);
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
        console.log("déco client");
        socket.emit('user disconnected', user);
        socket.emit('user left', user.id);
        this.$router.push({name: 'login'})
      },
      onUserConnected(user) {
        console.log("co client");
        socket.emit('user connected', user);
        socket.emit('user joined', user);
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style>

</style>
