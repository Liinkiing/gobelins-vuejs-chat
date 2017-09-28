import {EventBus} from "../main";
import Message from "../models/Message";
import User from '../models/User'


import appStore from '../stores/AppStore'

class ChatStore {

  constructor() {
    this.state = {
      messages: []
    }
  }

  addMessage(body, isBot = false) {
    console.log(body);
    if(!isBot) EventBus.$emit('message.send', body);
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
