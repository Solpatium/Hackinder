import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Image, StyleSheet, View } from 'react-native';

export class ChatComponent extends React.Component {
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
  }

  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
    messages.forEach(m => this.state.chat.sendMessage(m.text));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.chat.user,
          }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#9fc7d1',
  },
  input: {
    height: 40,
  },
  button: {
    height: 150,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
  errMsg: {
  },
});
