"use strict";
import signupView from "./views/signupView.js";
import loginView from "./views/loginView.js";
import chatView from "./views/chatView.js";
import * as model from "./model.js";
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { FIREBASECONFIG } from "./config";
import {
  doc,
  setDoc,
  getFirestore,
  Firestore,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
// import { doc, onSnapshot } from "firebase/firestore";

const app = initializeApp(FIREBASECONFIG);

const db = getFirestore(app);

const showForm = function () {
  signupView._render();
};
const showLoginForm = function () {
  loginView._renderLoginMakup();
};

const handlerSend = async function (acc, curUser, text) {
  const timeStamp = new Date().getTime();
  const curaccMsg = await model.fetchMsg(curUser.userId);
  const accMsg = await model.fetchMsg(acc.userId);

  curaccMsg.sent.push({
    [timeStamp]: {
      [acc.userId]: {
        [curUser.userId]: text,
      },
    },
  });
  accMsg.receivedMsg.push({
    [timeStamp]: {
      [curUser.userId]: {
        [curUser.userId]: text,
      },
    },
  });

  await model.storeSentMsg(curUser.userId, curaccMsg);
  await model.storeReceivedMsg(acc.userId, accMsg);

  const unsub = onSnapshot(doc(db, "messages", curUser.userId), (doc) => {
    chatView._updateChatSection(doc.data(), curUser, acc);
  });

  lastMsg(curUser);
};

const _inboxMsgs = function inbox6(curUser) {
  lastMsg(curUser);
};

const _reRender = async function (curUser) {
  const msgFunc = model.fetchLastMsg;
  const data = model.state.user;
  const users = data.findIndex((acc) => acc.userId === curUser.userId);
  chatView._reRenderUsersSection(curUser, _inboxMsgs);
};

const writeInbox = function (id, curUser) {
  model.writeInboxData(id, curUser);
};

const renderAllUsers = async function (users, curUser) {
  const markUp = chatView._renderChatMarkup;
  const inboxId = curUser.inboxes.map((ele) => ele.userId);
  chatView._renderUsersSection(users, markUp, curUser, writeInbox, _inboxMsgs);
};

export const displayChat = async function (acc, curUser, data3) {
  const curaccMsg = await model.fetchMsg(curUser.userId);

  chatView._renderChatArea(
    document.querySelector(".width"),
    acc,
    curaccMsg,
    curUser
  );
  chatView._addHandlerSend(acc, curUser, handlerSend, displayChat, _reRender);
};

const lastMsg = function (curUser) {
  const inboxId = curUser.inboxes.map((ele) => ele.userId);

  const data2 = inboxId.map(async (data, index) => {
    if (!data) return;
    const unsub = onSnapshot(doc(db, "messages", data), async (doc) => {
      const data3 = doc.data();
      const message2 = [...data3.sent, ...data3.receivedMsg];

      const stampTime = [];
      for (const data of message2) {
        const dataTime = Object.keys(data)[0];
        stampTime.push(dataTime);
      }
      const sortedStamps = stampTime.sort((a, b) => a - b);
      const mesg = [];
      sortedStamps.forEach((accData) => {
        if (!accData) return;
        for (const data of message2) {
          const dataTime = Object.keys(data)[0];
          if (accData === dataTime) {
            for (const msgCheck of Object.entries(data)) {
              for (const msgCheck2 of Object.entries(msgCheck[1])) {
                if (msgCheck2[0] === curUser.userId) {
                  for (const msgCheck3 of Object.entries(msgCheck2[1])) {
                    mesg.push(msgCheck3[1]);
                  }
                }
              }
            }
          }
        }
      });

      const lastMsg = mesg.slice(-1)[0];
      const databox = document.querySelector(".display-inbox");
      const par = databox.querySelectorAll("p");
      par[index].textContent = lastMsg.slice(0, 20);
      await model.writeLastMsgData(data, lastMsg);
    });
  });
};

const loginform = async function () {
  try {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    let curUser = await model.loginAccountEmail(email.value, password.value);
    const inboxId = curUser.inboxes.map((ele) => ele.userId);
    const data = model.state.user;
    console.log(data);
    const users = data.findIndex((acc) => acc.userId === curUser.userId);
    data.splice(users, 1);
    chatView.render(curUser, _inboxMsgs);
    _inboxMsgs(curUser);

    renderAllUsers(data, curUser);
    chatView._addHandlerId(displayChat, curUser, data);
  } catch (error) {
    console.log(error);
    const errorCode = error.code.split("/")[1].toUpperCase();
    loginView._errorMessage(errorCode);
  }
};

const submitForm = async function () {
  try {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const number = document.getElementById("number");
    const option = document.getElementById("option").value;

    await model.createAccountEmail(
      email.value,
      password.value,
      username.value,
      number.value,
      option
    );
  } catch (error) {
    const errorCode = error.code.split("/")[1].toUpperCase();
    console.log(errorCode);
    signupView._errorMessage(errorCode);
  }
};
const spinner = function () {
  signupView._renderSpinner();
};

const init = function () {
  signupView._addHandlerEmail(showForm);
  signupView._addHandlerSignUp(submitForm, spinner);
  loginView._addHandlerShowLoginForm(showLoginForm);
  loginView._addHandlerlogin(loginform, spinner);
};
init();

export const success = function () {
  signupView._successMessage();
};
export const successLogIn = function () {
  loginView._successMessage();
};
