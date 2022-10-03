import arroba from "../../img/arroba (2).png";
import send from "../../img/send.png";
import bg from "../../img/bg-as.jpg";
import chat from "../../img/bubble-chat.png";
import bg_chat from "../../img/bg-chat.jpg";
import info from "../../img/info.png";
console.log(bg_chat);

class ChatView {
  _body = document.querySelector("body");
  _whole = document.querySelector(".whole");
  _account;

  _clear() {
    this._whole.innerHTML = "";
  }
  _addHandlerId(handler, curUser) {
    const ele = document
      .querySelector(".chat-space")
      .addEventListener("click", function (e) {
        const btn = e.target.closest(".chat-box");
        if (!btn) return;
        document.querySelector(".width").style.backgroundImage =
          "url('http://localhost:1234/bg-as.29850432.jpg?1663970810422')";
        const id = btn.dataset.acc;
        const acc = curUser.account.inboxes.find((acc) => {
          if (acc === "") return;
          else return acc[0] === id;
        });
        handler(acc, curUser);
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
      document.getElementById("inbox").textContent = "Inbox";
      const btnI = document.querySelector(".fa-plus");
      if (btnI.classList[2] === "fa-x") {
        btnI.classList.remove("fa-x");
      }
    });
  }
  _renderChatMarkup(curUser) {
    const arrInbox = [""];
    const chatBox = curUser.account.inboxes;
    if (chatBox[0] !== "") {
      const newBox = new Map(chatBox);
      if (arrInbox[0] === "") arrInbox.shift();
      const changeArr = [...newBox];
      arrInbox.push(changeArr);
    }
    const inbox = [...arrInbox];
    const flat = inbox.flatMap((chat) => chat);
    return `
    <section class="display-inbox">
      <section class="area">
         <h3>General</h3>
     </section>
         ${flat
           .map((acc) => {
             if (acc === "") return;
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
                     if (msgCheck[0] === acc[0]) {
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
             return `
             <section class="chat-box" data-acc="${acc[0]}">
                  <img src="${acc.at(1).account.userProfilePic}" alt="" />
                  <section class="message">
                    <h4>${acc[1].account.userName}</h4>
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

  _reRenderUsersSection(curUser) {
    const html = this._renderChatMarkup(curUser);
    document.querySelector(".display-inbox").innerHTML = "";
    document
      .querySelector(".display-inbox")
      .insertAdjacentHTML("afterbegin", html);
  }
  renderMarkUp(curUser) {
    return `
        <main id="main-section">
        <fieldset id="chat-field">
     <section class="inbox-space">
        <section class="nav-area">
          <section class="profile">
            <img src="${curUser.account.userProfilePic}" alt="" />
            <p>${curUser.account.userName}</p>
          </section>

          <section class="msgicon">
          <img src="${chat}" alt="">
          </section>

           <section class="info">
            <img src="${info}" alt="">
          </section>
        
          <section class="icon-logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          </section>

        </section>
      </section>
     <section class="chat-space">
          <section class="header">
          <section class="inbox">
          <h1 id="inbox">Inbox</h1>
          <i class="fa-solid fa-plus"></i>
          </section>
         </section>
         ${this._renderChatMarkup(curUser)}
      
        </section>
          <section class="width">
          </section>

       <section class="home">
         
        </section>
        </fieldset>
      </main>
        `;
  }
  render(curUser) {
    const markUp = this.renderMarkUp(curUser);
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
                    return `
                    <p class="message1">${msgKnown[1]} <span>${timeSent}</span></p>
                  `;
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

  _renderUsersSection(users, markup2, curUser, writeInbox) {
    const markUp = users
      .map((acc) => {
        return `
    <section class="chat-box box-id" data-acc="${acc.at(0)}">
    <img src="${acc.at(1).account.userProfilePic}" alt="" />
      <section class="message">
      <h4>${acc.at(1).account.userName}</h4>
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
            document.querySelector("#inbox").textContent = "Inbox";
            document.querySelector(".display-inbox").innerHTML = "";
            document
              .querySelector(".display-inbox")
              .insertAdjacentHTML("afterbegin", html);
          }
        }
        const target = e.target.closest(".box-id");
        if (target) {
          const id = target.dataset.acc;
          const acc = users.find((acc) => acc[0] === id);
          let inboxChat = curUser.account.inboxes;
          if (inboxChat[0] === "") inboxChat.shift();
          inboxChat.push(acc);
          const newChat = new Set(inboxChat);

          inboxChat = newChat;

          writeInbox(curUser.account.userId, curUser);
        }
      });
  }
}
export default new ChatView();
