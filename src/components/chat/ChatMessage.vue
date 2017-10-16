<template>
  <li class="chat-message" :class="[message.size, {'bot-message': message.isBot, 'current-user': message.author.id === appState.user.id}]">
    <blob v-if="!message.isBot" class="blob-chat" :size="size" :color="message.author.color" :timestamp="message.createdAt"></blob>
    <div class="chat-message-content">
      <span v-if="!message.isBot" class="author" :class="`color-${message.author.color}`">{{ message.author.username }} <span class="timestamp">{{ new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</span>
</span>
      <p class="body">{{ message.body }}</p>
    </div>
  </li>
</template>

<script>
  import Blob from "../ui/Blob.vue";
  import chatStore from '../../stores/ChatStore';
  import appStore from '../../stores/AppStore';

  export default {
    components: {Blob},
    name: 'chatMessage',
    props: {
      message: {type: Object, required: true}
    },
    data() {
      return {
        appState: appStore.state
      }
    },
    computed: {
      size() {
        switch(this.message.size) {
          case "small":
            return 0.2;
            break;
          case "medium":
            return 0.5;
            break;
          case "large":
            return 1;
            break;
        }
      }
    }
  }
</script>

<style lang="scss">

  @import "../../styles/utils/variables";
  @import "../../styles/utils/palette";

  li.chat-message {
    list-style: none;
    display: flex;
    margin: 10px 0;
    overflow: hidden;
    align-items: center;
    &:first-of-type {
      margin-top: 60px;
    }
    & .blob-chat {
      width: 200px;
      text-align: center;
    }
    &.bot-message {
      margin: 20px;
      padding: 20px;
      background: transparentize($shark_darker_grey, 0.7);
      border-radius: $border_radius;
    }
    &.current-user {

    },
    & span.author {
      font-size: 1.2rem;
    }
    & span.timestamp {
      font-size: 0.9rem;
      margin-left: 5px;
    }
    & p.body {
      margin: 0;
      max-width: 1000px;
      word-wrap: break-word;
    }
    &.small {
        max-height: 80px;
      & p.body {
        font-size: 1rem;
        line-height: 2rem;
      }
      & .chat-message-content {
        margin-left: -30px;
      }
      & .blob-chat {
        margin-left: -37px;
      }
    }
    &.medium {
        max-height: 180px;
      & p.body {
        font-size: 2rem;
        font-weight: 500;
        line-height:80px;
      }
      & .chat-message-content {
        margin-left: 10px;
      }
      & .blob-chat {
        margin-left: -30px;
      }
    }
    &.large {
        max-height: 280px;
      & p.body {
        font-size: 5rem;
        font-weight: 700;
        line-height: 186px;
      }
      & .blob-chat {
        margin-left: -35px;
      }
      & .chat-message-content {
        margin-left: 100px;
      }
    }
  }
</style>
