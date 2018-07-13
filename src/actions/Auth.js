import {
    LOADING,
    ON_TEXT_CHANGE,
    SIGNUP,
    LOGIN,
    LOGOUT_USER,
    CLEAR_FIELDS
} from './types.js'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const onTextChange = (text,field) => {
    return{
        payload: {text,field},
        type: ON_TEXT_CHANGE
    }
}

export const userLoggedIn = () => {
    const { currentUser } = firebase.auth()
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.profile()
            } else {
                setTimeout(()=> Actions.intro(), 1000)
            }
        })
    }
}

//USER SIGN UP
export const onSignUpPress = (email,password,name,image) => {
    return (dispatch) => {
        dispatch({type: LOADING})
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (user) =>{ 
            firebase.database().ref(`users/${user.user.uid}/info`).push({name, image})
            .then(()=>{
                dispatch({
                    type: SIGNUP,
                    payload: ""
                }),
                Actions.profile()  
            })
        })
        .catch((error)=>{
            dispatch({
                type: SIGNUP,
                payload: `Authentication Failed. ${error.message}`
            })
        })
    } 
}

//USER LOGIN
export const onLogInPress = (email,password) => {
    return (dispatch) => {
        dispatch({type: LOADING})
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (user) =>{
                dispatch({
                    type: SIGNUP,
                    payload: ""
                }),
                Actions.profile()
            }
        )
        .catch((error)=>{
            dispatch({
                type: SIGNUP,
                payload: `Authentication Failed. ${error.message}`
            })
        })
    }
}
//Clear fields
export const clearFields = () => {
    return {
        type: CLEAR_FIELDS
    }
}

//LOG OUT USER
export const logOut = () => {
    return (dispatch) => {
        firebase.auth().signOut()
        .then(user=> {
            dispatch({ type: LOGOUT_USER })
            Actions.logIn()
        })
    }
}