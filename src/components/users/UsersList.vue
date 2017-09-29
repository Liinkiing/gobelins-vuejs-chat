<template>
  <div class="users-list">
    <ul>
      <li v-if="appStore.state.user" :class="`current-user user-color-${appStore.state.user.color}`"><span
        class="circle">&nbsp;</span>{{ appStore.state.user.username }} (vous)
      </li>
      <transition-group name="blur" mode="out-in">
        <li :class="`user-color-${user.color}`" v-for="user in users" :key="user.id"><span class="circle">&nbsp;</span>{{ user.username
          }}
        </li>
      </transition-group>

    </ul>
  </div>
</template>

<script>

  import appStore from '../../stores/AppStore';

  import {socket} from '../../main';

  export default {
    name: 'usersList',
    components: {},
    data() {
      return {
        appStore
      }
    },
    props: {
      users: {type: Array, required: true}
    }
  }
</script>

<style lang="scss">
  @import "../../styles/utils/palette";
  @import "../../styles/utils/variables";

  @each $color in $colorsName {
    li.user-color-#{$color} {
      color: #{map_get($colors, $color)};
      & span.circle:before {
        background: #{map_get($colors, $color)} !important;
      }
    }
  }

  .users-list {
    transition: all $transition_duration;
    padding: 20px 60px 20px 40px;
    margin: 50px;
    border-radius: $border_radius;
    background: $shark_dark_grey;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      & li {
        margin: 10px;
        span.circle {
          position: relative;
          &:before {
            content: "";
            position: absolute;
            top: 2px;
            left: -25px;
            width: 15px;
            height: 15px;
            border-radius: 100%;
            background: $white;
          }
        }
      }
    }
  }

  body.theme-light .users-list {
    background: $white;
  }
</style>
