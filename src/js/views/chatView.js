import chatimg1 from "../../img/chatimg1.jpg";
import chatimg2 from "../../img/chatimg2.jpg";
import chatimg3 from "../../img/chatimg3.jpg";
import chatimg4 from "../../img/chatimg4.jpg";
import arroba from "../../img/arroba (2).png";
import use from "../../img/use.jpg";
import send from "../../img/send.png";

import { initializeApp } from "firebase/app";

import {
  getDatabase,
  set,
  ref,
  child,
  push,
  update,
  get,
} from "firebase/database";
import { FIREBASECONFIG } from "../config.js";
const app = initializeApp(FIREBASECONFIG);
const database = getDatabase(app);

class ChatView {
  _body = document.querySelector("body");
  _whole = document.querySelector(".whole");
  _account;

  _clear() {
    this._whole.innerHTML = "";
  }
  _addHandlerId(data, handler, curUser) {
    const ele = document
      .querySelector(".chat-space")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".chat-box");
        if (!btn) return;
        const id = btn.dataset.acc;
        const acc = data.find((acc) => acc[0] === id);
        handler(acc, curUser, data);
      });
  }

  _addHandlerSend(acc, curUser, users) {
    const message = document.getElementById("send");
    const btn = document.getElementById("sendbtn");
    const doc = document.querySelector(".msg");
    btn.addEventListener("click", function () {
      if (message.value === "") return;

      // SENT MSG ARRAY
      // let sentMsg = acc.at(1).account.messages.sentMsg.message;
      // sentMsg.push(message.value);
      // acc.at(1).account.messages.sentMsg.to = acc.at(0);

      // // RECEIVED MSG ARRAY
      // let receivedMsg = (acc.at(1).account.messages.receivedMsg.message =
      //   sentMsg);
      // acc.at(1).account.messages.receivedMsg.from = curUser.account.userId;

      // console.log(curUser);
      // function writeUserData(userId) {
      //   const db = getDatabase();
      //   update(ref(db, "users/" + userId + "/account"), {
      //     messages: acc.at(1).account.messages,
      //   });
      // }

      // writeUserData(acc.at(0));

      // function getData(userId) {
      //   const dbRef = ref(getDatabase());
      //   get(child(dbRef, `users/${userId}`))
      //     .then((snapshot) => {
      //       if (snapshot.exists()) {
      //         console.log(snapshot.val());
      //       } else {
      //         console.log("No data available");
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // }

      // getData(acc.at(0));
    });
  }

  _render(users) {
    const markUp = `
    <main id="main-section">
    <fieldset id="chat-field">
      <section class="inbox-space">
        <section class="logo-chat">
          <img src="${arroba}" alt="" />
          <h1>Chat</h1>
        </section>

        <section class="box-chat">
          <i class="fa-solid fa-inbox"></i>
          <p>Inbox</p>
        </section>
      </section>

      <section class="chat-space">
        <section class="header">
          <h1>Inbox</h1>
          <section class="area">
            <h3>General</h3>
          </section>
        </section>
         ${users
           .map((acc) => {
             return `
          <section class="chat-box" data-acc="${acc.at(0)}">
          <img src="${chatimg1}" alt="" />
          <section class="message">
            <h4>${acc.at(1).account.userName}</h4>
            <p id="userChat">${acc
              .at(1)
              .account.messages.sentMsg.message.at(
                acc.at(1).account.messages.sentMsg.message.length - 1
              )}</p>
            
          </section>
        </section>
          `;
           })
           .join("")}

      </section>

      <section class="width">
       
      </section>

      <section class="icon-logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </section>
    </fieldset>
  </main>
    `;
    this._clear();
    this._body.insertAdjacentHTML("afterbegin", markUp);
  }

  _renderChatArea(parent, acc) {
    console.log(acc);
    const markUp = `
    <section class="message-box">
    <section class="top-box">
      <section class="name">
        <img src="${chatimg1}" alt="" />
        <section class="about">
          <h4>${acc.at(1).account.userName}</h4>
          <h5>Online</h5>
        </section>
      </section>

      <section class="search-field">
        <input type="text" name="" id="" /><i
          class="fa-solid fa-magnifying-glass"
        ></i>
      </section>
    </section>

    <section class="message-section">
      <section class="day">
        <h1>August 26, Friday</h1>
      </section>
      <section class="msg">
      ${acc
        .at(1)
        .account.messages.sentMsg.message.map((msg) => {
          if (msg === "") return;

          return `<p class="message1">${msg}</p>`;
        })
        .join("")}

      </section>
    </section>
  </section>

  <hr />
  <section class="send-area">
    <textarea
      name=""
      id="send"
      cols="30"
      rows="3"
      placeholder="Write a message..."
    ></textarea>
    <img src="${send}" alt="hiiii" id="sendbtn" />
  </section>
    `;
    parent.innerHTML = "";
    parent.insertAdjacentHTML("afterbegin", markUp);
  }
}
export default new ChatView();

{
  /* <p class="message1">Hii there David</p>
<p class="message2">Bro how are you doing</p>
<p class="message1">I am fine man</p>
<p class="message1">I hope you good too??</p>
<p class="message2">
  I am fine too just sorting out some things
</p>
<p class="message1">
  Ohh that is amazing i hope you figure it out man
</p> */
}
