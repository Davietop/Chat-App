import chatimg1 from "../../img/chatimg1.jpg";
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

  _addHandlerSend(acc, curUser, users, handlerSend) {
    const message = document.getElementById("send");
    const btn = document.getElementById("sendbtn");
    const doc = document.querySelector(".msg");

    btn.addEventListener("click", function () {
      if (message.value === "") return;
      handlerSend(acc, curUser, message.value);
      message.value = "";
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
            <p id="userChat"></p>
            
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

  _renderChatArea(parent, acc, curUser) {
    const clickedUserReceivedMsg = curUser.account.messages.receivedMsg.chats;
    const clickedUserSentMsg = curUser.account.messages.sentMsg.chats;
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
     
      ${clickedUserSentMsg
        .map((accMsg) => {
          for (const msgS of Object.entries(accMsg))
            if (msgS.at(0) === acc.at(0)) {
              const messages = msgS.at(1);
              return `<p class="message1">${messages}</p>`;
            }
        })
        .join("")}
       ${clickedUserReceivedMsg
         .map((accMsg) => {
           for (const msgS of Object.entries(accMsg))
             if (msgS.at(0) === acc.at(0)) {
               const messages = msgS.at(1);
               return `<p class="message2">${messages}</p>`;
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

// const n = ["hey", "how are you doing", "okay"];
// const m = ["bro", "i am fine", "yeah"];

// n.forEach((num1, index) => {
//   const p1 = document.createElement("p");
//   const p2 = document.createElement("p");
//   const num2 = m[index];

//   p1.textContent = num1;
//   p2.textContent = num2;

//   document.querySelector(".img-bg").append(p1);
//   document.querySelector(".img-bg").append(p2);
// });

//
// ${acc
//   .at(1)
//   .account.messages.receivedMsg.message.map((msg) => {
//     if (msg !== "") return `<p class="message1">${msg}</p>`;
//   })
//   .join("")}
// ${curUser.account.messages.receivedMsg.message
//   .map((msg) => {
//     if (msg !== "") return `<p class="message2">${msg}</p>`;
//   })
//   .join("")}

// // PUSH THE MSG INTO THE CURRENT USER SENT MSG ARRAY
// let sentMsg = curUser.account.messages.sentMsg.message;
// sentMsg.push(message.value);
// curUser.account.messages.sentMsg.to = acc.at(0);

// //  PUSH THE SENT MSG INTO THE RECEIVED MSG ARRAY OF THE USER THE MSG WAS SENT TO
// let receivedMsg = acc.at(1).account.messages.receivedMsg.message;
// receivedMsg.push(message.value);

// acc.at(1).account.messages.receivedMsg.from = curUser.account.userId;

// function writeUserData1(userId) {
//   const db = getDatabase();
//   update(ref(db, "users/" + userId + "/account"), {
//     messages: acc.at(1).account.messages,
//   });
// }
// writeUserData1(acc.at(0));

// // curacc

// function writeUserData2(userId) {
//   const db = getDatabase();
//   update(ref(db, "users/" + userId + "/account"), {
//     messages: curUser.account.messages,
//   });
// }
// writeUserData2(curUser.account.userId);

// function getData(userId) {
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `users/${userId}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// getData(acc.at(0));

// clickedUserReceivedMsg
//         .map((accMsg) => {
//           for (const msgS of Object.entries(accMsg))
//             if (msgS.at(0) === acc.at(0)) {
//               const messages = msgS.at(1);
//               return `<p class="message2">${messages}</p>`;
//             }
//         })
//         .join("")}
// ${clickedUserSentMsg
//   .map((accMsg) => {
//     for (const msgS of Object.entries(accMsg))
//       if (msgS.at(0) === acc.at(0)) {
//         const messages = msgS.at(1);
//         return `<p class="message1">${messages}</p>`;
//       }
//   })
//   .join("")

// clickedUserSentMsg
//   .map((accMsg, index) => {
//     const msg2 = clickedUserReceivedMsg[index];

//     for (const msgS of Object.entries(accMsg))
//     if (!msg2 === "") for (const msgR of Object.entries(msg2))
//         if (msgS.at(0) === acc.at(0) && msgR.at(0) === acc.at(0)) {
//           const message1 = msgS.at(1);
//           const message2 = msgR.at(1);
//           console.log(message1, message2);
//           return `
//         <p class="message2">${message2}</p>
//         <p class="message1">${message1}</p>
//         `;
//         }
//   })
//   .join("")
