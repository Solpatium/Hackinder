'use strict';

import React from 'react';
import {StyleSheet,ScrollView, Text, View, Alert, TouchableOpacity, Image, Dimensions} from 'react-native';
import GridView from 'react-native-super-grid';


const rootContext = 'http://192.168.83.101:3001';
const loginPart = '?login=przemek&password=ala';

const urlWrapper = function (endpoint, params) {
    let url = rootContext+endpoint+loginPart+params;
    console.log(url)
    return url
}

let loremIpsum  = 'Lorem ipsum dolor sit amet, eu iudico ancillae assueverit nec. In sit solum eirmod accusata, cu dicat voluptua patrioque eam, eum singulis adipisci suavitate no. Ex tibique ancillae detracto mea. His dicant lucilius cu. Sit ea alii adolescens, vix ut possim facilisi. Esse veritus antiopam ea per, sed deleniti ullamcorper ad';

export default class Matches extends React.Component{

    constructor(props) {
        super(props);
        this.ideas = [];

        this.ideas.push({
            id: 1,
            title: 'Zróbcie mi taką appkę plis',
            description: loremIpsum,
            image: 'https://picsum.photos/303',
            localization: 'Cracow'
        });
        this.ideas.push({
            id: 2,
            title:'Marketing bla bla',
            description: loremIpsum,
            image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
            localization: 'Warsaw'
        });
        this.ideas.push({
            id: 3,
            title: 'Matched 3',
            description: loremIpsum,
            image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
            localization: 'Cracow'
        });
        this.ideas.push({
            id: 4,
            title: 'Matched 4',
            description: loremIpsum,
            image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
            localization: 'Cracow'
        });
        this.ideas.push({
            id: 5,
            title: 'Matched 5',
            description: loremIpsum,
            image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
            localization: 'Cracow'
        });
        this.state = {
            matched: this.ideas
        }
    }

    componentDidMount(){

    }


    render() {
        let ideaList = this.state.matched.map((data) => {
           return ( { name: data.title , loc: data.localization, color: '#367abc', image: data.image, onClick: () => this.pushMessages(data.id) })
        });
        return (

            <ScrollView style={styles.container}>

                <GridView
                    itemDimension={Dimensions.get('window').width - 75}
                    items={ideaList}
                    style={styles.gridView}
                    renderItem={item => (
                        <TouchableOpacity onPress={ () => item.onClick()}>
                            <View style={[styles.itemContainer, { flex: 1, flexDirection: 'row' , justifyContent: 'space-between', backgroundColor: item.color }]}>
                                    <Image
                                    style={{width: 120, height: 120}}
                                    source={{uri: item.image}}
                                    />
                                    <View style={[styles.itemContainer, { flex: 1, flexDirection: 'column' , justifyContent: 'space-between', backgroundColor: item.color }]}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={[styles.itemName, {fontSize: 15}]}>{item.loc}</Text>
                                    </View>


                            </View>
                        </TouchableOpacity>
                    )}
                />






            </ScrollView>
        );
    }

    pushMessages(id) {
        console.log('clicked = '+id)
    }
}
const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        height: 150,

    },
    itemName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        alignItems: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 20,
        color: '#fff',
    },
    container: {

    }
});
