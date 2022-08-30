import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { success } from "./controller";
import { successLogIn } from "./controller";

export const state = {
  user: {},
};

const firebaseConfig = {
  apiKey: "AIzaSyA6H11TQnEfSr6jxy7DmnkLAbB21ZoPPGs",
  authDomain: "chat-app-c879e.firebaseapp.com",
  databaseURL: "https://chat-app-c879e-default-rtdb.firebaseio.com",
  projectId: "chat-app-c879e",
  storageBucket: "chat-app-c879e.appspot.com",
  messagingSenderId: "930893778008",
  appId: "1:930893778008:web:9ed27806d394755b134e2d",
  measurementId: "G-N7MLN4D33F",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export let createAccountEmail = async function (
  email,
  password,
  username,
  number
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      username
    );
    const user = userCredential.user;
    const userData = {
      userId: user.uid,
      userName: username,
      userEmail: user.email,
      userPhoneNumber: +number,
      userProfilePic: `${username}.jpg`,
      messages: {
        sentMsg: [""],
        receivedMsg: [""],
      },
    };

    function writeUserData(userId) {
      const db = getDatabase();
      set(ref(db, "users/" + userId), {
        account: userData,
      });
    }
    if (user) {
      success();
      writeUserData(user.uid);
    }
  } catch (error) {
    throw error;
  }
};

const getAccount = async function () {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users`));
  if (!snapshot.exists()) return;
  state.user = snapshot.val();
};

getAccount();

export const loginAccountEmail = async function (email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${user.uid}`));
    if (!snapshot.exists()) return;
    const data = snapshot.val();
    if (user) successLogIn();
    return data;
  } catch (error) {
    throw error;
  }
};
