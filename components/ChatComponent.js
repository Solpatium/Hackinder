import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatComponent extends React.Component {
  static navigationOptions = {
    title: 'Chat',
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chat: this.props.navigation.getParam('chat', null),
      ideaId: this.props.navigation.getParam('ideaId', null),

    }

    this.state.chat.enterIdeaRoom(this.state.ideaId, (messages) => {
      const avatars = {
        przemek: 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/19875548_1468980203147785_1772605932263700416_n.jpg?_nc_cat=0&oh=c58a441388db13df231a357aa9707cf6&oe=5B856C1F',
        kuba: 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/11231263_691402487672061_4880172418953831559_n.jpg?_nc_cat=0&oh=4825253887fb81e461cece869f3542e5&oe=5B95127C',
        maks: 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/22154232_1864314636916584_7039985103093748374_n.jpg?_nc_cat=0&oh=a2b4ca449c58dd2d7e6667630100f627&oe=5B91B6D1',
      }
      const appendMessages = messages.map((message, index) => ({
        _id: message.date,
        text: message.content,
        createdAt: new Date(message.date),
        user: {
          _id: message.sender,
          name: message.sender,
          avatar: avatars[message.sender],
        },
      }));
      const allMessages = [...this.state.messages, ...appendMessages];
      this.setState({
        messages: allMessages.sort((a, b) => b._id - a._id),
      })
    });
  }

  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
    messages.forEach(m => this.state.chat.sendMessage(m.text));
  }

  render() {
    return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.chat.user,
          }}
        />
    )
  }
}

