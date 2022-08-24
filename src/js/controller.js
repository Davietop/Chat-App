import signupView from "./views/signupView.js";
import loginView from "./views/loginView.js";
import * as model from "./model.js";
import { async } from "@firebase/util";
const showForm = function () {
  signupView._render();
};
const showLoginForm = function () {
  loginView._renderLoginMakup();
};

const loginform = async function () {
  try {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");

    await model.loginAccountEmail(email.value, password.value);

    const findAcc = model.state.user.find(
      (acc) => acc.userEmail === email.value
    );
    const curAccount = findAcc;
    console.log(curAccount);
    alert(`Welcome ${curAccount.userName}`);
    loginView._body.innerHTML = "";
  } catch (error) {
    const errorCode = error.code.split("/")[1].toUpperCase();
    console.log(errorCode);
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
