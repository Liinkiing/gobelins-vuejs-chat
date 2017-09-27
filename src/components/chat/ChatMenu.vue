<template>
  <div class="chat-menu">
    <button @click="disconnectUser" class="button">Se déconnecter</button>
    <theme-switcher></theme-switcher>
  </div>
</template>

<script>
  import Toggle from "../ui/Toggle.vue";
  import ThemeSwitcher from "../ui/ThemeSwitcher.vue";
  import appStore from '../../stores/AppStore'

  export default {
    components: {
      ThemeSwitcher
    },
    name: 'chatMenu',
    methods: {
      disconnectUser() {
        appStore.disconnectUser();
      }
    }
  }
</script>

<style lang="scss">
  .chat-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>
