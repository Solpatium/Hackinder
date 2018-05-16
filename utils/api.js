import {serverUrl} from '../config';
import { sha256 } from 'js-sha256';

export class API {
    static instance = null;

    static createInstance(user, password) {
        Chat.instance = new API(user, sha256(password));
        return Chat.instance;
    }

    static getInstance() {
        return Chat.instance;
    }

    constructor(user, passwordHash) {
        this.user = user;
        this.hash = passwordHash;
        this.token = null;
    }

    login() {
        return fetch(`${serverUrl}/login/${this.user}/${this.hash}`)
        .then((response) => {
            if(response.ok) {
              const json = response.json();
              this.token = json.token;
              return json;
            }
            throw new Error('Wrong credentials')
        })
    }

    getIdeas() {

    }

    getMatches() {

    }

    addIdea() {

    }
}