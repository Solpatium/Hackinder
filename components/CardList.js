import React from 'react'
import GridView from 'react-native-super-grid'
import {
  View,
  Text,
  StyleSheet,
  Dimensions, Image, ScrollView, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class CardList extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: '#00b3b3' }
  };

  pushNavigate = (path) => {
    const { navigate } = this.props.navigation;
    navigate(path)
  }

  render() {
    const items = [
      {
        name: 'CREATE',
        icon: 'md-create',
        onClick: () => this.pushNavigate('Create'),
      },
      {
        name: 'EXPLORE',
        icon: 'md-bulb',
        onClick: () => this.pushNavigate('SwipeIdeas'),
      },
      {
        name: 'TEAM UP',
        icon: 'md-people',
        onClick: () => this.pushNavigate('Matches'),
      },
    ];

    return (
      <View>
        <ScrollView style={styles.container}>
          <GridView
            itemDimension={Dimensions.get('window').width - 75}
            items={items}
            style={styles.gridView}
            renderItem={item => (
              <TouchableOpacity onPress={item.onClick} style={styles.button}>
                <Ionicons name={item.icon} size={55} color="white" style={{padding: 10}} />
                <Text style={styles.option}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#008080',
  },
  gridView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
    color: '#ffffff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#009393',//'#f8856c', //'#f8da87', //'#ff9f58',
  },
  option: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  }
});