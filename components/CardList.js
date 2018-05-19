import React from 'react'
import GridView from 'react-native-super-grid'
import {
  View,
  Text,
  StyleSheet,
  Dimensions, Image, ScrollView,
} from 'react-native';
import Card from './Card'

export default class CardList extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  pushNavigate = (path) => {
    const { navigate } = this.props.navigation;
    navigate(path)
  }

  render() {
    const items = [
      {
        name: 'CREATE',
        subText: 'Create new idea',
        onClick: () => this.pushNavigate('Create'),
        color: '#ff546b',
        imagePath: require('../assets/images/light-bulb.png'),
      },
      {
        name: 'EXPLORE',
        subText: 'Search through already created ideas',
        color: '#0fd0b7',
        onClick: () => this.pushNavigate('SwipeIdeas'),
        imagePath: require('../assets/images/MB__search.png'),
      },
      {
        name: 'TEAM UP',
        subText: 'Lorem ipsum',
        color: '#0bd5de',
        onClick: () => this.pushNavigate('Matches'),
        imagePath: require('../assets/images/messages.png'),
      },
    ];

    return (
      <View>
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
        <ScrollView style={styles.container}>
          <GridView
            itemDimension={Dimensions.get('window').width - 75}
            items={items}
            style={styles.gridView}
            renderItem={item => (
              <Card
                color={item.color}
                name={item.name}
                subText={item.subText}
                imagePath={item.imagePath}
                onClick={item.onClick}
              />
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
    backgroundColor: 'transparent',
  },
  gridView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
});
