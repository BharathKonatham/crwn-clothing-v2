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
  // eslint-disable-next-line no-unused-vars
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
    //we are moving the business logic of extracting raw data into selectors
    // while using selectors, we can extract data in the way we want instead of just objects
    //such as array or any other types

    //in below code instead of sedning object we send data from documents in the form of array

  //   const categories = querySnapshot.docs.reduce((acc,docSnapshot)=>{
  //     const { title ,items} = docSnapshot.data()
  //     acc[title.toLowerCase()] = items
  //     return acc
  //   },{}) //query each different documnet snap shot, gives array of individual documents and we are reducing them into single array bu destructuring them
  const categories = querySnapshot.docs.map((docSnapshot)=> docSnapshot.data())
    return categories;
  }


  //below methods is to insert user data into db 
  export const createUserDocumentFromAuth = async (userAuth,additionalInormation={})=>{ //userAuth contain user data obtained from authentication 
    
    if(!userAuth) return; //if user auth is null return 
    const userDocRef = doc(db,'users',userAuth.uid) //give the db instance , colleciton name 'users', user uniqu id for document name

    const userSnapshot = await getDoc(userDocRef) // get the snapshot of perticular docuement of a user


    if(!userSnapshot.exists()){ //if the snap shot exist dont create new one else create new document for the user 
        const {displayName, email} = userAuth //destructure displayname, email from the userAuth object
        const Name = displayName? displayName: additionalInormation.displayName
        const createdAt = new Date() // crate new time stamp for user creation 

        try{
            await setDoc(userDocRef,{ //write details into document, this not a batch insertion
                displayName:Name,
                email,
                createdAt
            })
        }catch(err){ // catch if any error exist
            console.log('error creating user',err.message)
        }
    }

    return userSnapshot 
  }

  //below method is to create authentication data using email and password
  export const createAuthUserWithEmailAndPassword = async (email,password)=>{ 
    console.log('creating user')
    console.log(email,password)
    if(!email || !password) return; //return if email and password are null
    return createUserWithEmailAndPassword(auth,email,password) //else create the authenticaion data for the user)
  } 
  //below methods is to sign in user with email and password
  export const signUserWithEmailAndPassword = async (email,password)=>{ 
    if(!email || !password) return; //return if email or password are empty
    return signInWithEmailAndPassword(auth,email,password) //else authenticat the user 
  }










  export const signOutUser = ()=> signOut(auth)

  export const onAuthStateChangedListner = (callback)=> {
    
    onAuthStateChanged(auth,callback)}


  export const getCurrentUser=()=>{  
    return  new Promise((resolve,reject)=>{
        const unsubsribe = onAuthStateChanged( 
          auth, 
          (userAuth)=>{
          unsubsribe()
          resolve(userAuth)
        },
      reject) //onAuthStateChanged takes a 3rd optional parameter which is a callback funciton, 
              //which runs when there is error when fetching user info
    })

  }