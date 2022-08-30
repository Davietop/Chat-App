import chatimg1 from "../../img/chatimg1.jpg";
import chatimg2 from "../../img/chatimg2.jpg";
import chatimg3 from "../../img/chatimg3.jpg";
import chatimg4 from "../../img/chatimg4.jpg";
import arroba from "../../img/arroba (2).png";
import use from "../../img/use.jpg";
import send from "../../img/send.png";

console.log(send);

class ChatView {
  _body = document.querySelector("body");
  _whole = document.querySelector(".whole");

  _clear() {
    this._whole.innerHTML = "";
  }

  _render(data) {
    const markUp = this._chatpageMarkUp(data);
    this._clear();
    this._body.insertAdjacentHTML("afterbegin", markUp);
  }

  _chatpageMarkUp(data) {
    return `
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

        <section class="chat-box">
          <img src="${chatimg1}" alt="" />
          <section class="message">
            <h4>Kate S</h4>
            <p>Hello David. How are you doing...</p>
          </section>
        </section>
        <section class="chat-box">
          <img src="${chatimg2}" alt="" />
          <section class="message">
            <h4>Jonas S</h4>
            <p>Hello David. How are you doing...</p>
          </section>
        </section>
        <section class="chat-box">
          <img src="${chatimg3}" alt="" />
          <section class="message">
            <h4>Tolu D</h4>
            <p>Hello David. How are you doing...</p>
          </section>
        </section>
        <section class="chat-box">
          <img src="${chatimg4}" alt="" />
          <section class="message">
            <h4>Fola B</h4>
            <p>Hello David... I miss you baby❤️😍</p>
          </section>
        </section>
        <section class="chat-box">
          <img src="${use}" alt="" />
          <section class="message">
            <h4>Adeoluwa</h4>
            <p>Bro how far na</p>
          </section>
        </section>
      </section>

      <section class="width">
        <section class="message-box">
          <section class="top-box">
            <section class="name">
              <img src="${chatimg1}" alt="" />
              <section class="about">
                <h4>${data.userName}</h4>
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
              <p class="message1">Hii there David</p>
              <p class="message2">Bro how are you doing</p>
              <p class="message1">I am fine man</p>
              <p class="message1">I hope you good too??</p>
              <p class="message2">
                I am fine too just sorting out some things
              </p>
              <p class="message1">
                Ohh that is amazing i hope you figure it out man
              </p>
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
      </section>

      <section class="icon-logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </section>
    </fieldset>
  </main>
        `;
  }
}
export default new ChatView();
