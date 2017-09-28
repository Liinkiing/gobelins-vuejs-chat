import {EventBus} from "../main";
import Message from "../models/Message";
import User from '../models/User'


import appStore from '../stores/AppStore'

class ChatStore {

  constructor() {
    this.state = {
      messages: [],
      someoneWriting: false,
      messageSize: "medium"
    }
  }

  setFontSize(size) {
    this.state.messageSize = size;
    EventBus.$emit("fontsize.changed", size);
  }

  setSomeoneWriting(value) {
    this.state.someoneWriting = value;
  }

  addMessage(body, isBot = false, size = "medium") {
    console.log(body, size);
    if(!isBot) EventBus.$emit('message.send', body, size);
  }

  sendMessageWithBot(text) {
    let bot = new User("Pipelette");
    this.pushMessage(new Message(text, bot, true), true);
  }

  pushMessage(message) {
    this.state.messages.push(message);
  }

  isMessageFromCurrentUser(message) {
    return appStore.state.user.id === message.author.id;
  }

}

export default new ChatStore();
