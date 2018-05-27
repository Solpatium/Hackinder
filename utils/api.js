import { sha256 } from 'js-sha256';
import { serverUrl } from '../config';
import { Chat } from './chat';

export default class API {
  static instance = null;

  static createInstance(user, password) {
    API.instance = new API(user, sha256(password));
    return API.instance;
  }

  static getInstance() {
    return API.instance;
  }

  constructor(user, passwordHash) {
    this.user = user;
    this.hash = passwordHash;
    this.token = null;
    this.chat = null;
  }

  getChat() {
    return this.chat;
  }

  apiFetch(path, type, body = '') {
    return fetch(`http://${serverUrl}/${path}`, {
      method: type,
      headers: {
        Accept: 'application/json',
        Authorization: `${this.user}:${this.token}`,
        'Content-Type': 'application/json',
      },
      body,
    })
  }

  login() {
    return fetch(`http://${serverUrl}/login/${this.user}/${this.hash}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Wrong credentials')
      })
      .then((json) => {
        const token = json.token;
        this.token = token;
        this.chat = new Chat(this.user, token)
        this.chat.connect(() => console.log('Connected to chat'), () => console.log('Unable to connect to chat'))
        return json;
      })
  }

  getIdeas() {
    return this.apiFetch('ideas', 'GET')
      .then((response) => {
        if (response.ok) {
          const contentType = response.headers.get('Content-Type') || '';

          if (contentType.includes('application/json')) {
            return response.json();
          }
          throw new Error('Something went wrong')
        }
      })
      .then(obj => obj.ideas.map(o => ({
        id: o._id,
        title: o.title,
        description: o.description,
        image: o.image,
        localization: o.localization,
      })));
  }

  getMatches() {
    return this.apiFetch('matches', 'GET')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
  }

  addIdea(requestData) {
    return this.apiFetch('ideas', 'POST', JSON.stringify(requestData))
  }

  addSwipe(ideaId, direction) {
    return this.apiFetch(`swipe/${ideaId}/${direction}`, 'POST')
  }
}
