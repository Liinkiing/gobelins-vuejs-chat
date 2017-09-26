<template>
  <div>
    <h1>Je suis la homepage</h1>
    <users-list></users-list>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import {EventBus} from "../../main";
  import UsersList from "../UsersList.vue";


  export default {
    components: {UsersList},
    name: 'homepage',
    props: {
      users: {type: Array, required: true}
    },
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
