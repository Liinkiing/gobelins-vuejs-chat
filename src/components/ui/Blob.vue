<template>
  <div class="blob" id="morphing">
    <svg :width="size" :height="size" :class="'color-' + color" xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 110 106">
      <g fill="currentColor">
        <path class="pathmorth"
              :d="initialPath"/>
      </g>
    </svg>
  </div>
</template>

<script>
  import anime from 'animejs';

  import shuffle from 'lodash.shuffle';
  import random from 'lodash.random';

  export default {
    name: 'blob',
    props: {
      color: {type: String, default: "red"},
      moving: {type: Boolean, default: false},
      size: {type: Number, default: 100}
    },
    computed: {
      initialPath() {
        return this.d[0].value
      }
    },
    created() {
      let durations = [4000,7000,10000,150000];
      this.duration = durations[Math.floor(Math.random()*durations.length)];
      this.d = shuffle([
        {value: "M72.4,44.32a34,34,0,0,0-55-35.74A22.49,22.49,0,0,0,9.36,48.76a34,34,0,0,0,34.49,19A18.48,18.48,0,1,0,72.4,44.32Z"},
        {value: "M72.4,44.32a34,34,0,0,0-45-35.74A22.49,22.49,0,0,0,9.36,48.76a34,34,0,0,0,21.49,19A18.48,18.48,0,1,0,72.4,44.32Z"},
        {value: "M72.4,44.32a34,34,0,0,0-45-35.74A22.49,22.49,0,0,0,9.36,48.76a34,34,0,0,0,15.49,19A18.48,18.48,0,1,0,72.4,44.32Z"},
        {value: "M72.4,44.32a34,34,0,0,0-55-25.74A22.49,22.49,0,0,0,9.36,48.76a34,34,0,0,0,10.49,19A18.48,18.48,0,1,0,72.4,44.32Z"}
      ]);
    },
    mounted() {
//      let morphing = anime({
//        targets: '#morphing .pathmorth',
//        d: this.d,
//        easing: 'easeInElastic',
//        direction: 'alternate',
//        duration: this.duration,
//        loop: true
//      }).play();
      if(this.moving) {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/utils/palette";
  @import "../../styles/utils/variables";

  @each $color in $colorsName {
    svg.color-#{$color} {
      color: #{map_get($colors, $color)};
      fill: currentColor;
    }
  }

  .blob {
    transition: all 10s;
  }

</style>
