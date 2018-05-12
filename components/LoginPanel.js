import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { atLogin } from '../actions/appActions'


class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: "maks",
      password: "ala",
      errorMessage: "",
    }
  }

  handleSubmit = () => {
    fetch(`http://192.168.83.101:3001/login?login=${this.state.login}&password=${this.state.password}`, '')
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      throw new Error('Wrong credentials')
    })
    .then((response) => {
      const { navigate } = this.props.navigation;
      this.populateStore(response)
      navigate('App')
    })
    .catch((error) => {
      this.handleWrongCredentials(error)
    })
  }

  handleWrongCredentials = (error) => {
    this.setState({
      errorMessage: error.message
    })
  }

  populateStore = (data) => {
    console.log(data)
    this.props.atLogin({
      password: this.state.password,
      login: this.state.login,
      matches: data.matches,
      ideas: data.ideas
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({ login: text })} 
          value={this.state.login} />
        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password} />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
        <Text style={styles.errorMsg}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { atLogin })(LoginPanel)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da', 
    height: 40,
  },
  errMsg: {
  }
});