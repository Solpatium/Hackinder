'use strict';

import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

import { connect } from 'react-redux';
import { atSwipe } from '../actions/appActions'

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => {
          let self = this.props;

          Alert.alert(
            'Details',
            'Name:' + self.title +
            '\nLocalization: ' + self.localization +
            '\nDescription: ' + self.description,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          )
        }}>
          <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
          <Text style={styles.text}>{this.props.title}</Text>
          <Text style={styles.details}>{this.props.localization}</Text>

        </TouchableOpacity>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more projects</Text>
      </View>
    )
  }
}



class SwipeIdeas extends React.Component {
  static navigationOptions = {
    title: 'Swipe!',
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false
    }
  }

  urlWrapper = (endpoint, params) => {
    const rootContext = 'http://192.168.83.101:3001';
    const loginPart = `?login=${this.props.user.login}&password=${this.props.user.password}`;
    let url = rootContext + endpoint + loginPart + params;
    console.log(url)
    return url
  }

  componentDidMount = () => {
    let self = this;
    fetch(this.urlWrapper('/ideas', '')).then(response => {
      if (response.ok) {
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
          response.json().then(obj => {
            console.log(JSON.stringify(obj['ideas']))
            let items = [];
            let len = obj['ideas'].length;
            let ideas = obj['ideas'];
            for (var i = 0; i < len; i++) {
              let o = ideas[i];
              let item = {
                id: o['_id'],
                title: o['title'],
                description: o['description'],
                image: o['image'],
                localization: o['localization']
              }
              items.push(item)
              console.log(item.id + ' ' + item.title)
            }
            self.setState({ cards: items })
            console.log(items.length);
            resolve(obj);
          }, error => {
            console.log('err while fetching')
          });
        }
      }
    });

  }

  handleYup = (card) => {
    // console.log("yes" + card['id'] + card['title']);
    let json = JSON.stringify({
      login: this.props.user.login,
      projectId: card['id'],
      answer: true
    }
    );

    this.props.atSwipe(card)

    fetch(this.urlWrapper(`/swipe/${card['id']}/right/`, ''), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    });

  }

  handleNope = (card) => {
    console.log("nope");
    let json = JSON.stringify({
      login: this.props.user.login,
      projectId: card['id'],
      answer: false
    }
    );
    console.log(json);

    fetch(this.urlWrapper(`/swipe/${card['id']}/left/`, ''), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    });
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
    }
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        yupText={"Super"}
        nopeText={"Nope"}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: {
    login: state.login,
    password: state.password
  }
})

export default connect(mapStateToProps, { atSwipe })(SwipeIdeas)

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    padding: 5
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  details: {
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});