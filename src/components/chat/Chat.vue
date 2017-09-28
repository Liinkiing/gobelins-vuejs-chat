<template>
  <div class="chat">
    <ul class="chat-room" ref="chat" >
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
    mounted() {
      console.log("chat init");
      EventBus.$on('message.send', (body) => {
        console.log("message", body, "envoyé depuis le client");
        this.$nextTick(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        });
        socket.emit('new message', body);
      });
      socket.on('new message', (message) => {
        EventBus.$emit("message.received", message);
        chatStore.pushMessage(message);
        this.$nextTick(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        });
      });

    },
    beforeDestroy() {
      console.log("detruit");
      socket.off('new message');
      EventBus.$off('message.send');
    },
  }
</script>

<style lang="scss">
  .chat-room {
    max-height: calc(100vh - 280px);
    overflow: auto;
    flex: 1;
  }
</style>
