<template>
  <div>
    <form @submit.prevent="send">
      <div class="form-group">
        <blob :size="0.5" class="blob-user" :color="appState.user.color"></blob>
        <input class="chat-input" ref="inputMessage" type="text" placeholder="Votre message..." v-model="message">
      </div>
      <div class="form-group">
        <button class="button">Envoyer</button>
        <button class="button" :disabled="!appState.canWizz" type="button" @click="sendWizz">Wizz</button>
        <blob-size-switcher></blob-size-switcher>
        <transition name="fade">
          <span v-if="error" class="error">{{ error }}</span>
        </transition>
      </div>

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
  import debounce from 'lodash.debounce';
  import throttle from 'lodash.throttle';
  import Blob from "../ui/Blob.vue";
  import BlobSizeSwitcher from "../ui/BlobSizeSwitcher.vue";

  export default {
    components: {
      BlobSizeSwitcher,
      Blob},
    name: 'ChatForm',
    data() {
      return {
        error: null,
        appState: appStore.state,
        message: "",
        color: "red",
        chatState: chatStore.state
      }
    },
    created() {
      socket.on('command issued', (data) => {
        if (data.command === "PLAY_AUDIO") {
          if (data.payload === "johncena") {
            new Audio(johncena).play();
          } else if (data.payload === "ah") {
            new Audio(ahSound).play();
          }
        }
        this.message = "";
      })
    },
    mounted() {
      console.log("user", this.user);
      this.$refs.inputMessage.addEventListener('keydown', throttle((e) => {
        if (e.keyCode >= 32 && !e.metaKey && !e.altKey && !e.ctrlKey) {
          EventBus.$emit('typing', appStore.state.user);
        }
      }, 200));
      this.$refs.inputMessage.addEventListener('keyup', debounce((e) => {
        if (e.keyCode >= 32 && !e.metaKey && !e.altKey) {
          EventBus.$emit('stop typing', appStore.state.user);
        }
      }, 200));
    },

    methods: {
      send() {
        if (this.message === "") {
          if (!this.error) this.removeError();
          this.error = "Le message ne peut être vide";
        } else if (this.message.startsWith("/")) {
          socket.emit('command', this.message);
        } else {
          chatStore.addMessage(this.message, false, this.chatState.messageSize);
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

  @import "../../styles/utils/palette";
  @import "../../styles/utils/variables";

  .blob-user {
    margin-left: -40px;
    width: 200px;
    text-align: center;
  }

  input.chat-input {
    background: $white_grey;
    border-radius: $border_radius;
    padding: 20px;
  }

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
