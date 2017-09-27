<template>
  <li class="chat-message">
    <p class="body">{{ message.body }}</p>
    <div class="author">{{ message.author.username }}</div>
    <div class="timestamp">{{ message.createdAt }}</div>
  </li>
</template>

<script>
  export default {
    name: 'chatMessage',
    props: {
      message: {type: Object, required: true}
    },
    data() {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style lang="scss">

</style>
