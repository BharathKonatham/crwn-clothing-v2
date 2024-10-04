import { call,takeLatest,all,put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess,signInFailure, signUpSuccess,signUpFailure, signOutFailure, signOutSuccess } from "./user.action";

import { getCurrentUser,createUserDocumentFromAuth, signInWithGooglePopup,signUserWithEmailAndPassword,createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth,addtionalDetails){
    try{
        const userSnapshot = yield call(createUserDocumentFromAuth,userAuth,addtionalDetails)
        console.log(userSnapshot)
        console.log(userSnapshot.data())
        yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailure(error))
    }
}


export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser)
       
        if(!userAuth) return
        yield call(getSnapShotFromUserAuth,userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,isUserAuthenticated )
    
}
export function* googleSignIn(){
    try{
        const {user} = yield call(signInWithGooglePopup)
        yield call(getSnapShotFromUserAuth,user)
    }
    catch(error){
        yield put(signInFailure(error))
    }
}
    

export function* onGoogleSignInStart(){
    
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,googleSignIn)
}

export function* emailSignIn({payload:{email,password}}){
    try{
        const {user} = yield call(signUserWithEmailAndPassword,email,password)
        yield call(getSnapShotFromUserAuth,user)
    }catch(error){
        signInFailure(error)
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START,emailSignIn)
}

export function* signInAfterSignUp({payload:{user,addtionalDetails}}){
    //console.log(addtionalDetails)
    yield call(getSnapShotFromUserAuth,user,addtionalDetails)
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS,signInAfterSignUp)
}


export function* emailSignUp({payload:{email,password,displayName}}){
           
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword,email,password)
        yield put(signUpSuccess(user,{displayName}))
        
    }catch(error){
        yield put(signUpFailure(error))
    }
}
export function* onSignUpStart(){
    

    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START,emailSignUp)
}

export function* signOut(){
    console.log('sigining out')
    try{
        yield call(signOutUser)
        yield put(signOutSuccess())

    }
    catch(error){
        yield put(signOutFailure(error))
    }
    
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,signOut)
}
export function* userSaga(){
    console.log('user saga')
    yield all([ call(onCheckUserSession),
                call(onGoogleSignInStart),
                call(onEmailSignInStart), 
                call(onSignUpStart),
                call(onSignUpSuccess),
                call(onSignOutStart)
            ])
}