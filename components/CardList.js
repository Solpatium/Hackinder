import React from 'react'
import GridView from 'react-native-super-grid'
import Card from './Card'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

export default class CardList extends React.Component {
  pushNavigate = (path) => {
    const { navigate } = this.props.navigation;
    navigate(path)
  }

  render() {
    const items = [
      { name: 'IDEAS', subText: 'Search through already created ideas',
       onClick: () => this.pushNavigate('Login'),
        imagePath: require('../assets/images/card-ideas.jpeg') },
      { name: 'CREATE', subText: 'Create new idea', onClick: () => this.pushNavigate('Settings'),
        imagePath: require('../assets/images/card-create.jpeg') },
      { name: 'YOUR MATCHES', subText: 'Lorem ipsum', onClick: () => this.pushNavigate('Settings'),
        imagePath: require('../assets/images/card-match.jpeg') },
    ];

    return (
      <GridView
        itemDimension={Dimensions.get('window').width - 75}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <Card name={item.name} subText={item.subText} imagePath={item.imagePath} onClick={item.onClick} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  }
});