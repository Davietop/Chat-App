import signupView from "./views/signupView.js";
import loginView from "./views/loginView.js";
import chatView from "./views/chatView.js";
import * as model from "./model.js";

const showForm = function () {
  signupView._render();
};
const showLoginForm = function () {
  loginView._renderLoginMakup();
};

const handlerSend = function (acc, curUser, text) {
  const curaccMsg = curUser.account.messages.sentMsg;

  const accMsg = acc.at(1).account.messages.receivedMsg;

  delete curaccMsg.chats;
  delete accMsg.chats;

  const timeStamp = new Date().getTime();

  curaccMsg[timeStamp] = {
    [acc.at(0)]: {
      [curUser.account.userId]: text,
    },
  };

  (accMsg[timeStamp] = {
    [curUser.account.userId]: {
      [curUser.account.userId]: text,
    },
  }),
    model.writeUserData1(acc.at(0), acc);
  model.writeUserData2(curUser.account.userId, curUser);
  model.getData(acc.at(0));
  model.getData(curUser.account.userId);
  chatView._renderChatArea(document.querySelector(".width"), acc, curUser);
};

const displayChat = async function (acc, curUser, users) {
  chatView._renderChatArea(document.querySelector(".width"), acc, curUser);
  chatView._addHandlerSend(acc, curUser, users, handlerSend);

  const clickedUserReceivedMsg = curUser.account.messages.receivedMsg;
  const clickedUserSentMsg = curUser.account.messages.sentMsg;

  const messages = { ...clickedUserReceivedMsg, ...clickedUserSentMsg };

  const sentTimeStamp = Object.keys(clickedUserReceivedMsg);
  const receivedTimeStamp = Object.keys(clickedUserSentMsg);
  const stamps = [...sentTimeStamp, ...receivedTimeStamp];
  const sortedStamps = stamps.sort((a, b) => a - b);

  sortedStamps.forEach((accData) => {
    for (const data of Object.entries(messages)) {
      const id = acc.at(0);
      if (accData === data[0]) {
        for (const msgCheck of Object.entries(data[1]))
          if (msgCheck[0] === acc.at(0)) {
            for (const msgKnown of Object.entries(msgCheck[1]))
              if (msgKnown[0] === curUser.account.userId)
                console.log(`<p class="message1">${msgKnown[1]}</p>`);
              else console.log(`<p class="message2">${msgKnown[1]}</p>`);
          }
      }
    }
  });
};

const loginform = async function () {
  try {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    const curUser = await model.loginAccountEmail(email.value, password.value);

    const dataUser = Object.entries(model.state.user);
    const account = dataUser.findIndex(
      (acc) => acc[0] === curUser.account.userId
    );
    dataUser.splice(account, 1);
    loginView._body.innerHTML = "";
    chatView._render(dataUser);
    chatView._addHandlerId(dataUser, displayChat, curUser);
  } catch (error) {
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

    await model.createAccountEmail(
      email.value,
      password.value,
      username.value,
      number.value
    );
  } catch (error) {
    const errorCode = error.code.split("/")[1].toUpperCase();
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
