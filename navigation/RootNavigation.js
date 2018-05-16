import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import MainNavigator from './MainNavigator'

export default class RootNavigation extends React.Component {
  render() {
    return <MainNavigator />;
  }
}
