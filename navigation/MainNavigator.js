import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import LoginPanel from '../components/LoginPanel'
import CardList from '../components/CardList'

const AppStack = createStackNavigator({
  Home: CardList,
})
const AuthStack = createStackNavigator({
  Login: LoginPanel,
})

export default createSwitchNavigator ({
  App: AppStack,
  Auth: AuthStack
},
{
  initialRouteName: 'Auth'
})