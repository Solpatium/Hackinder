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
      name: data.title, loc: data.localization, color: 'rgba(255, 255, 255, 0.15)', image: data.image, onClick: () => this.pushMessages(data._id),
    }));
    return (
      <View>
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
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
                    style={styles.cardImage}
                    source={{ uri: item.image }}
                  />
                  <View style={[styles.itemName, { flex: 1, flexDirection: 'column', justifyContent: 'space-between' }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>


                </View>
              </TouchableOpacity>
          )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
  },
  itemContainer: {
    borderRadius: 30,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    backgroundColor: 'rgba(11, 213, 222, 0.2)',

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
    backgroundColor: 'transparent',
  },
  cardImage: {
    borderRadius: 10,
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  container: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
