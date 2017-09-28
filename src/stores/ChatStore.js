import {EventBus} from "../main";
import Message from "../models/Message";
import User from '../models/User'



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

}

export default new ChatStore();
