import {
    ON_TEXT_CHANGE,
    SIGNUP, 
    LOADING,
    LOGOUT_USER,
    CLEAR_FIELDS
} from '../actions/types'

const INIT = {name: "", email:"", password:"", error:"", loading:false}

export default (state=INIT, action) => {
    switch(action.type) {
        case ON_TEXT_CHANGE:
            return { ...state, [action.payload.field]: action.payload.text, error:""} 
        case LOADING:
            return { ...state, loading:true }   
        case SIGNUP:
            return { ...state, error:action.payload, loading:false }  
        case CLEAR_FIELDS:
            return INIT
        case LOGOUT_USER:
            return INIT
        default:
            return state
    }

}