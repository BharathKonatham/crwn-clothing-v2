
import { USER_ACTION_TYPES } from './user.types'


const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error:null
}

export const userReducer = (state = INITIAL_STATE, action)=>{
    const {type,payload} = action
    switch (type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS: {
            
            return {
                ...state, currentUser:payload,isLoading:false
            }
            
        }
        case USER_ACTION_TYPES.SIGN_UP_FAILUER:
        case USER_ACTION_TYPES.SIGN_OUT_FAILUER:
        case USER_ACTION_TYPES.SIGN_IN_FAILUER: {
            
            return {
                ...state, error:payload,isLoading:false
            }
            
        }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:{
            console.log('updateing sighout')
            return{
                ...state, currentUser: null
            }
        }
        default: 
            return state;
    }
}

