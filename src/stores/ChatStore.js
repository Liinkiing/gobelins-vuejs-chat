import {EventBus} from "../main";
import Message from "../models/Message";

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

  pushMessage(message) {
    this.state.messages.push(message);
  }

}

export default new ChatStore();
