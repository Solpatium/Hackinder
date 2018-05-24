import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


export default function Card(props) {
  return (
    <TouchableOpacity onPress={() => props.onClick()}>

      <View style={styles.container}>
        <Image
          source={props.imagePath}
          style={styles.cardImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardName}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 165,
    backgroundColor: '#00dede',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 32,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
  },
  cardSubText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#fff',
  },
  cardImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
})
