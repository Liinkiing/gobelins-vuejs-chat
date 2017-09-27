<template>
  <div id="app">
    <wizz v-if="state.wizzing"></wizz>
    <router-view></router-view>
  </div>
</template>

<script>

  import store from './stores/AppStore';
  import chatStore from './stores/ChatStore';
  import {socket, EventBus} from "./main";
  import User from "./models/User";
  import Wizz from "./components/wizz/Wizz.vue";

  import wizzSound from "./assets/sounds/wizz.mp3";
  import messageSound from "./assets/sounds/sound_received.mp3";
  import Message from "./models/Message";

  export default {
    components: {Wizz},
    name: 'app',
    data() {
      return {
        state: store.state
      }
    },
    created() {
      if(!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
      }
      let theme = localStorage.getItem("theme");
      console.log(theme);
      store.setTheme(theme);
      EventBus.$on('user-connected', this.onUserConnected);
      EventBus.$on('user-disconnected', this.onUserDisconnected);
      EventBus.$on('send.wizz', this.onWizzSend);
      EventBus.$on('message.received', this.onMessageReceived);
      socket.on('connect', () => {
        console.log("Connecté au serveur WebSocket");
      });
      socket.on('wizz', this.onWizzReceived);
      socket.on('user connected', (user) => {
        console.log("connexion de " + user.id);
        store.setLoggedUserId(user.id);
      });
      socket.on('getUsers', (users) => {
        store.setUsers(users);
      });
      socket.on('user joined', (users) => {
        console.log("connexion d'un nouvel utilisateur", users);
        let final = users.filter(u => {
          if (this.state.user === null) return true; else return u.id !== store.state.user.id
        });
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
      onMessageReceived(message) {
        console.log(message, "envoyé de ", message.author);
        new Audio(messageSound).play();
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
      },
      onWizzSend() {
        store.setCanWizz(false);
        store.setWizzing(true);
        setTimeout(function() {store.setCanWizz(true); store.setWizzing(false)}.bind(this), 1000);
        socket.emit("wizz", this.state.user);
      },
      onWizzReceived(user) {
        if(this.state.user) {
          let bot = new User("Pipelette");
          chatStore.addMessage(new Message(`${user.username} a envoyé un putain de wizz de fdp`, bot, true));
          store.setWizzing(true);
          new Audio(wizzSound).play();
          console.log("wizz reçu");
        }
      }
    }
  }
</script>

<style>

</style>
