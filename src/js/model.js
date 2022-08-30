import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { success } from "./controller";
import { successLogIn } from "./controller";
import { FIREBASECONFIG } from "./config";

export const state = {
  user: {},
};

const app = initializeApp(FIREBASECONFIG);
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

export const getAccount = async function () {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users`));
  if (!snapshot.exists()) return;
  return (state.user = snapshot.val());
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
