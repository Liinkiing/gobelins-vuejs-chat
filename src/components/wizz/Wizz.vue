<template>
  <div class="display: none;"></div>
</template>

<style lang="scss">

  @import "../../styles/utils/_palette.scss";

  .headShake-dark {
    animation-name: headShakeDark;
  }

  .headShake-light {
    animation-name: headShakeLight;

  }

  @keyframes headShakeDark {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      background: $shark_grey
    }

    6.5% {
      -webkit-transform: translateX(-12px) rotateY(-19deg);
      transform: translateX(-12px) rotateY(-19deg);
      background: $pale_green;

    }

    18.5% {
      -webkit-transform: translateX(10px) rotateY(14deg);
      transform: translateX(10px) rotateY(14deg);
      background: $blue;

    }

    31.5% {
      -webkit-transform: translateX(-6px) rotateY(-10deg);
      transform: translateX(-6px) rotateY(-10deg);
      background: $violet;

    }

    43.5% {
      -webkit-transform: translateX(4px) rotateY(6deg);
      transform: translateX(4px) rotateY(6deg);
      background: $yellow;

    }

    60% {
      -webkit-transform: translateX(4px) rotateY(6deg);
      transform: translateX(4px) rotateY(6deg);
      background: $rose;
    }

    80% {
      background: $red;
    }

    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      background: $shark_grey
    }
  }
  @keyframes headShakeLight {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      background: $whitesmoke
    }

    6.5% {
      -webkit-transform: translateX(-12px) rotateY(-19deg);
      transform: translateX(-12px) rotateY(-19deg);
      background: $pale_green;

    }

    18.5% {
      -webkit-transform: translateX(10px) rotateY(14deg);
      transform: translateX(10px) rotateY(14deg);
      background: $blue;

    }

    31.5% {
      -webkit-transform: translateX(-6px) rotateY(-10deg);
      transform: translateX(-6px) rotateY(-10deg);
      background: $violet;

    }

    43.5% {
      -webkit-transform: translateX(4px) rotateY(6deg);
      transform: translateX(4px) rotateY(6deg);
      background: $yellow;

    }

    60% {
      -webkit-transform: translateX(4px) rotateY(6deg);
      transform: translateX(4px) rotateY(6deg);
      background: $rose;
    }

    80% {
      background: $red;
    }

    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      background: $whitesmoke
    }
  }
</style>

<script>

  import appStore from '../../stores/AppStore';

  export default {
    name: 'wizz',
    mounted() {
      let body = document.body;
      body.classList.add("animated", "headShake-" + appStore.state.theme);
      body.addEventListener("animationend", (e) => this.onAnimationEnd(e));
      body.addEventListener("webkitAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("mozAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("MSAnimationEnd", (e) => this.onAnimationEnd(e));
      body.addEventListener("oanimationend", (e) => this.onAnimationEnd(e));
    },
    methods: {
      onAnimationEnd(e) {
        e.target.classList.remove("animated", "headShake", "headShake-light", "headShake-dark");
        appStore.setWizzing(false);
      }
    }
  }
</script>
