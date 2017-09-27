<template>
  <div class="chat">
    <h2>Chat</h2>
    <ul class="chat-room">
      <chat-message v-for="message in messages" :message="message" :key="message.createdAt"></chat-message>
    </ul>
    <chat-form></chat-form>
  </div>
</template>

<script>
  import ChatForm from "./ChatForm.vue";
  import chatStore from '../../stores/ChatStore';
  import {EventBus, socket} from "../../main";
  import ChatMessage from "./ChatMessage.vue";

  export default {
    components: {
      ChatMessage,
      ChatForm
    },
    name: 'Chat',
    props: {
      messages: {type: Array, required: true}
    },
    created() {
      console.log("chat init");
      socket.on('command issued', (data) => {
        console.log(data);
        if(data.command === "PLAY_AUDIO") {
//          import audio from '../../assets/sounds/johncena.mp3';
        }
      });
      EventBus.$on('message.send', (message) => {
        console.log("message", message, "envoyé depuis le client");
        socket.emit('new message', message);
      });
      socket.on('new message', (message) => {
        EventBus.$emit("message.received", message);
        chatStore.pushMessage(message);
      })
    },
    beforeDestroy() {
      console.log("detruit");
      socket.off('new message');
      EventBus.$off('message.send');
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">

</style>
