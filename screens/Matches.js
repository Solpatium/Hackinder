import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';

import { Chat } from '../utils/chat';
import API from '../utils/api';


export default class Matches extends React.Component {
  static navigationOptions = {
    title: 'Your matches',
    headerStyle: { backgroundColor: '#00b3b3' }
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
    const chat = API.getInstance().getChat();
    navigate('ChatComponent', { ideaId: id, chat });
  }

  render() {
    const ideaList = this.state.matches.map(data => ({
      name: data.title, loc: data.localization, image: data.image, onClick: () => this.pushMessages(data._id),
    }));
    return (
      <View>
        <ScrollView style={styles.container}>
          <GridView
            itemDimension={Dimensions.get('window').width - 75}
            items={ideaList}
            style={styles.gridView}
            renderItem={item => (
              <TouchableOpacity onPress={() => item.onClick()}>
                <View style={[styles.itemContainer, {
                flex: 1, flexDirection: 'row', justifyContent: 'space-between'
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
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    backgroundColor: '#009393',
    alignItems: 'flex-start',

  },
  itemName: {
    fontSize: 20,
    paddingLeft: 10,
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
    flex: 1,
    width: 100,
    height: 100,
    // resizeMode: 'contain',
  },
  container: {
    height: '100%',
    backgroundColor: '#008080',
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
