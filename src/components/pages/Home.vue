<template>
  <div>
    <h1>Je suis la homepage</h1>
    <!--<users-list users=""></users-list>-->
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import {EventBus} from "../../main";
  import UsersList from "../users/UsersList.vue";
  import {socket} from '../../main';


  export default {
    components: {UsersList},
    name: 'homepage',
    data() {
      return {
        state: store.state
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
