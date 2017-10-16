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
      if (!localStorage.getItem("theme")) {
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
        console.log("connexion de ", user);
        store.setLoggedUser(user);
      });
      socket.on('getUsers', (users) => {
        console.log('get users', users);
        store.setUsers(users);
      });
      socket.on('user joined', (data) => {
        console.log("connexion d'un nouvel utilisateur", data.new);
        let final = data.clients.filter(u => {
          if (this.state.user === null) return true; else return u.id !== store.state.user.id
        });
        console.log("liste des utilisateurs", final);
        store.setUsers(final);
      });
      socket.on('user disconnected', (user) => {
        console.log("déco de ", user, user.id);
        chatStore.sendMessageWithBot(`${user.username} s'est déconnecté`);
        this.$nextTick(() => {
          let chat = document.querySelector(".chat-room");
          if (chat) chat.scrollTop = document.querySelector(".chat-room").scrollHeight;
        });
        store.removeUser(user.id);
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
      randomColor() {
        let colors = ["red", "rose", "light_green", "violet", "orange", "pale_red", "cyan", "dark_green",
          "pale_green", "pale_yellow", "yellow", "blue"];
        return colors[Math.floor(Math.random()*colors.length)];
      },
      onMessageReceived(message) {
        console.log(message, "envoyé de ", message.author);
        if(!chatStore.isMessageFromCurrentUser(message)) new Audio(messageSound).play();
      },
      onUserDisconnected(user) {
        console.log("déco client");
        socket.emit('user disconnected', user);
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
        setTimeout(function () {
          store.setCanWizz(true);
          store.setWizzing(false)
        }.bind(this), 1000);
        socket.emit("wizz");
      },
      onWizzReceived(user) {
        if (this.state.user) {
          chatStore.sendMessageWithBot(`${user.username} a envoyé un wizz`);
          store.setWizzing(true);
          new Audio(wizzSound).play();
          this.$nextTick(() => {
            let chat = document.querySelector(".chat-room");
            if (chat) chat.scrollTop = document.querySelector(".chat-room").scrollHeight;
          });
          console.log("wizz reçu");
        }
      }
    }
  }
</script>

<style>

</style>
