'use strict';

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Button
} from 'react-native';


const rootContext = 'http://192.168.83.101:3001';
const loginPart = '?login=przemek&password=ala';

const urlWrapper = function (endpoint, params) {
    let url = rootContext + endpoint + loginPart + params;
    console.log(url)
    return url
}

export default class AddProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            image: 'https://picsum.photos/303',
            localization: 'Cracow'
        }
    }

    render() {
        return (
            <View style={[styles.container, {justifyContent: 'space-between'}]}>

                <Text style={styles.itemName}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(title) => this.setState({title: title})}
                    value={this.state.title}
                    placeholder={'Name your idea'}
                />
                <Text style={styles.itemName}>Description</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={20}
                    style={styles.textInput}
                    onChangeText={(desc) => this.setState({description: desc})}
                    value={this.state.description}
                    placeholder={'Tell something about your idea'}
                />

                <Button
                    onPress={this.handleAdd}
                    title="Register idea!"
                    color="#375f64"
                />
            </View>)

    }

    handleAdd = () => {
        console.log(JSON.stringify(this.state));
        fetch(urlWrapper(`/ideas/`, ''), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        }).then((response) => {
            if (response.ok) {
                Alert.alert(
                    '',
                    'Added new project',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            } else {
                Alert.alert(
                    '',
                    'Error: ' + JSON.stringify(response),
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }
        });

        this.setState({
            title: null,
            description: null,
        })

    }
}
const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    textInput: {borderColor: 'gray', borderWidth: 1},
    container: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,


    },
    itemName: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
        alignItems: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 20,
        color: '#fff',
    },

});