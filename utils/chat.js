import io from 'socket.io-client';
import { chatUrl } from '../config';

export class Chat {
  constructor(user, token) {
    this.socket = io(chatUrl, { transports: ['websocket'] });
    this.loggedIn = false;
    this.ideaId = null;
    this.onMessages = null;
    this.user = user;
    this.token = token;
  }

  connect(onConnect, onFail) {
    this.emit('login', { login: this.user, token: this.token });

    this.socket.on('response', (r) => {
      if (r == 'ok') {
        this.loggedIn = true;
        onConnect();
      } else {
        onFail();
      }
    });

    this.socket.on('newMessages', this.handleNewMessages)
  }

  enterIdeaRoom = (ideaId, onMessages) => {
    this.onMessages = onMessages;
    this.ideaId = ideaId;
    this.emit('getMessages', { ideaId });
  }

  sendMessage = (msg) => {
    this.emit('addMessage', { idea: this.ideaId, content: msg });
  }

  handleNewMessages = (messages) => {
    if (this.onMessages) {
      console.log(`RECEIVED MESSAGES ${messages}`);
      const parsedMessages = JSON.parse(messages).messages;
      this.onMessages(parsedMessages);
    }
  }

  emit = (name, obj) => {
    console.log(`emmiting obj ${JSON.stringify(obj)}`);
    this.socket.emit(name, JSON.stringify(obj));
    console.log('emitted obj');
  }
}
