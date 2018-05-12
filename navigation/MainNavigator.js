import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import LoginPanel from '../components/LoginPanel'
import CardList from '../components/CardList'
import Matches from '../screens/Matches'
import SwipeIdeas from '../screens/SwipeIdeas'
import AddProject from '../screens/AddProject';
import {ChatComponent} from '../components/ChatComponent'


const AppStack = createStackNavigator({
  Home: CardList,
  Matches,
  Create: AddProject,
  SwipeIdeas,
  ChatComponent
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