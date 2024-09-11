import { initializeApp } from "firebase/app";

import { getAuth,signInWithRedirect,GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"; 

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWPvAJIZdZ2NeMhFrSSzve5L3Oc64WmvM",
    authDomain: "crwn-clothing-db-d5dae.firebaseapp.com",
    projectId: "crwn-clothing-db-d5dae",
    storageBucket: "crwn-clothing-db-d5dae.appspot.com",
    messagingSenderId: "20651848677",
    appId: "1:20651848677:web:7eb300f66b8b1db6d5350c"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters(
        {
            prompt:'select_account'
        }
    );

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth)=>{

    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)


    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log('error creating user',err.message)
        }
    }
  }

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth,email,password)
  } 

  export const signUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;
    return signInWithEmailAndPassword(auth,email,password)
  }