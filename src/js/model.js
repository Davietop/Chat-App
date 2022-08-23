export const state = {
  user: [],
};

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6H11TQnEfSr6jxy7DmnkLAbB21ZoPPGs",
  authDomain: "chat-app-c879e.firebaseapp.com",
  projectId: "chat-app-c879e",
  storageBucket: "chat-app-c879e.appspot.com",
  messagingSenderId: "930893778008",
  appId: "1:930893778008:web:9ed27806d394755b134e2d",
  measurementId: "G-N7MLN4D33F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createAccountEmail = async function (
  email,
  password,
  username,
  number
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        state.user.push({
          userName: username,
          userEmail: user.email,
          userPhoneNumber: +number,
          userProfilePic: user.photoURL,
          userId: user.uid,
        });
        localStorage.setItem("account", JSON.stringify(state.user));
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAccountsFromStorage = function () {
  const storage = localStorage.getItem("account");
  if (storage) {
    state.user = JSON.parse(storage);
  }
};
getAccountsFromStorage();
// console.log(state.user);

// const findAcc = function () {
//   if (state.user.length !== 0) {
//     const account = state.user.find((acc) => {
//       return acc.userEmail === "oyatoyedavid12@gmail.com";
//     });
//     console.log(account);
//   }
// };
// findAcc();
