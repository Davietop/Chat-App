import signupView from "./views/signupView.js";
import loginView from "./views/loginView.js";
import chatView from "./views/chatView.js";
import * as model from "./model.js";
import { async } from "@firebase/util";

const showForm = function () {
  signupView._render();
};
const showLoginForm = function () {
  loginView._renderLoginMakup();
};

const displayChat = function (acc) {
  chatView._renderChatArea(document.querySelector(".width"), acc);
};

const loginform = async function () {
  try {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    const curUser = await model.loginAccountEmail(email.value, password.value);
    // console.log(curUser);

    const dataUser = Object.entries(model.state.user);

    loginView._body.innerHTML = "";

    chatView._render(dataUser);

    chatView._addHandlerId(dataUser, displayChat);
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
