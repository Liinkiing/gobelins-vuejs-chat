<template>
  <li class="chat-message" :class="message.size">
    <p class="body">{{ message.body }}</p>
    <div class="author">{{ message.author.username }}</div>
    <div class="timestamp">{{ new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</div>
  </li>
</template>

<script>
  export default {
    name: 'chatMessage',
    props: {
      message: {type: Object, required: true}
    }
  }
</script>

<style lang="scss">
  li.chat-message {
    list-style: none;
  }
</style>
