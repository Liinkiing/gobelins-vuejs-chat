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
        EventBus.$once('message.send', (message) => {
          socket.emit('new message', message);
        });
        socket.on('new message', (message) => {
          chatStore.pushMessage(message);
        })
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">

</style>
