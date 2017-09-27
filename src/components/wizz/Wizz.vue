<template>
  <div class="display: none;"></div>
</template>

<style>

  @keyframes headShake {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      background: hsl(0, 100%, 100%);
    }

    6.5% {
      -webkit-transform: translateX(-12px) rotateY(-19deg);
      transform: translateX(-12px) rotateY(-19deg);
      background: hsl(100, 100%, 50%);

    }

    18.5% {
      -webkit-transform: translateX(10px) rotateY(14deg);
      transform: translateX(10px) rotateY(14deg);
      background: hsl(200, 100%, 50%);

    }

    31.5% {
      -webkit-transform: translateX(-6px) rotateY(-10deg);
      transform: translateX(-6px) rotateY(-10deg);
      background: hsl(300, 100%, 50%);

    }

    43.5% {
      -webkit-transform: translateX(4px) rotateY(6deg);
      transform: translateX(4px) rotateY(6deg);
      background: hsl(56, 100%, 64%);

    }

    50% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
  }
</style>

<script>

  import appStore from '../../stores/AppStore';

  export default {
    name: 'wizz',
    mounted() {
      let body = document.body;
      body.classList.add("animated", "headShake");
      body.addEventListener("animationend", (e) => this.onAnimationEnd(e));
      body.addEventListener("webkitAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("mozAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("MSAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("oanimationend", (e) => this.onAnimationEnd(e));
    },
    methods: {
      onAnimationEnd(e) {
        e.target.classList.remove("animated", "headShake");
        appStore.setWizzing(false);
      }
    }
  }
</script>
