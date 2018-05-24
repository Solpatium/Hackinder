import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
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

        <Text style={styles.itemName}>Title</Text>
        <TextInput
          style={[styles.textInput, { height: 40 }]}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          placeholder="Name your idea"
        />
        <Text style={styles.itemName}>Description</Text>
        <TextInput
          multiline
          numberOfLines={20}
          style={styles.textInput}
          onChangeText={desc => this.setState({ description: desc })}
          value={this.state.description}
          placeholder="Tell something about your idea"
        />

        <Button
          onPress={this.handleAdd}
          title="Register idea!"
          color="#375f64"
        />
      </View>)
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  textInput: { },
  container: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,


  },
  itemName: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    alignItems: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },

});
