import io from 'socket.io-client';
import {serverUrl} from '../config';

export class Chat {
    static instance = null;

    static createInstance(user, password, onConnect, onFail) {
        Chat.instance = new Chat(user, password, onConnect, onFail);
    }

    static getInstance() {
        return Chat.instance;
    }

    // TODO: add connect(onConnect, onFail) method, change constructor to constructor(user, password) 
    constructor(user, password, onConnect, onFail) {
        this.socket = io(serverUrl, { transports: ['websocket'] });
        this.loggedIn = false;
        this.ideaId = null;
        this.onMessages = null;  
        this.user= user;
        this.emit('login', {login: user, password: password});

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