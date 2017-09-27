<template>
  <div class="chat">
    <h2>Chat</h2>
    <ul>
      <li v-for="message in messages">
        <p class="body">{{ message.body }}</p>
        <div class="author">{{ message.author.username }}</div>
        <div class="timestamp">{{ message.createdAt }}</div>
      </li>
    </ul>
    <chat-form></chat-form>
  </div>
</template>

<script>
  import ChatForm from "./ChatForm.vue";
  import chatStore from '../../stores/ChatStore';
  import {EventBus, socket} from "../../main";

  export default {
    components: {ChatForm},
    name: 'Chat',
    props: {
      messages: {type: Array, required: true}
    },
    created() {
      console.log("chat init");
        EventBus.$on('message.send', (message) => {
          console.log("message", message, "envoyé depuis le client");
          socket.emit('new message', message);
        });
        socket.on('new message', (message) => {
          console.log(message, "envoyé de ", message.author);
          chatStore.pushMessage(message);
        })
    },
    beforeDestroy() {
      console.log("detruit");
      socket.off('new message');
      EventBus.$off('message.send');
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>
