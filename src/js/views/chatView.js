import send from "../../img/send.png";
import bg_chat from "../../img/msg_area.png";
import send_chat from "../../img/sendbg.jpg";
import arrow from "../../img/left-chevron.png";
import { async } from "@firebase/util";

import * as Model from "../model.js";

class ChatView {
  _body = document.querySelector("body");
  _whole = document.querySelector(".whole");

  _account;
  _update = [];
  _lastMsg;

  _clear() {
    this._whole.innerHTML = "";
  }
  _addHandlerId(handler, curUser) {
    const ele = document
      .querySelector(".chat-space")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".chat-box");
        if (!btn) return;
        const media = window.matchMedia("(max-width: 480px)");
        const media2 = window.matchMedia(" (max-width: 600px)");

        if (media2.matches) {
          document.querySelector(".chat-space").style.display = "none";
          document.querySelector(".width").style.display = "block";
        }
        if (media.matches) {
          document.querySelector(".chat-space").style.display = "none";
          document.querySelector(".width").style.display = "block";
        }
        const id = btn.dataset.acc;
        const acc = curUser.inboxes.find((acc) => {
          return acc.userId === id;
        });

        handler(acc, curUser);
      });
  }

  _addHandlerSend(acc, curUser, handlerSend, displayChat, reRender) {
    const message = document.getElementById("send");
    const btn = document.getElementById("sendbtn");
    message.focus();

    btn.addEventListener("click", async function () {
      if (message.value === "") return;
      const sendData = await handlerSend(acc, curUser, message.value);

      displayChat(acc, curUser);
      reRender(curUser /*sendData*/);

      message.value = "";
      document.getElementById("inbox").textContent = "Recent";
      const btnI = document.querySelector(".fa-plus");
      if (btnI.classList[2] === "fa-x") {
        btnI.classList.remove("fa-x");
      }
    });
  }

  _renderChatMarkup(curUser) {
    const arrInbox = [];
    const chatBox = curUser.inboxes;
    let inbox = [""];
    if (chatBox[0] !== "") {
      const unique = chatBox.filter((ele) => {
        const isDuplicate = arrInbox.includes(ele.userId);
        if (!isDuplicate) {
          arrInbox.push(ele.userId);
          return true;
        }
        return false;
      });
      inbox = unique;
    }

    return `
    <section class="display-inbox"> 
        ${inbox
          .map((acc, index) => {
            if (acc === "") return;

            return `
            <section class="chat-box" data-acc="${acc.userId}">
                  <img src="${acc.userProfilePic}" alt="" />
                  <section class="message">
                    <h4>${acc.userName}</h4>
                    <p></p>
                  </section>
                <hr id="data-hr">
              </section>
              
           `;
          })
          .join("")}
        
          </section>  `;
  }

  _reRenderUsersSection(curUser, _inboxMsgs) {
    const html = this._renderChatMarkup(curUser, _inboxMsgs);

    document.querySelector(".display-inbox").innerHTML = "";
    document
      .querySelector(".display-inbox")
      .insertAdjacentHTML("afterbegin", html);

    _inboxMsgs(curUser);
  }
  renderMarkUp(curUser, _inboxMsgs) {
    return `
        <main id="main-section">
        <fieldset id="chat-field">
     <section class="area-field">
     <section class="chat-space">
          <section class="header">
           <h3 id="inbox">Recent</h3>
          <i class="fa-solid fa-plus"></i>
         </section>
         ${this._renderChatMarkup(curUser, _inboxMsgs)}
      
     </section>
          <section class="width">
          <section class="dis-img">
          <img id="bg" src="${bg_chat}" alt="" />
          <p class="text">Start a conversation or select one to reply</p>
          </section>

          </section>

          <section class="chat_profile">
          <section class="user">
            <img src="" alt="" />
            <p>${curUser.userName}</p>
            
          </section>
        </section>
        </section>
        </fieldset>
      </main>
        `;
  }

  render(curUser, _inboxMsgs) {
    const markUp = this.renderMarkUp(curUser, _inboxMsgs);

    this._clear();
    this._body.insertAdjacentHTML("afterbegin", markUp);
  }

  _renderChatArea(parent, acc, curaccMsg, curUser) {
    const clickedUserReceivedMsg = curaccMsg.receivedMsg;
    const clickedUserSentMsg = curaccMsg.sent;

    const messages = [...clickedUserReceivedMsg, ...clickedUserSentMsg];
    const stampTime = [];
    for (const data of messages) {
      const dataTime = Object.keys(data)[0];
      stampTime.push(dataTime);
    }

    const sortedStamps = stampTime.sort((a, b) => a - b);

    const markup = `
    <section class="chat_area">
    <section class="status">
      <img src="" alt="" />
      <img id="arrow" src="${arrow}" alt="">
      <section class="info">
      
        <h3>${acc.userName}</h3>
        <p>Online</p>
      </section>
    </section>
    <section class="message_area">
      <section class="msg">
      ${sortedStamps
        .map((accData) => {
          if (!accData) return;
          for (const data of messages) {
            const dataTime = Object.keys(data)[0];
            if (accData === dataTime) {
              for (const msgCheck of Object.entries(data)) {
                for (const check of Object.entries(msgCheck[1])) {
                  if (check[0] === acc.userId) {
                    for (const msgKnown of Object.entries(check[1])) {
                      const timestamp = dataTime;
                      const time = new Date(+timestamp);

                      const day = new Date(time);
                      const dateSent = new Intl.DateTimeFormat(
                        navigator.language,
                        {
                          dateStyle: "full",
                        }
                      ).format(day);
                      const date = dateSent.split(" ")[0].slice(0, 3);
                      const timeSent = new Intl.DateTimeFormat(
                        navigator.language,
                        {
                          timeStyle: "short",
                        }
                      ).format(time);
                      if (msgKnown[0] === curUser.userId)
                        return `
                        <p class="message1">${msgKnown[1]} </p>
                        <span class="span1">${date}, ${timeSent}</span>
                      `;
                      else
                        return `<p class="message2">${msgKnown[1]}</p>
                        <span class="span2">${date}, ${timeSent}</span>
                        `;
                    }
                  }
                }
              }
            }
          }
        })
        .join("")}
      </section>
    </section>

    <section class="input">
      <textarea
        name=""
        id="send"
        cols="90"
        rows="1"
        placeholder="Write a message..."
      ></textarea>
      <img src="${send}" alt="" id="sendbtn" />
    </section>
  </section>
    `;

    parent.innerHTML = "";
    parent.insertAdjacentHTML("afterbegin", markup);
    const media = window.matchMedia("(max-width: 480px)");
    const media2 = window.matchMedia("(max-width: 600px)");
    if (media2.matches) {
      document.querySelector("textarea").cols = "40";

      document.getElementById("arrow").addEventListener("click", function () {
        document.querySelector(".width").style.display = "none";
        document.querySelector(".chat-space").style.display = "block";
      });
    }
    if (media.matches) {
      document.querySelector("textarea").cols = "40";
      document.getElementById("arrow").addEventListener("click", function () {
        document.querySelector(".width").style.display = "none";
        document.querySelector(".chat-space").style.display = "block";
      });
    }
  }
  _updateChatSection(curaccMsg, curUser, acc) {
    const clickedUserReceivedMsg = curaccMsg.receivedMsg;
    const clickedUserSentMsg = curaccMsg.sent;

    const messages = [...clickedUserReceivedMsg, ...clickedUserSentMsg];
    const stampTime = [];
    for (const data of messages) {
      const dataTime = Object.keys(data)[0];
      stampTime.push(dataTime);
    }

    const sortedStamps = stampTime.sort((a, b) => a - b);

    const markUp = `
    <section class="msg">
    ${sortedStamps
      .map((accData) => {
        if (!accData) return;
        for (const data of messages) {
          const dataTime = Object.keys(data)[0];
          if (accData === dataTime) {
            for (const msgCheck of Object.entries(data)) {
              for (const check of Object.entries(msgCheck[1])) {
                if (check[0] === acc.userId) {
                  for (const msgKnown of Object.entries(check[1])) {
                    const timestamp = dataTime;
                    const time = new Date(+timestamp);

                    const day = new Date(time);
                    const dateSent = new Intl.DateTimeFormat(
                      navigator.language,
                      {
                        dateStyle: "full",
                      }
                    ).format(day);
                    const date = dateSent.split(" ")[0].slice(0, 3);
                    const timeSent = new Intl.DateTimeFormat(
                      navigator.language,
                      {
                        timeStyle: "short",
                      }
                    ).format(time);
                    if (msgKnown[0] === curUser.userId)
                      return `
                      <p class="message1">${msgKnown[1]} </p>
                      <span class="span1">${date}, ${timeSent}</span>
                    `;
                    else
                      return `<p class="message2">${msgKnown[1]}</p>
                      <span class="span2">${date}, ${timeSent}</span>
                      `;
                  }
                }
              }
            }
          }
        }
      })
      .join("")}
    </section>
    `;
    const parent = document.querySelector(".message_area");
    parent.innerHTML = "";
    parent.insertAdjacentHTML("afterbegin", markUp);
  }

  _renderUsersSection(users, markup2, curUser, writeInbox, _inboxMsgs) {
    const markUp = users
      .map((acc) => {
        return `
    <section class="chat-box box-id" data-acc="${acc.userId}">
    <img src="${acc.userProfilePic}" alt="" />
      <section class="message">
      <h4>${acc.userName}</h4>
      <p id="userChat">Hey there! Leave a message</p>
    </section>
  </section>
    `;
      })
      .join("");
    document
      .querySelector(".chat-space")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".fa-plus");

        if (btn) {
          btn.classList.toggle("fa-x");
          document.querySelector("#inbox").textContent = "Users";
          document.querySelector(".display-inbox").innerHTML = "";
          document
            .querySelector(".display-inbox")
            .insertAdjacentHTML("afterbegin", markUp);

          if (btn.classList[2] !== "fa-x") {
            const html = markup2(curUser);
            document.querySelector("#inbox").textContent = "Recent";
            document.querySelector(".display-inbox").innerHTML = "";
            document
              .querySelector(".display-inbox")
              .insertAdjacentHTML("afterbegin", html);

            _inboxMsgs(curUser);
          }
        }
        const target = e.target.closest(".box-id");
        if (target) {
          const id = target.dataset.acc;
          const acc = users.find((acc) => acc.userId === id);
          let inboxChat = curUser.inboxes;

          if (inboxChat[0] === "") inboxChat.shift();
          inboxChat.push(acc);
          const arrInbox = [];
          const chatBox = curUser.inboxes;
          let inbox = [""];
          if (chatBox[0] !== "") {
            const unique = chatBox.filter((ele) => {
              const isDuplicate = arrInbox.includes(ele.userId);
              if (!isDuplicate) {
                arrInbox.push(ele.userId);
                return true;
              }
              return false;
            });
            inbox = unique;
          }

          curUser.inboxes = inbox;

          writeInbox(curUser.userId, curUser);
        }
      });
  }
}
export default new ChatView();
