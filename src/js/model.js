import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { success } from "./controller";
import { successLogIn } from "./controller";

export const state = {
  user: [],
};

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

export let createAccountEmail = async function (
  email,
  password,
  username,
  number
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password, username).then(
      (userCredential) => {
        const user = userCredential.user;
        state.user.push({
          userName: username,
          userEmail: user.email,
          userPhoneNumber: +number,
          userProfilePic: user.photoURL,
          userId: user.uid,
          userMessages: [],
        });
        localStorage.setItem("account", JSON.stringify(state.user));
        if (user) success();
      }
    );
  } catch (error) {
    throw error;
  }
};

export const loginAccountEmail = async function (email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) successLogIn();
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAccountsFromStorage = function () {
  const storage = localStorage.getItem("account");
  if (storage) {
    state.user = JSON.parse(storage);
  }
};

getAccountsFromStorage();
