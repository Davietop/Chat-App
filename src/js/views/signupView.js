class SignUpView {
  _btnParentContainer = document.querySelector(".btn-group");
  mainContent = document.querySelector(".main-content");
  _spinnerParent = document.querySelector(".spinner");

  _render() {
    const markUp = this.signInPageMarkUp();
    this._clear();
    this.mainContent.insertAdjacentHTML("afterbegin", markUp);
  }

  _addHandlerEmail(handle) {
    this._btnParentContainer.addEventListener("click", function (e) {
      const emailBtn = e.target.closest("#email");
      if (!emailBtn) return;
      handle();
    });
  }
  _addHandlerSignUp(handler) {
    this.mainContent.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest("#submit");
      if (!btn) return;
      handler();
    });
  }

  _clear() {
    this.mainContent.innerHTML = "";
  }

  signInPageMarkUp() {
    return `
          <form action=""  >
          <section class="logo">
          <h2>Chat</h2>
          <img src="./src/img/arroba.png" alt="" width="40px" />
          </section>
          <section>
          <p class="p-1">Create an account</p>
          </section>
          <section class="email">
          <label for="">Email</label>
          <input type="email" name="" id="email" value="Hello1237@gmail.com" />
          </section>
          <section class="password">
          <label for="">Password</label>
          <input type="password" name="" id="password"  value="123656573"/>
          </section>
          <input type="submit" id="submit" value="Sign Up" />
          </form>
  `;
  }
}

export default new SignUpView();
