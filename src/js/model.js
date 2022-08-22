export const state = {
  user: [],
};

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6H11TQnEfSr6jxy7DmnkLAbB21ZoPPGs",
  authDomain: "chat-app-c879e.firebaseapp.com",
  projectId: "chat-app-c879e",
  storageBucket: "chat-app-c879e.appspot.com",
  messagingSenderId: "930893778008",
  appId: "1:930893778008:web:9ed27806d394755b134e2d",
  measurementId: "G-N7MLN4D33F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createAccount = function (email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      state.user.push({
        userName: user.displayName,
        userEmail: user.email,
        userPhoneNumber: user.phoneNumber,
        userProfilePic: user.photoURL,
        userId: user.uid,
      });
      console.log(state.user);

      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code.split("/")[1];
      const errorMessage = error.message;
      alert(errorCode);

      // ..
    });
};
