import { error } from "console";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { userInfo } from "os";

const firebase = {
  apiKey: "AIzaSyA1I4x9ATrov1CXKTXpwWZdeOITuOCKrY0",
  authDomain: "test-1dac2.firebaseapp.com",
  projectId: "test-1dac2",
  storageBucket: "test-1dac2.appspot.com",
  messagingSenderId: "476850140644",
  appId: "1:476850140644:web:fa1ce061e4ebf3e04743f1",
  measurementId: "G-WZJWWKRQ6K",
};
const app = initializeApp(firebase);
const auth = getAuth(app);
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const submit = document.getElementById("submit");
const fieldset = document.querySelector("fieldset");
const roller = document.querySelector(".lds-default");
const name = document.getElementById("name");
const login = document.getElementById("login");
const signIn = document.getElementById("signin");
const text2 = document.getElementById("text2");
text2.style.display = "none";
signIn.style.display = "none";
roller.style.display = "none";

submit.addEventListener("click", function (e) {
  e.preventDefault();
  fieldset.style.display = "none";
  roller.style.display = " block";
  const email = emailEl.value;
  const password = passwordEl.value;
  const displayName = name.value;
  console.log(displayName);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userInfo) => {
      console.log(userInfo);
      const user = userInfo.user;
      if (user) {
        // user.displayName = name.value;
        roller.style.display = "none";
        alert("Account Successfully Created");

        fieldset.style.display = "flex";
      } else return;

      console.log(user);
    })
    .catch((error) => {
      roller.style.display = "none";
      fieldset.style.display = "flex";

      const error1 = error.message
        .split(":")[1]
        .split("/")[1]
        .replace(")", "")
        .toUpperCase();
      alert(error1);
    });
});

login.addEventListener("click", function (e) {
  e.preventDefault();
  fieldset.style.display = "flex";
  name.style.display = "none";
  emailEl.style.marginTop = "30%";
  submit.value = "Login";
  submit.style.width = "30%";
  submit.style.display = "none";
  signIn.style.display = "block";
  document.querySelector("#text").style.display = "none";
  text2.style.display = "block";
});

signIn.addEventListener("click", function (e) {
  e.preventDefault();
  fieldset.style.display = "none";
  roller.style.display = "block";

  const email = emailEl.value;
  const password = passwordEl.value;
  const displayName = name.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userInfo) => {
      const user = userInfo.user;
      if (user) {
        roller.style.display = "none";
        alert("Welcome");
        email = password = "";
      }
      console.log(user);
    })
    .catch((error) => {
      roller.style.display = "none";
      fieldset.style.display = "flex";
      const error1 = error.message
        .split(":")[1]
        .split("/")[1]
        .replace(")", "")
        .toUpperCase();
      alert(error1);
    });
});
