import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import LoginPanel from '../components/LoginPanel'
import CardList from '../components/CardList'

export default createStackNavigator ({
  Login: LoginPanel,
  Home: CardList,
})