import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getFirestore,
  Firestore,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { async } from "@firebase/util";

import { success } from "./controller";
import { successLogIn } from "./controller";
import { FIREBASECONFIG } from "./config";
import imgProMan from "../img/profileman.png";
import imgProWoman from "../img/profilewoman.png";
import * as controller from "./controller.js";

export let state = {
  user: [],
  updates: [],
};
const app = initializeApp(FIREBASECONFIG);
const auth = getAuth(app);

const db = getFirestore(app);

export let createAccountEmail = async function (
  email,
  password,
  username,
  number,
  sex
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
      sex: sex,
      userProfilePic: `${sex === "Male" ? imgProMan : imgProWoman}`,
      inboxes: [""],
    };
    const messages = {
      sent: [""],
      receivedMsg: [""],
    };

    const lastMsg = {
      lMsgs: [""],
    };

    async function storeMsg(id) {
      await setDoc(doc(db, "messages", id), messages);
    }
    async function storeLastMsg(id) {
      await setDoc(doc(db, "lMsg", id), lastMsg);
    }
    async function storeData(id) {
      await setDoc(doc(db, "users", id), userData);
      await storeMsg(id);
      await storeLastMsg(id);
    }

    if (user) {
      success();
      storeData(user.uid);
    }
  } catch (error) {
    throw error;
  }
};

export const getAccount = async function () {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    state.user.push(doc.data());
  });
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
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    if (user) successLogIn();

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchMsg = async function (id) {
  const docRef = doc(db, "messages", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return;
  const data = docSnap.data();

  return data;
};

export const storeSentMsg = async function (userId, messages) {
  const washingtonRef = doc(db, "messages", userId);
  await updateDoc(washingtonRef, {
    sent: messages.sent,
  });
};
export const storeReceivedMsg = async function (userId, messages) {
  const washingtonRef = doc(db, "messages", userId);
  await updateDoc(washingtonRef, {
    receivedMsg: messages.receivedMsg,
  });
};

export const writeInboxData = async function (userId, curUser) {
  const washingtonRef = doc(db, "users", userId);
  await updateDoc(washingtonRef, {
    inboxes: curUser.inboxes,
  });
};

export const writeLastMsgData = async function (userId, msg) {
  const washingtonRef = doc(db, "lMsg", userId);
  await updateDoc(washingtonRef, {
    lMsgs: { [userId]: msg },
  });
};

export const fetchLastMsg = async function (id) {
  const docRef = doc(db, "lMsg", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return;
  const data = docSnap.data();

  return data;
};
