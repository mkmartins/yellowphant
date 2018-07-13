import React from 'react'
import Routes from './src/Routes.js'
import reducers from './src/reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk' //for middleware
import firebase from 'firebase' //Setupfirebase as app backend

export default class App extends React.Component {

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA0gqSlkdwIV7r4AIt6C_v5D5STnKcFUVM",
      authDomain: "yellowphant-1363e.firebaseapp.com",
      databaseURL: "https://yellowphant-1363e.firebaseio.com",
      projectId: "yellowphant-1363e",
      storageBucket: "yellowphant-1363e.appspot.com",
      messagingSenderId: "368365012100"
    }
    firebase.initializeApp(config)
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}