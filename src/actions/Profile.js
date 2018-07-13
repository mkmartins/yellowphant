import {GET_NAME} from './types'
import firebase from 'firebase'

export const getInfo = () => {
    const {currentUser} = firebase.auth()
    return(dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/info`).on('value',
            (data) => {
                const key = Object.keys(data.val())[0]
                const info = data.val()[key]
                dispatch({
                    type: GET_NAME,
                    payload: info
                })
            }  
        )
    }
}