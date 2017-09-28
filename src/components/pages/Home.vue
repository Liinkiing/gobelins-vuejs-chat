<template>
  <div class="page page-home">
    <users-list :users="state.users"></users-list>
    <chat :messages="chatState.messages"></chat>
    <chat-menu></chat-menu>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import {EventBus} from "../../main";
  import UsersList from "../users/UsersList.vue";
  import {socket} from '../../main';
  import Chat from "../chat/Chat.vue";

  import chatStore from '../../stores/ChatStore';
  import ChatMenu from "../chat/ChatMenu.vue";

  export default {
    components: {
      ChatMenu,
      Chat,
      UsersList},
    name: 'homepage',
    data() {
      return {
        state: store.state,
        chatState: chatStore.state
      }
    },
    created() {
      if(!this.state.user) {
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss">
  .page-home {
    & .users-list {
      flex: 1;
      max-width: 300px;
    }
    & .chat {
      padding: 60px 0;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    & .chat-menu {
      max-width: 300px;
      flex: 1;
    }
  }
</style>


