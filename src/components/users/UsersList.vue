<template>
  <div class="users-list">
    <ul>
      <li class="current-user user-color-red"><span class="circle">&nbsp;</span>{{ currentUser.username }} (vous)</li>
      <li :class="`user-color-${randomColor}`" v-for="user in users"><span class="circle">&nbsp;</span>{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>

  import appStore from '../../stores/AppStore';

  export default {
    name: 'usersList',
    components: {

    },
    data() {
      return {
        currentUser: appStore.state.user
      }
    },
    computed: {
        randomColor() {
          let colors = ["red", "rose", "light_green", "violet", "orange", "pale_red", "cyan", "dark_green",
            "pale_green", "pale_yellow", "yellow", "blue"];
          return colors[Math.floor(Math.random()*colors.length)];
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
            top:2px;
            left:-25px;
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
