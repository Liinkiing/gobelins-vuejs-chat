import {EventBus} from "../main";
import Message from "../models/Message";
import User from '../models/User'



class ChatStore {

  constructor() {
    this.state = {
      messages: []
    }
  }

  addMessage(message) {
    console.log(message);
    this.state.messages.push(message);
    if(!message.isBot) EventBus.$emit('message.send', message);
  }

  sendMessageWithBot(text) {
    let bot = new User("Pipelette");
    this.addMessage(new Message(text, bot, true));
  }

  pushMessage(message) {
    this.state.messages.push(message);
  }

}

export default new ChatStore();
