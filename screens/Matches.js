'use strict';

import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';

import { connect } from 'react-redux';


class Matches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }

  render() {
    let ideaList = this.state.matches.map((data) => {
      return ({ name: data.title, loc: data.localization, color: '#367abc', image: data.image, onClick: () => this.pushMessages(data._id) })
    });
    return (

      <ScrollView style={styles.container}>

        <GridView
          itemDimension={Dimensions.get('window').width - 75}
          items={ideaList}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity onPress={() => item.onClick()}>
              <View style={[styles.itemContainer, { flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: item.color }]}>
                <Image
                  style={{ width: 120, height: 120 }}
                  source={{ uri: item.image }}
                />
                <View style={[styles.itemContainer, { flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: item.color }]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={[styles.itemName, { fontSize: 15 }]}>{item.loc}</Text>
                </View>


              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }

  componentDidMount = () => {
    fetch(`http://192.168.83.101:3001/login?login=${this.props.user.login}&password=${this.props.user.password}`, '')
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Wrong credentials')
      })
      .then((response) => {
        this.setState({
          matches: [...response.matches, ...response.ideas]
        })
      })
      .catch((error) => {
        Alert.alert(
          '',
          'Error: ' + error.message,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      })
  }

  pushMessages(id) {
    console.log('clicked = ' + id)
  }
}

const mapStateToProps = state => ({
  user: {
    login: state.login,
    password: state.password
  }
})

export default connect(mapStateToProps)(Matches)

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
