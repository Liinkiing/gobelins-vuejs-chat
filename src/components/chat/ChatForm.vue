<template>
  <div>
    <form @submit.prevent="send">
      <input type="text" placeholder="Votre message..." v-model="message">
      <button>Envoyer</button>
    </form>
  </div>
</template>

<script>
  import Message from "../../models/Message";

  import appStore from '../../stores/AppStore';
  import chatStore from '../../stores/ChatStore';

  import {socket, EventBus} from '../../main';

  export default {
    name: 'ChatForm',
    data() {
      return {
        appState: appStore.state,
        message: ""
      }
    },
    methods: {
      send() {
        chatStore.addMessage(this.message, appStore.state.user);
        this.message = "";
      }
    }
  }
</script>

<style lang="scss">

</style>
