import signupView from "./views/signupView.js";
import * as model from "./model.js";
const showForm = function () {
  signupView._render();
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
    const errorCode = error.code.split("/")[1];
    const errorMessage = error.message;
    alert(errorCode);
    console.log(errorCode);
    signupView._errorMessage(errorCode);
  }
};

const init = function () {
  signupView._addHandlerEmail(showForm);
  signupView._addHandlerSignUp(submitForm);
};
init();

// const img = document.querySelector("#profile");
// img.addEventListener("change", function () {
//   console.log(this.files[0].name);
// });
