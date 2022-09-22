import arroba from "../../img/arroba (2).png";
import send from "../../img/send.png";

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

  _addHandlerSend(acc, curUser, handlerSend, displayChat, reRender) {
    const message = document.getElementById("send");
    const btn = document.getElementById("sendbtn");
    message.focus();

    btn.addEventListener("click", function () {
      if (message.value === "") return;
      handlerSend(acc, curUser, message.value);
      displayChat(acc, curUser);
      reRender(curUser);
      message.value = "";
    });
  }
  _renderChatMarkup(users, curUser) {
    return `
    <section class="header">
          <h1>Inbox</h1>
          <section class="area">
            <h3>General</h3>
          </section>
        </section>
         ${users
           .map((acc) => {
             const clickedUserReceivedMsg =
               curUser.account.messages.receivedMsg;
             const clickedUserSentMsg = curUser.account.messages.sentMsg;

             const messages = {
               ...clickedUserReceivedMsg,
               ...clickedUserSentMsg,
             };

             const sentTimeStamp = Object.keys(clickedUserReceivedMsg);
             const receivedTimeStamp = Object.keys(clickedUserSentMsg);
             const stamps = [...sentTimeStamp, ...receivedTimeStamp];
             const sortedStamps = stamps.sort((a, b) => a - b);

             const mesg = [];
             sortedStamps.forEach((accData) => {
               for (const data of Object.entries(messages))
                 if (accData === data[0]) {
                   for (const msgCheck of Object.entries(data[1]))
                     if (msgCheck[0] === acc.at(0)) {
                       for (const msgKnown of Object.entries(msgCheck[1]))
                         mesg.push(msgKnown);
                     }
                 }
             });
             const lastMsg = mesg.slice(-1);
             const msgData = lastMsg
               .map((msgData) => msgData)
               .join("")
               .split(",");

             if (!msgData[1]) msgData[1] = "";
             console.log(acc);
             return `
          <section class="chat-box" data-acc="${acc.at(0)}">
          <img src="${acc.at(1).account.userProfilePic}" alt="" />
          <section class="message">
            <h4>${acc.at(1).account.userName}</h4>
            <p id="userChat">${msgData[1].slice(0, 25)}</p>
          </section>
         <hr id="data-hr">
        </section>
     
          `;
           })
           .join("")}
          
      </section>

    
   `;
  }

  _reRenderUsersSection(users, curUser) {
    const html = this._renderChatMarkup(users, curUser);
    document.querySelector(".chat-space").innerHTML = "";
    document
      .querySelector(".chat-space")
      .insertAdjacentHTML("afterbegin", html);
  }

  _render(users, curUser) {
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
       ${this._renderChatMarkup(users, curUser)}
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

  _renderChatArea(parent, acc, curUser) {
    const clickedUserReceivedMsg = curUser.account.messages.receivedMsg;
    const clickedUserSentMsg = curUser.account.messages.sentMsg;
    const messages = { ...clickedUserReceivedMsg, ...clickedUserSentMsg };
    const sentTimeStamp = Object.keys(clickedUserReceivedMsg);
    const receivedTimeStamp = Object.keys(clickedUserSentMsg);
    const stamps = [...sentTimeStamp, ...receivedTimeStamp];
    const sortedStamps = stamps.sort((a, b) => a - b);

    const date = new Date();
    const intl = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "full",
    }).format(date);

    const markUp = `
    <section class="message-box">
    <section class="top-box">
      <section class="name">
        <img src="${acc.at(1).account.userProfilePic}" alt="" />
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
        <h1>${intl}</h1>
      </section>
      <section class="msg">
    ${sortedStamps
      .map((accData) => {
        for (const data of Object.entries(messages)) {
          if (accData === data[0]) {
            for (const msgCheck of Object.entries(data[1]))
              if (msgCheck[0] === acc.at(0)) {
                for (const msgKnown of Object.entries(msgCheck[1])) {
                  const timestamp = data[0];
                  const time = new Date(+timestamp);

                  const timeSent = new Intl.DateTimeFormat(navigator.language, {
                    timeStyle: "short",
                  }).format(time);

                  if (msgKnown[0] === curUser.account.userId)
                    return `<p class="message1">${msgKnown[1]} <span>${timeSent}</span></p>`;
                  else
                    return `<p class="message2">${msgKnown[1]} <span>${timeSent}</span></p>`;
                }
              }
          }
        }
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
