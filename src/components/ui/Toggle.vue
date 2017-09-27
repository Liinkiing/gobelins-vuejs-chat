<template>
  <div class="toggle">
    <label class="switch">
      <input type="checkbox" v-model="checked">
      <span class="slider"></span>
    </label>
  </div>
</template>

<script>

  import appStore from '../../stores/AppStore';
  import {EventBus} from "../../main";

  export default {
    name: 'toggle',
    data() {
      return {
        checked: this.initialValue !== null ? this.initialValue : true
      }
    },
    props: {
      initialValue: {initialValue: Boolean, default: null}
    },
    created() {

    },
    watch: {
      checked(newVal) {
        this.$emit("toggled", newVal)
      }
    }
  }

</script>

<style lang="scss">

  @import "../../styles/utils/palette";
  @import "../../styles/utils/variables";

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 20px;
  }

  .switch input {display:none;}

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: $transition_duration;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: $transition_duration;
  }

  input:checked + .slider {
    background-color: $blue;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
