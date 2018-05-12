const io = require('socket.io-client');
const serverUrl = '192.168.83.101:4000';

class Chat {
    static instance = null;
    constructor(user, password, onConnect, onFail) {
        Chat.instance = this;
        this.socket = io(serverUrl, { transports: ['websocket'] });
        this.loggedIn = false;
        this.ideaId = null;
        this.onMessages = null;  
        this.user = user;
        this.socket.on('connect', () => {
            this.emit('login', {login: user, password: password});
        });

        this.socket.on('response', (r) => {
            if( r == 'ok' ) {
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
        this.emit('getMessages', {ideaId: ideaId});
    }

    sendMessage = (msg) => {
        this.emit('addMessage', {idea: this.ideaId, content: msg});
    }

    handleNewMessages = (messages) => {
        if( this.onMessages ) {
            console.log("RECEIVED MESSAGES " + messages);
            const parsedMessages = JSON.parse(messages);
            this.onMessages(parsedMessages);
        }
    }

    emit = (name, obj) => {
        this.socket.emit(name, JSON.stringify(obj));
    }
}