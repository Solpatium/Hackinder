
import {GiftedChat} from 'react-native-gifted-chat'
import React from "react";

class ChatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages : []
        }
        props.chat.enterIdeaRoom(props.ideaId, (messages) => {
            const appendMesssages = messages.map((message, index) => {
              return {
                _id: index,
                text: message.content,
                createdAt: new Date(message.date),
                user: {
                  _id: message.sender,
                  name: message.sender,
                  avatar: 'https://placeimg.com/140/140/any'
                }
              };
            });
            this.setState({
                messages: [...this.state.messages, ...appendMesssages]
            })
        });
    }

    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
      messages.forEach(m => this.props.chat.sendMessage(m.text));
    }
  
    render() {
      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.chat.user,
          }}
        />
      )
    }
  }
  
export {ChatComponent};