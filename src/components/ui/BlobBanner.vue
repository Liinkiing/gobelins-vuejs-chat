<template>
  <div class="blob-banner">
    <blob :moving="true" :style="style()" v-for="i in blobs" :key="i" :color="randomColor()" :size="size()"></blob>
  </div>
</template>

<script>
  import anime from 'animejs';
  import Blob from "./Blob.vue";

  import random from 'lodash.random';

  export default {
    components: {Blob},
    name: 'blobBanner',
    data() {
      return {

      }
    },
    computed: {
      blobs() {
        let blobs = [];
        for(let i = 0; i < this.blobsCount; i++) {
          blobs.push(i);
        }
        return blobs;
      }
    },
    methods: {
      randomColor() {
        let colors = ["red", "rose", "light_green", "violet", "orange", "pale_red", "cyan", "dark_green",
          "pale_green", "pale_yellow", "yellow", "blue"];
        return colors[Math.floor(Math.random()*colors.length)];
      },
      size() {
        let sizes = [60,70,80,90,100,110,120,130,140,150,160];
        return sizes[Math.floor(Math.random()*sizes.length)];
      },
      style() {
        let final = {position: "relative"};
        if(random(0,100) <= 50) {
          final.left = random(5,80) + "px";
        } else {
          final.right = random(5,80) + "px";
        }
        return final
      }
    },
    props: {
      blobsCount: {type: Number, default: 20},
    }
  }
</script>

<style lang="scss">
  .blob-banner {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 10%;
    animation: blobAnimation 160s infinite;
  }

  @keyframes blobAnimation {
    0% {
      top: 0;
    }
    50% {
      top: -100vh;
    }
    100% {
      top: 0;
    }
  }
</style>
