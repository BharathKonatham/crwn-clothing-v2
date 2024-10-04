import { USER_ACTION_TYPES } from './user.types'
import { createAction } from '../../utils/reducer.util'


export const setCurrentUser = (user)=> createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)


// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
// GOOGLE_SIGN_IN_START : 'user/GOOGLE_SIGN_IN_START',
// EMAIL_SIGNIN_START: 'user/EMAIL_SIGNIN_START' ,
// SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
// SIGN_IN_FAILUER: 'user/SIGN_IN_FAILURE'

//user session action to check the current logged in user
export const checkUserSession = ()=> {return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)}

//googe sign in and email sign in starter actions
export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,)

export const emailSignInStart = (email,password)=> createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START,{email,password})

//sign in only actions
export const signInSuccess = (user)=> createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS,user)

export const signInFailure = (error)=> createAction(USER_ACTION_TYPES.SIGN_IN_FAILUER,error)


//signup with email actions
export const signUpStart = (email,password,displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START,{email,password,displayName})

export const signUpSuccess = (user,addtionalDetails)=> createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user,addtionalDetails})

export const signUpFailure = (error)=> createAction(USER_ACTION_TYPES.SIGN_UP_FAILUER,error)

//sign out actions
export const signOutStart = ()=> createAction(USER_ACTION_TYPES.SIGN_OUT_START)
export const signOutSuccess = ()=> createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
export const signOutFailure = (error)=> createAction(USER_ACTION_TYPES.SIGN_OUT_FAILUER,error)