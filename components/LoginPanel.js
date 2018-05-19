import React from 'react'
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Chat } from '../utils/chat'
import API from '../utils/api'

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'przemek',
      password: null,
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
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
        <View style={styles.itemContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={text => this.setState({ login: text })}
            value={this.state.login}
            placeholder="login"
          />
          <TextInput
            secureTextEntry
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholder="password"
          />

          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.button}>
              <Text>LOGIN</Text>
            </View>

          </TouchableOpacity>
        </View >
        <Text style={styles.errMsg}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#9fc7d1',
    height: '100%',
  },
  input: {
    height: 40,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 175,
    backgroundColor: 'rgba(255, 84, 107, 0.8)',

  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
  itemContainer: {
    borderRadius: 30,
    marginTop: 20,
    justifyContent: 'center',
    height: 200,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

  },
  errMsg: {},
});
