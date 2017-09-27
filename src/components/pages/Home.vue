<template>
  <div>
    <h1>Je suis la homepage</h1>
    <!--<users-list users=""></users-list>-->
    <chat :messages="chatState.messages"></chat>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import {EventBus} from "../../main";
  import UsersList from "../users/UsersList.vue";
  import {socket} from '../../main';
  import Chat from "../chat/Chat.vue";

  import chatStore from '../../stores/ChatStore';

  export default {
    components: {
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

</style>
