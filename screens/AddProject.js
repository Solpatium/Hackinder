import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  Button,
} from 'react-native';
import API from '../utils/api'

export default class AddProject extends React.Component {
  static navigationOptions = {
    title: 'Add idea',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      image: 'https://picsum.photos/303',
      localization: 'Cracow',
    }
  }

  handleAdd = () => {
    API.getInstance().addIdea(this.state)
      .then((response) => {
        if (response.ok) {
          Alert.alert(
            '',
            'Added new project',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert(
            '',
            `Error: ${JSON.stringify(response)}`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }
      });

    this.setState({
      title: null,
      description: null,
    })
  }

  render() {
    return (
      <View style={[styles.container, { justifyContent: 'space-between' }]}>
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />

        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>Title</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.input, { height: 40 }]}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Name your idea"
          />
        </View>


        <View style={[styles.itemContainer, { height: 360 }]}>
          <Text style={styles.itemName}>Description</Text>
          <TextInput
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={20}
            style={[styles.input, { height: 300 }]}
            onChangeText={desc => this.setState({ description: desc })}
            value={this.state.description}
            placeholder="Tell something about your idea"
          />

        </View>

        <Button
          onPress={this.handleAdd}
          title="Register idea!"
          color="rgba(255, 84, 107, 0.8)"
        />
      </View>)
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 0,
    left: 5,
    right: 5,
  },
  input: {
    height: 36,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',

  },
  itemContainer: {
    borderRadius: 30,
    marginTop: 20,
    height: 90,
    backgroundColor: 'rgba(255, 84, 107, 0.1)',

  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
});
