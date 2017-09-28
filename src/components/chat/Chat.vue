<template>
  <div class="chat">
    <ul class="chat-room" ref="chat" >
      <chat-message v-for="message in messages" :message="message" :key="message.createdAt"></chat-message>
    </ul>
    <span v-if="state.someoneWriting" class="is-writing">Quelqu'un est entrain d'écrire...</span>
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
      EventBus.$on('message.send', (body) => {
        console.log("message", body, "envoyé depuis le client");
        this.$nextTick(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        });
        socket.emit('new message', body);
      });
      EventBus.$on('typing', (user) => {
        console.log(user, "en train d'écrire");
        socket.emit('typing', user);
      });
      EventBus.$on('stop typing', (user) => {
        console.log(user, "a arrété d'écrire");
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
