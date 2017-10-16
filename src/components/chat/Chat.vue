<template>
  <div class="chat">
    <ul class="chat-room" ref="chat">
      <transition-group name="blur" tag="div" style="position: relative;">
        <chat-message v-for="message in messages" :message="message" :key="message.createdAt"></chat-message>
      </transition-group>
    </ul>
    <span v-if="state.someoneWriting" class="is-writing">Quelqu'un est en train d'écrire...</span>
    <chat-form></chat-form>
  </div>
</template>

<script>
  import ChatForm from "./ChatForm.vue";
  import chatStore from '../../stores/ChatStore';
  import {EventBus, socket} from "../../main";
  import anime from 'animejs';
  import ChatMessage from "./ChatMessage.vue";


  export default {
    components: {
      ChatMessage,
      ChatForm
    },
    name: 'Chat',
    data() {
      return {
        state: chatStore.state
      }
    },
    props: {
      messages: {type: Array, required: true}
    },
    mounted() {
      console.log("chat init");
      EventBus.$on('message.send', (body, size = "medium") => {
        console.log("message", body, "envoyé depuis le client de taille " + size);
        socket.emit('new message', body, size);
      });
      EventBus.$on('typing', (user) => {
        socket.emit('typing', user);
      });
      EventBus.$on('stop typing', (user) => {
        socket.emit('stop typing', user);
      });
      socket.on('typing', (user) => {
        chatStore.setSomeoneWriting(true);
      });
      socket.on('stop typing', (user) => {
        chatStore.setSomeoneWriting(false);
      });
      socket.on('new message', (message) => {
        EventBus.$emit("message.received", message);
        chatStore.pushMessage(message);
        this.$nextTick(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        });
      });
      console.log()

    },
    beforeDestroy() {
      console.log("detruit");
      socket.off('new message');
      EventBus.$off('message.send');
    },
  }
</script>

<style lang="scss">

  @import "../../styles/utils/palette";

  .blur-enter-active, .blur-leave-active {
    transition: opacity .5s, filter 0.3s, transform 0.5s;
  }

  .blur-enter, .blur-leave-to {
    transform: scale3d(0.8,0.8,0.8);
    transform-origin: left center;
    opacity: 0;
    filter: blur(10px);
    position: relative;
  }
  .chat-room {
    max-height: calc(100vh - 280px);
    overflow: auto;
    flex: 1;
    padding-left: 0;
    margin: 0;
  }

  body.theme-light span.is-writing {
    color: $shark_dark_grey;
  }
</style>
