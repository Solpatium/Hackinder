const io = require('socket.io-client');
const serverUrl = 'http://192.168.83.101:4000';

export class Chat {
    static instance = null;
    constructor(user, password, onConnect, onFail) {
        Chat.instance = this;
        this.socket = io(serverUrl, { transports: ['websocket'] });
        this.loggedIn = false;
        this.ideaId = null;
        this.onMessages = null;  
        this.user= user;
        // this.socket.on('connect', () => {
            this.emit('login', {login: user, password: password});
            // console.log('connected')
        // });

        this.socket.on('response', (r) => {
            if( r == 'ok' ) {
                console.log('loggedIn')
                this.loggedIn = true;
                onConnect();
            } else {
                onFail();
            }
        });

        this.socket.on('newMessages', this.handleNewMessages)
        console.log('created chat instance')
    }

    enterIdeaRoom = (ideaId, onMessages) => {
        this.onMessages = onMessages;
        this.ideaId = ideaId;
        console.log('b4 '+ ideaId);
        this.emit('getMessages', {ideaId: ideaId});
    }

    sendMessage = (msg) => {
        this.emit('addMessage', {idea: this.ideaId, content: msg});
    }

    handleNewMessages = (messages) => {
        if( this.onMessages ) {
            console.log("RECEIVED MESSAGES " + messages);
            const parsedMessages = JSON.parse(messages).messages;
            this.onMessages(parsedMessages);
        }
    }

    emit = (name, obj) => {
        console.log('emmiting obj ' + JSON.stringify(obj));
        this.socket.emit(name, JSON.stringify(obj));
        console.log('emitted obj');
    }
}