import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

// Form
// const Form = t.form.Form;

// // Form model
// const User = t.struct({
//   email: t.String,
//   password: t.String,
// });

export default class LoginPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: "",
      password: ""
    }
  }

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {/* <Form ref={c => this.loginform = c} type={User} /> */}
        <TextInput style={styles.input} onChangeText={(text) => this.setState({ login: text })} />
        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({ password: text })} />
        <Button
          title="Login"
          onPress={this.handleSubmit}
        />
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
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da', 
    height: 40,
  }
});