import React from 'react'
import { Text, TextInput, View, Button, StyleSheet } from 'react-native'
import { Chat } from '../utils/chat'
import API from '../utils/api'


export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'maks',
      password: 'ala',
      errorMessage: '',
    }
  }

  handleSubmit = () => {
    API.createInstance(this.state.login, this.state.password)
      .login()
      .then(() => {
        const { navigate } = this.props.navigation;
        Chat.createInstance(this.state.login, this.state.password, () => { console.log('succes'); }, () => { console.log('error'); });
        navigate('App');
      })
      .catch((error) => {
        this.handleWrongCredentials(error);
      });
  }

  handleWrongCredentials = (error) => {
    this.setState({
      errorMessage: error.message,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ login: text })}
          value={this.state.login}
        />
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
        <Text style={styles.errorMsg}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
  },
  errMsg: {
  },
})
