<template>
  <div>
    <form @submit.prevent="send">
      <input type="text" placeholder="Votre message..." v-model="message">
      <button class="button">Envoyer</button>
      <button class="button" :disabled="!appState.canWizz" type="button" @click="sendWizz">Wizz</button>
      <transition name="fade">
        <span v-if="error" class="error">{{ error }}</span>
      </transition>
    </form>
  </div>
</template>

<script>
  import Message from "../../models/Message";

  import appStore from '../../stores/AppStore';
  import chatStore from '../../stores/ChatStore';

  import johncena from '../../assets/sounds/johncena.mp3';
  import ahSound from '../../assets/sounds/ah.mp3';

  import {socket, EventBus} from '../../main';

  export default {
    name: 'ChatForm',
    data() {
      return {
        error: null,
        appState: appStore.state,
        message: ""
      }
    },
    created() {
      console.log("créé");
      socket.on('command issued', (data) => {
        if(data.command === "PLAY_AUDIO") {
          if(data.payload === "johncena") {
            new Audio(johncena).play();
          } else if(data.payload === "ah") {
            new Audio(ahSound).play();
          }
        }
        this.message = "";
      })
    },
    methods: {
      send() {
        if (this.message === "") {
          if(!this.error) this.removeError();
          this.error = "Le message ne peut être vide";
        } else if (this.message.startsWith("/")) {
            socket.emit('command', this.message);
        } else {
          chatStore.addMessage(new Message(this.message, this.appState.user));
          this.message = "";
        }
      },
      removeError() {
        setTimeout(function () {
          console.log("message");
          this.error = null;
        }.bind(this), 3000);
      },
      sendWizz() {
        EventBus.$emit("send.wizz");
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  span.error {
    color: red;
  }
</style>
