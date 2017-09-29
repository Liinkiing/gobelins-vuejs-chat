<template>
  <div class="blob" id="morphing">
    <svg :width="size" :height="size" :class="'color-' + color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <svg id="morph-example" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
          <path :id="`blobFirst${id}`" class="bg-lime" d="M367.2,165.7c-4.7-5-8.4-10.9-10.6-17.3c-0.5-1.4-2.2-10.2-2.6-11.5c-6.5-19.7-16.8-31.6-19.3-35.2
	c-9.1-12.8-33-37.7-37.3-41.7c-15.1-13.6-23.5-17.6-43.2-24.6c-6-2.1-14.5-3-20.1-3.5c-13.1-1-29.7,0.4-43.7,2.4
	c-48.9,7.1-81.4,15.3-109,27.6C71.2,66.5,55,76.8,44.9,87c-17.9,18.2-28.8,46.3-33.4,57.4c-6,14.7-7.9,30.8-9.2,47
	c-1.1,14.2,2.7,43.9,6.5,55.2c4.1,12.2,8.9,25.3,16.1,36.3c13.1,20,24.1,31,43.6,44.4c18.8,12.9,38.8,19.5,60.2,19.7
	c11.4,0.1,32.9-2.3,43.9-1.2c11.3,1.2,20.6,5.4,25.1,8.1c10.8,6.7,36.6,14.8,57.4,15.9c26.5,1.3,53.3-4.4,72.1-15.2
	c19.3-11.1,39.6-28.3,50.9-46.3c12.5-19.9,17.8-39.8,20.5-67.1C402.1,204.2,377.8,176.8,367.2,165.7z"/>
          <path :id="`blobSecond${id}`" style="visibility:hidden" d="M227.7,352.5c4.5-4.3,9.7-7.7,15.6-9.7c1.3-0.4,7.8-1.7,13.7-3.5c17.8-5.4,32.8-16.4,36-18.7c11.4-8.3,32.2-29.4,37.3-35.3
	c12.1-13.9,17-24.1,21-37.1c1.7-5.6,3.7-15.9,4.1-21c0.9-12.1-0.8-39.5-2.2-52.4c-4.7-44.8-6.1-59.3-18.4-84
	c-6.9-13.7-19.1-28.4-28.8-37.1c-24.1-21.7-46.6-22.9-59.3-27.5c-13.4-4.9-32.4-8.9-46.9-7.6c-22.1,2-33,19.7-51.3,29.1
	c-10.3,5.3-20.2,6.8-30,13.4c-18,12.1-32.3,23.4-39.8,40c-12.8,28-12.1,61.4-12.7,72.8c-0.5,10.4-4.8,18.9-7.3,23
	c-6,9.9-13.3,33.6-14.2,52.7c-1.2,24.3,3.9,48.9,13.6,66.1c10,17.7,25.4,36.3,41.5,46.7c17.8,11.5,35.7,16.3,60.2,18.8
	C193.2,384.6,217.7,362.2,227.7,352.5z"/>
        </svg>
    </svg>
  </div>
</template>

<script>
  import KUTE from 'kute.js';
  import 'kute.js/kute-svg';

  import shuffle from 'lodash.shuffle';
  import random from 'lodash.random';

  export default {
    name: 'blob',
    props: {
      color: {type: String, default: "red"},
      moving: {type: Boolean, default: false},
      index: {type: Number, default: null},
      timestamp: {type: Number, default: null},
      size: {type: Number, default: 100}
    },
    computed: {
      id() {
        if(this.index !== null) return this.index;
        if(this.timestamp) return this.timestamp;
        else return "";
      }
    },
    created() {
      let durations = [4000,7000,10000,150000];
      this.duration = durations[Math.floor(Math.random()*durations.length)];
    },
    mounted() {
      if(this.index !== null || this.timestamp) {
        KUTE.to('#blobFirst' + this.id, {path: '#blobSecond' + this.id }, { repeat: Number.POSITIVE_INFINITY, yoyo: true, duration: random(4000,10000), easing: 'linear', morphIndex: 20, morphPrecision: 20 }).start();
      } else {
        KUTE.to('#blobFirst', {path: '#blobSecond'}, { repeat: Number.POSITIVE_INFINITY, yoyo: true, duration: random(4000,10000), easing: 'linear', morphIndex: 20, morphPrecision: 20 }).start();
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
