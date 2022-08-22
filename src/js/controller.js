import signupView from "./views/signupView.js";
import { createAccount } from "./model.js";

const showForm = function () {
  signupView._render();
};

const submitForm = function () {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  createAccount(email.value, password.value);
};

const init = function () {
  signupView._addHandlerEmail(showForm);
  signupView._addHandlerSignUp(submitForm);
};
init();
