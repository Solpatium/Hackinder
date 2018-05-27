import {
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation'
import LoginPanel from '../components/LoginPanel';
import CardList from '../components/CardList';
import Matches from '../screens/Matches';
import SwipeIdeas from '../screens/SwipeIdeas';
import AddProject from '../screens/AddProject';
import ChatComponent from '../components/ChatComponent';


const AppStack = createStackNavigator({
  Home: CardList,
  Matches,
  Create: AddProject,
  SwipeIdeas,
  ChatComponent,
}, {
  header: {
      style: { backgroundColor: '#336060' },
      titleStyle: { color: '#336060' },
  }
});

const AuthStack = createSwitchNavigator({
  Login: { screen: LoginPanel, header: { visible: false } },
})

export default createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
    headerStyle: { backgroundColor: '#336060' },
    headerTitleStyle: { color: '#336060' },
  },
)
