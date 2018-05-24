import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onClick()}>
        <View style={styles.container}>
          <Image
            source={this.props.imagePath}
            style={styles.cardImage}
          />
          <Text style={styles.cardName}>{this.props.name}</Text>
          <Text style={styles.cardSubText}>{this.props.subText}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#2c3e50',
  },
  cardName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  cardSubText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
})
