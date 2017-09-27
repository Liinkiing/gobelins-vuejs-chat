class Message {

  constructor(body, author) {
    this.body = body;
    this.createdAt = Date.now();
    this.author = author;
  }

}

export default Message;
