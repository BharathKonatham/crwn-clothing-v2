import { initializeApp } from "firebase/app";

import { 
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"; 

import {
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";
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
  const app = initializeApp(firebaseConfig); //initalizes the fire base

  const googleProvider = new GoogleAuthProvider(); //initalizes the google authentication provider
  googleProvider.setCustomParameters(
        {
            prompt:'select_account' //this is to autinticate via popup methods
                                    // we also have new page navigation (redirect) methods for authentiation
        }
    );

  export const auth = getAuth(); //authentication object provided by firebase
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider) //custom funciton for google authenticaiton
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider) //redirect methods

  export const db = getFirestore() //getting firbase database instance 

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{ //sending the name of the collection and Object to add to DB
    const collectionRef = collection(db, collectionKey); // this is the collection reference object for entering data into that collection
    const batch = writeBatch(db) // batch object that enables us to write data into db
    objectsToAdd.forEach((object)=>{ //iterate over the object to enter them with different docuemnt names
      const docRef = doc(collectionRef,object.title.toLowerCase()) // give collection ref and name of the docuemtn 
      batch.set(docRef,object) // insert the object into that particular document
    })
    await batch.commit() // commit the document write
    console.log('done')
  }

  export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db,'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q) //give snapshot of all the docuements
    const categories = querySnapshot.docs.reduce((acc,docSnapshot)=>{
      const { title ,items} = docSnapshot.data()
      acc[title.toLowerCase()] = items
      return acc
    },{}) //query each different documnet snap shot, gives array of individual documents and we are reducing them into single array bu destructuring them

    return categories;
  }


  //below methods is to insert user data into db 
  export const createUserDocumentFromAuth = async (userAuth)=>{ //userAuth contain user data obtained from authentication 

    if(!userAuth) return; //if user auth is null return 
    const userDocRef = doc(db,'users',userAuth.uid) //give the db instance , colleciton name 'users', user uniqu id for document name

    const userSnapshot = await getDoc(userDocRef) // get the snapshot of perticular docuement of a user


    if(!userSnapshot.exists()){ //if the snap shot exist dont create new one else create new document for the user 
        const {displayName, email} = userAuth //destructure displayname, email from the userAuth object
        const createdAt = new Date() // crate new time stamp for user creation 
        try{
            await setDoc(userDocRef,{ //write details into document, this not a batch insertion
                displayName,
                email,
                createdAt
            })
        }catch(err){ // catch if any error exist
            console.log('error creating user',err.message)
        }
    }
  }

  //below method is to create authentication data using email and password
  export const createAuthUserWithEmailAndPassword = async (email,password)=>{ 
    if(!email || !password) return; //return if email and password are null
    return createUserWithEmailAndPassword(auth,email,password) //else create the authenticaion data for the user
  } 
  //below methods is to sign in user with email and password
  export const signUserWithEmailAndPassword = async (email,password)=>{ 
    if(!email || !password) return; //return if email or password are empty
    return signInWithEmailAndPassword(auth,email,password) //else authenticat the user 
  }










  export const signOutUser = ()=> signOut(auth)

  export const onAuthStateChangedListner = (callback)=> {
    
    onAuthStateChanged(auth,callback)}