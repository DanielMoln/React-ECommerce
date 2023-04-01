import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc, //retrieve data from firestore
  getDoc, // getting the document's data
  setDoc, // setting the document's data
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCurQDC-o8TLG0389wzKEWlBJk7T9vgo64",
  authDomain: "crwn-clothing-db-f2fa0.firebaseapp.com",
  projectId: "crwn-clothing-db-f2fa0",
  storageBucket: "crwn-clothing-db-f2fa0.appspot.com",
  messagingSenderId: "191705535268",
  appId: "1:191705535268:web:6429920d32f78055e699b1",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// how our app will behave
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // existing doc reference
  // db, collection, identifier
  const userDocRef = doc(db, "users", userAuth.uid);

  // getting data from document
  const userSnapshot = await getDoc(userDocRef);

  // if it doesn't exist => create new doc
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err);
    }
  }

  // if user data exists => return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
