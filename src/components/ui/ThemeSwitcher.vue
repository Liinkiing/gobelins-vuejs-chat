<template>
    <div class="theme-switcher">
        <toggle :initialValue="getThemeSwitchValue" @toggled="onToggle"></toggle>
    </div>
</template>

<script>
    import Toggle from "./Toggle.vue";
    import appStore from '../../stores/AppStore';

    export default {
      components: {Toggle},
      name: 'themeSwitcher',
      methods: {
        onToggle() {
          appStore.toggleTheme();
        }
      },
      computed: {
        getThemeSwitchValue() {
          return appStore.state.theme === "dark";
        }
      }
    }
</script>

<style lang="scss">

</style>
