<template>
  <div class="page page-login">
    <blob-banner :blobs-count="30"></blob-banner>

    <form @submit.prevent="connectUser">
      <label>Personnalise ton interface :</label>
      <theme-switcher></theme-switcher>
      <label for="username">Nom d'utilisateur</label>
      <input class="login-input" type="text" id="username" v-model="username" placeholder="Votre nom d'utilisateur">
      <span class="separator">&nbsp;</span>
      <button :disabled="username === ''" class="button" type="submit">Valider</button>
    </form>
  </div>
</template>

<script>

  import store from '../../stores/AppStore';
  import User from "../../models/User";

  import {EventBus} from '../../main'
  import Toggle from "../ui/Toggle.vue";
  import ThemeSwitcher from "../ui/ThemeSwitcher.vue";
  import Blob from "../ui/Blob.vue";
  import BlobBanner from "../ui/BlobBanner.vue";

  export default {
    components: {
      BlobBanner,
      Blob,
      ThemeSwitcher
    },
    name: 'login',
    data() {
      return {
        state: store.state,
        username: "",
      }
    },
    methods: {
      connectUser() {
        if (this.username === "") return;
        if (this.userIsConnected(this.username)) {
          alert(this.username + " est déjà utilisé ! ");
          return;
        }
        ;
        let user = new User(this.username);
        store.connectUser(user);
      },
      userIsConnected(username) {
        return store.state.users.filter(u => u.username.toLowerCase() === username.toLowerCase()).length > 0;
      },
    },
    created() {
      if (this.state.user) {
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .page-login {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & form {
      width: 50%;
      min-width: 350px;
      & label {
        display: block;
        &.switch {
          margin-left: 0;
        }
      }
      & input {
        display: block;
        font-size: 4rem;
        font-weight: 700;
      }
    }
  }
</style>
