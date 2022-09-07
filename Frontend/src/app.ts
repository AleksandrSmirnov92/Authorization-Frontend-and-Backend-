const SignUp_Button = document.querySelector(".button_Sign_up")!;
const SignIn_Button = document.querySelector(".button_Sign_in")!;
const FormSignUp = document.querySelector(".SignUp_Wrapper")!;
const FormSignIn = document.querySelector(".SignIn_Wrapper")!;
const Error_Login = document.querySelector("#Error_Login")!;
const Error_Password = document.querySelector("#Error_Password")!;
const Error_Repeat_Password = document.querySelector("#Error_Repeat_Password")!;
const Error_Email = document.querySelector("#Error_Email")!;
const Error_LoginAndEmail = document.querySelector("#Error_LoginAndEmail")!;
const Error_PasswordSignUp = document.querySelector("#Error_PasswordSignUp")!;
const Error_Server = document.querySelector("#Error_Server")!;
const Error_ServerForSignUp = document.querySelector("#Error_ServerForSignUp")!;
const button_submit = document.querySelector("#Form1")!;
const button_submit2 = document.querySelector("#Form2")!;
interface State {
  nameClassButton: string;
  values: {
    Login: string;
    Password: number | string;
    Repeat_password: number | string;
    Email: string;
  };
  valuesSignUp: {
    Login: string;
    Email: string;
    Password: string | number;
  };
  valuesTrueSignIn: boolean[];
  valuesTrueSignUp: boolean[];
}
let state: State = {
  nameClassButton: "",
  values: {
    Login: "",
    Password: "",
    Repeat_password: "",
    Email: "",
  },
  valuesSignUp: {
    Login: "",
    Email: "",
    Password: "",
  },
  valuesTrueSignIn: [false, false, false, false],
  valuesTrueSignUp: [false, false],
};
// document.cookie = "username=Sasha";
SignIn_Button.addEventListener("click", () => {
  state.nameClassButton = "Sign_in";
  console.log("Зарегестрироваться", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});
SignUp_Button.addEventListener("click", () => {
  state.nameClassButton = "Sign_up";
  console.log("Войти", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});

button_submit.addEventListener("submit", (e: Event) => {
  console.log("отправить");
  e.preventDefault();
  const Login = document.querySelector("[name = 'Login']") as HTMLInputElement;
  const Password = document.querySelector(
    "[name = 'Password']"
  ) as HTMLInputElement;
  const Repeat_password = document.querySelector(
    "[name = 'RepeatPassword']"
  ) as HTMLInputElement;
  const Email = document.querySelector("[name = 'Email']") as HTMLInputElement;

  formValidationSignIn(Login, Password, Repeat_password, Email);
  let include: boolean = state.valuesTrueSignIn.includes(false);
  if (include === false) {
    (Login.value = ""),
      (Password.value = ""),
      (Repeat_password.value = ""),
      (Email.value = "");
    sendPostSignIn();
    console.log("форма отправилась1");
  } else {
    console.log("Заполните форму до конца");
  }
});
button_submit2.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  console.log("Вход");
  const LoginAndEmail = document.querySelector(
    "[name= 'LoginAndPassword']"
  ) as HTMLInputElement;
  const PasswordSignUp = document.querySelector(
    "[name = 'PasswordSignUp']"
  ) as HTMLInputElement;
  formValidationSignUp(LoginAndEmail, PasswordSignUp);
  let include: boolean = state.valuesTrueSignUp.includes(false);
  if (include === false) {
    (LoginAndEmail.value = ""), (PasswordSignUp.value = "");
    sendPostSignUp();
    console.log("форма отправилась1");
  } else {
    console.log("Заполните форму до конца");
  }
  console.log(state.valuesSignUp);
});

