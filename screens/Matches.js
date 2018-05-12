'use strict';

import React from 'react';
import { StyleSheet, ScrollView, Text, View, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';

import { connect } from 'react-redux';


class Matches extends React.Component {

  render() {
    let ideaList = this.props.matches.map((data) => {
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

  pushMessages(id) {
    console.log('clicked = ' + id)
  }
}

const mapStateToProps = state => ({
  matches: state.matches
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
