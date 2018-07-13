import React from 'react'
import Profile from './components/Profile'
import DealsList from './components/DealsList'
import DealDetail from './components/DealDetail'
import Breath from './components/Breath'
import Intro from './components/Intro'
import Splash from './components/Splash'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import { Scene, Router, Stack } from 'react-native-router-flux'
import LOGO from '../assets/logo.png'
import { userLoggedIn } from './actions'
import { connect } from 'react-redux'
import { Dimensions } from  'react-native'

const {width} = Dimensions.get('window') 

class Routes extends React.Component {

  componentWillMount() {
    this.props.userLoggedIn()
  }

  _headerTitle = () => {
    return width > 320 ? "The Yellowphant Club" : "Yellowphant Club"
  }
  
  _routes() {
    return(
      <Router>
        <Stack key="root" panHandlers={null} duration={0}>
            <Scene key='splash' 
              component={Splash} 
              hideNavBar={true}
            />
            <Scene key='intro' 
              component={Intro} 
              hideNavBar={true}
            />
            <Scene key='signUp' 
              component={SignUp} 
              hideNavBar={true}
            />
            <Scene key='logIn' 
              component={LogIn} 
              hideNavBar={true}
            />
            <Scene key='profile' 
              component={Profile} 
              hideNavBar={true}
            />
            <Scene key='breath' 
              component={Breath} 
              title={this._headerTitle}
              navigationBarStyle={{backgroundColor:'#f3959f'}}
            />
            <Scene key='dealsList' 
              component={DealsList} 
              title={this._headerTitle}
              // navigationBarTitleImageStyle={{ height: 50, width: 50 }} 
              // navigationBarTitleImage={require('../assets/logo.png')} 
              navigationBarStyle={{backgroundColor:'#f3959f', height:60}}
            />
            <Scene key='dealDetail' 
              component={DealDetail} 
              title={this._headerTitle}
              // navigationBarTitleImageStyle={{ height: 50, width: 50 }} 
              // navigationBarTitleImage={require('../assets/logo.png')} 
              navigationBarStyle={{backgroundColor:'#f3959f', height:60}}
            />
        </Stack>
      </Router>
    )
  }

  render() {
    return (
      this._routes()
    );
  }
}

export default connect(null,{ userLoggedIn })(Routes)