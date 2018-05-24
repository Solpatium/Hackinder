import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import API from '../utils/api'


function Card(props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {
          const self = props;

          Alert.alert(
            'Details',
            `Name:${self.title}
            \nLocalization: ${self.localization}
            \nDescription: ${self.description}`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }}
      >
        <Image style={styles.thumbnail} source={{ uri: props.image }} />
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.details}>{props.localization}</Text>

      </TouchableOpacity>
    </View>
  )
}


function NoMoreCards(props) {
  return (
    <View style={styles.noMoreCards}>
      <Text>No more projects</Text>
    </View>
  )
}


export default class SwipeIdeas extends React.Component {
  static navigationOptions = {
    title: 'Swipe!',
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
  }

  componentDidMount = () => {
    API.getInstance().getIdeas()
      .then((ideas) => {
        console.log(ideas)
        this.setState({ cards: ideas })
      })
  }

  handleYup = (card) => {
    API.getInstance().addSwipe(card.id, 'right')
  }

  handleNope = (card) => {
    API.getInstance().addSwipe(card.id, 'left')
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    const CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
    }
  }

  render() {
    return (
      <View styles={{ height: '100%' }}>
        <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />
        <ScrollView style={styles.container}>
          <SwipeCards
            cards={this.state.cards}
            containerStyle={styles.cardContainer}
            loop={false}
            renderCard={cardData => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            showYup
            showNope
            yupText="Super"
            nopeText="Nope"
            handleYup={this.handleYup}
            handleNope={this.handleNope}
            cardRemoved={this.cardRemoved.bind(this)}
          />
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'rgba(15, 208, 183, 0.1)',
    borderWidth: 0,
    elevation: 1,
    padding: 0,
  },
  thumbnail: {
    width: 300,
    height: 400,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
  },
  container: {
    height: '100%',
    backgroundColor: 'transparent',

  },
  cardContainer: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
