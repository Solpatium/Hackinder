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
                        'Szczegóły',
                        'Nazwa:' + self.title +
                        '\nLokalizacja: '+self.localization+
                        '\nOpis: '+ self.description,
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

const cards = [
    {name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
    {name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
    {name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
    {name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
    {name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
    {name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
    {name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
    {name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
    {name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const cards2 = [
    {id: '1', name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
    {id: '1', name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
    {id: '1', name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
    {id: '1', name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]
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
                {id: '1',title:"Super projekt1", description: "super super ", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Kraków"},
                {id: '2',title:"Super projekt2", description: "super projekt ", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Warsaw"},
                {id: '3',title:"Super projekt3", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Wrocław"},
                {id: '4',title:"Super projekt4", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Lublin"},
                {id: '5',title:"Super projekt5", description: "super super", image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif', localization: "Kraków"}
            ],
            outOfCards: false

        }
    }

    componentDidMount(){
            let url = rootContext+'/ideas?login=przemek&password=ala';
            fetch(url).then(response => {
                if (response.ok) {
                    const contentType = response.headers.get('Content-Type') || '';

                    if (contentType.includes('application/json')) {
                        response.json().then(obj => {
                            //console.log(obj.ideas.length);
                            console.log(JSON.stringify(obj['ideas']))
                            //console.clear()
                            let items = [];
                            let len = obj['ideas'].length;
                            console.log(len);
                            let ideas = obj['ideas'];
                            for (var i = 0; i < len ; i++){

                                console.log(i)
                                let o = ideas[i];
                                JSON.stringify(o)
                                console.log(JSON.stringify({id: o['_id'],
                                    title:o['title'],
                                    description: o['description'],
                                    image: o['image'],
                                    localization: o['localization']}))
                                items.push(
                                    {id: o['_id'],
                                    title:o['title'],
                                    description: o['description'],
                                    image: o['image'],
                                    localization: o['localization']})

                            }

                            console.log(items.length);
                            //console.log(JSON.stringify(obj));

                            resolve(obj);
                        }, error => {
                           // reject(new ResponseError('Invalid JSON: ' + error.message));
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

            if (!this.state.outOfCards) {
                console.log(`Adding ${cards2.length} more cards`)

                this.setState({
                    cards: this.state.cards.concat(cards2),
                    outOfCards: true
                })
            }

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
                nopeText={"Nieee"}
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
})