import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';

import { Chat } from '../utils/chat';
import API from '../utils/api';


export default class Matches extends React.Component {
  static navigationOptions = {
    title: 'Your matches',
  };

  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
  }

  componentDidMount = () => {
    API.getInstance().getMatches()
      .then((response) => {
        if (!response.matches) {
          response.matches = []
        }
        if (!response.ideas) {
          response.ideas = []
        }
        this.setState({
          matches: [...response.matches, ...response.ideas],
        });
      })
      .catch((error) => {
        Alert.alert(
          '',
          `Error: ${error.message}`,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      });
  }

  pushMessages(id) {
    const { navigate } = this.props.navigation;
    navigate('ChatComponent', { ideaId: id, chat: Chat.instance });
  }

  render() {
    const ideaList = this.state.matches.map(data => ({
      name: data.title, loc: data.localization, color: '#367abc', image: data.image, onClick: () => this.pushMessages(data._id),
    }));
    return (

      <ScrollView style={styles.container}>

        <GridView
          itemDimension={Dimensions.get('window').width - 75}
          items={ideaList}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity onPress={() => item.onClick()}>
              <View style={[styles.itemContainer, {
                flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: item.color,
              }]}
              >
                <Image
                  style={{ width: 120, height: 120 }}
                  source={{ uri: item.image }}
                />
                <View style={[styles.itemContainer, {
                  flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: item.color,
                }]}
                >
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={[styles.itemName, { fontSize: 15 }]}>{item.loc}</Text>
                </View>


              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    height: 150,

  },
  itemName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    alignItems: 'center',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  container: {

  },
});
