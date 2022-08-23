export const state = {
  user: [],
};

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { success } from "./controller";

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

        console.log(state.user);

        localStorage.setItem("account", JSON.stringify(state.user));
        if (user) success();
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

// {
//   auth.languageCode = "it";
//   import { GoogleAuthProvider } from "firebase/auth";
//   const provider = new GoogleAuthProvider(app);
//   signInWithPopup,
//   GoogleAuthProvider,

//   const createAccountGoogle = function () {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         const user = result.user;
//         state.users.push({
//           userName: user.displayName,
//           userEmail: user.email,
//           userId: user.uid,
//         });
//         console.log(state.users);
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

// }