// --------------------------------------------------Function-----------------------------------------------------
function activate_SignIn_or_Sign_up(): void {
  if (state.nameClassButton === "Sign_up") {
    FormSignIn.classList.remove("d-none");
    FormSignUp.classList.add("d-none");
  }
  if (state.nameClassButton === "Sign_in") {
    FormSignUp.classList.remove("d-none");
    FormSignIn.classList.add("d-none");
  }
}
//----------------------------------------------- formValidationSignIn
function formValidationSignIn(
  Login: HTMLInputElement,
  Password: HTMLInputElement,
  Repeat_password: HTMLInputElement,
  Email: HTMLInputElement
): void {
  let message: string = "";
  // SignIn
  // Login
  if (Login.value === "" || Login.value === null) {
    message = "Введите логин";
    Error_Login.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[0] = false;
  } else if (Login.value.length <= 4) {
    message = "Логин слишком короткий";
    Error_Login.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[0] = false;
  } else {
    state.values.Login = Login.value;
    Error_Login.innerHTML = ``;
    state.valuesTrueSignIn[0] = true;
  }
  // Password
  if (Password.value === "" || Password.value === null) {
    message = "Введите пароль";
    Error_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[1] = false;
  } else {
    state.values.Password = Password.value;
    Error_Password.innerHTML = "";
    state.valuesTrueSignIn[1] = true;
  }
  // Repeat password
  if (Repeat_password.value === "" || Repeat_password.value === null) {
    message = "Повторите пароль";
    Error_Repeat_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[2] = false;
  } else if (Repeat_password.value !== Password.value) {
    message = "Пароль не совпадает";
    Error_Repeat_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[2] = false;
  } else {
    state.values.Repeat_password = Repeat_password.value;
    Error_Repeat_Password.innerHTML = "";
    state.valuesTrueSignIn[2] = true;
  }
  // Email
  if (Email.value === "" || Email.value === null) {
    message = "Напишите электронную почту";
    Error_Email.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[3] = false;
  } else if (!Email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    message = "Нерпавильно введен Email";
    Error_Email.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[3] = false;
  } else {
    state.values.Email = Email.value;
    Error_Email.innerHTML = "";
    state.valuesTrueSignIn[3] = true;
  }
}
//----------------------------------------------- formValidationSignUp
function formValidationSignUp(
  LoginAndEmail: HTMLInputElement,
  PasswordSignUp: HTMLInputElement
): void {
  let message: string = "";
  if (LoginAndEmail.value === "" || LoginAndEmail.value === null) {
    message = "вы ничего не ввели";
    Error_LoginAndEmail.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[0] = false;
  } else if (LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    state.valuesSignUp.Email = LoginAndEmail.value;
    state.valuesSignUp.Login = "";
    state.valuesTrueSignUp[0] = true;
    Error_LoginAndEmail.innerHTML = "";
    console.log("Вы ввели емэйл");
  } else if (!LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    state.valuesSignUp.Login = LoginAndEmail.value;
    state.valuesSignUp.Email = "";
    state.valuesTrueSignUp[0] = true;
    Error_LoginAndEmail.innerHTML = "";
    console.log("Вы ввели логин");
  }
  if (PasswordSignUp.value === "" || PasswordSignUp === null) {
    message = "Введите пароль";
    Error_PasswordSignUp.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[1] = false;
  } else {
    state.valuesSignUp.Password = PasswordSignUp.value;
    state.valuesTrueSignUp[1] = true;
    Error_PasswordSignUp.innerHTML = "";
  }
}
// ---------------------------------------------signUp
function sendPostSignUp() {
  fetch("http://localhost:3000/home", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nameClassButton: state.nameClassButton,
      state: state.valuesSignUp,
    }),
  })
    .then((responce) => responce.json())
    .then((responce) => {
      if (responce.status === "SUCCESS") {
        setTimeout(() => {
          window.location.href = "http://localhost:3000/home";
        }, 1000);
      } else {
        let message: string = responce.message;
        console.log(responce, message);
        Error_ServerForSignUp.innerHTML = `<h5>${message}</h5>`;
        setTimeout(() => {
          Error_ServerForSignUp.innerHTML = "";
        }, 2000);
      }
    });
}
function sendPostSignIn() {
  fetch("http://localhost:3000/home", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nameClassButton: state.nameClassButton,
      state: state.values,
    }),
  })
    .then((responce) => responce.json())
    .then((responce) => {
      console.log(responce.status);
      if (responce.status === "SUCCESS") {
        setTimeout(() => {
          window.location.href = "http://localhost:3000/home";
        }, 1000);
      } else {
        let message: string = responce.message;
        Error_Server.innerHTML = `<h5>${message}</h5>`;
        setTimeout(() => {
          Error_Server.innerHTML = ``;
        }, 2000);
      }
    });
}
