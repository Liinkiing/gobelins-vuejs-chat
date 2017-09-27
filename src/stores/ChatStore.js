import {EventBus} from "../main";
import Message from "../models/Message";

class ChatStore {

  constructor() {
    this.state = {
      messages: []
    }
  }

  addMessage(message, author) {
    let m = new Message(message, author);
    this.state.messages.push(m);
    EventBus.$emit('message.send', m);
  }

  pushMessage(message) {
    this.state.messages.push(message);
  }

}

export default new ChatStore();
