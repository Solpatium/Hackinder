'use strict';

import React from 'react';
import {StyleSheet, Text, View, Alert, TouchableOpacity, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => {
                    let self =this.props;

                    Alert.alert(
                        'Details',
                        'Name:' + self.title +
                        '\nLocalization: '+self.localization+
                        '\nDescription: '+ self.description,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                }}>
                    <Image style={styles.thumbnail} source={{uri: this.props.image}} />
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
                <Text>No more cards</Text>
            </View>
        )
    }
}

const userLogin = 'przmek';
const rootContext = 'http://192.168.83.101:3001';
const loginPart = '?login=przemek&password=ala';

const urlWrapper = function (endpoint, params) {
    let url = rootContext+endpoint+loginPart+params;
    console.log(url)
    return url
}
export default class SwipeIdeas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
              /*  {id: '1',title:"Super projekt1", description: "super super ", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Kraków"},
                {id: '2',title:"Super projekt2", description: "super projekt ", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Warsaw"},
                {id: '3',title:"Super projekt3", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Wrocław"},
                {id: '4',title:"Super projekt4", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Lublin"},
                {id: '5',title:"Super projekt5", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Kraków"}
            */
            ],
            outOfCards: false

        }
    }

    componentDidMount(){
            let self = this;
            fetch(urlWrapper('/ideas','')).then(response => {
                if (response.ok) {
                    const contentType = response.headers.get('Content-Type') || '';

                    if (contentType.includes('application/json')) {
                        response.json().then(obj => {
                            console.log(JSON.stringify(obj['ideas']))
                            let items = [];
                            let len = obj['ideas'].length;
                            let ideas = obj['ideas'];
                            for (var i = 0; i < len ; i++){
                                let o = ideas[i];
                                let item =  {id: o['_id'],
                                    title:o['title'],
                                    description: o['description'],
                                    image: o['image'],
                                    localization: o['localization']}
                                items.push(item)
                            }
                            self.setState({cards: items})
                            console.log(items.length);
                            resolve(obj);
                        }, error => {
                           console.log('err while fetching')
                        });
                    }
                }
            });

    }

    handleYup (card) {
        console.log("yes");
       let json = JSON.stringify({
           login: userLogin,
           projectId: card['id'],
           answer:true
           }
       );
       console.log(json);

        fetch(urlWrapper(`/swipe/${card['id']}/right/`, ''), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: json,
        });

    }

    handleNope (card) {
        console.log("nope");
        let json = JSON.stringify({
                login: userLogin,
                projectId: card['id'],
                answer: false
            }
        );
        console.log(json);

        fetch(urlWrapper(`/swipe/${card['id']}/left/`, ''), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: json,
        });
    }

    cardRemoved (index) {
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

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
        elevation: 1,
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