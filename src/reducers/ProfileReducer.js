import { GET_NAME } from '../actions/types'

export default (state={name: "", image: ""}, action) => {
    switch(action.type) {
        case GET_NAME:
            return { ...state, name: action.payload.name, image: action.payload.image } 
        default:
            return state
    }

}