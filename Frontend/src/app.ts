const signUpButton = document.querySelector(".ButtonSignUp")!;
const signInButton = document.querySelector(".ButtonSignIn")!;
const formSignUp = document.querySelector(".SignUpWrapper")!;
const formSignIn = document.querySelector(".SignInWrapper")!;
const errorLogin = document.querySelector(".ErrorLogin")!;
const errorPassword = document.querySelector(".ErrorPassword")!;
const errorRepeatPassword = document.querySelector(".ErrorRepeatPassword")!;
const errorEmail = document.querySelector(".ErrorEmail")!;
const errorLoginAndEmail = document.querySelector(".ErrorLoginAndEmail")!;
const errorPasswordSignUp = document.querySelector(".ErrorPasswordSignUp")!;
const errorServer = document.querySelector(".ErrorServer")!;
const errorServerForSignUp = document.querySelector(".ErrorServerForSignUp")!;
const formOneSubmit = document.querySelector(".Form1")!;
const formTwoSubmit = document.querySelector(".Form2")!;
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
signInButton.addEventListener("click", () => {
  state.nameClassButton = "Sign_in";
  console.log("Зарегестрироваться", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});
signUpButton.addEventListener("click", () => {
  state.nameClassButton = "Sign_up";
  console.log("Войти", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});

formOneSubmit.addEventListener("submit", (e: Event) => {
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
    console.log("форма отправилась SignIn");
  } else {
    console.log("Заполните форму до конца");
  }
});
formTwoSubmit.addEventListener("submit", (e: Event) => {
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
    console.log("форма отправилась SignUp");
  } else {
    console.log("Заполните форму до конца");
  }
  console.log(state.valuesSignUp);
});

// --------------------------------------------------Function-----------------------------------------------------
function activate_SignIn_or_Sign_up(): void {
  if (state.nameClassButton === "Sign_up") {
    formSignIn.classList.remove("d-none");
    formSignUp.classList.add("d-none");
  }
  if (state.nameClassButton === "Sign_in") {
    formSignUp.classList.remove("d-none");
    formSignIn.classList.add("d-none");
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
    errorLogin.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[0] = false;
  } else if (Login.value.length <= 4) {
    message = "Логин слишком короткий";
    errorLogin.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[0] = false;
  } else {
    state.values.Login = Login.value;
    errorLogin.innerHTML = ``;
    state.valuesTrueSignIn[0] = true;
  }
  // Password
  if (Password.value === "" || Password.value === null) {
    message = "Введите пароль";
    errorPassword.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[1] = false;
  } else {
    state.values.Password = Password.value;
    errorPassword.innerHTML = "";
    state.valuesTrueSignIn[1] = true;
  }
  // Repeat password
  if (Repeat_password.value === "" || Repeat_password.value === null) {
    message = "Повторите пароль";
    errorRepeatPassword.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[2] = false;
  } else if (Repeat_password.value !== Password.value) {
    message = "Пароль не совпадает";
    errorRepeatPassword.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[2] = false;
  } else {
    state.values.Repeat_password = Repeat_password.value;
    errorRepeatPassword.innerHTML = "";
    state.valuesTrueSignIn[2] = true;
  }
  // Email
  if (Email.value === "" || Email.value === null) {
    message = "Напишите электронную почту";
    errorEmail.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[3] = false;
  } else if (!Email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    message = "Нерпавильно введен Email";
    errorEmail.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignIn[3] = false;
  } else {
    state.values.Email = Email.value;
    errorEmail.innerHTML = "";
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
    errorLoginAndEmail.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[0] = false;
  } else if (LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    state.valuesSignUp.Email = LoginAndEmail.value;
    state.valuesSignUp.Login = "";
    state.valuesTrueSignUp[0] = true;
    errorLoginAndEmail.innerHTML = "";
    console.log("Вы ввели емэйл");
  } else if (!LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    state.valuesSignUp.Login = LoginAndEmail.value;
    state.valuesSignUp.Email = "";
    state.valuesTrueSignUp[0] = true;
    errorLoginAndEmail.innerHTML = "";
    console.log("Вы ввели логин");
  }
  if (PasswordSignUp.value === "" || PasswordSignUp === null) {
    message = "Введите пароль";
    errorPasswordSignUp.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[1] = false;
  } else {
    state.valuesSignUp.Password = PasswordSignUp.value;
    state.valuesTrueSignUp[1] = true;
    errorPasswordSignUp.innerHTML = "";
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
        errorServerForSignUp.innerHTML = `<h5>${message}</h5>`;
        setTimeout(() => {
          errorServerForSignUp.innerHTML = "";
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
      if (responce.status === "SUCCESS") {
        setTimeout(() => {
          window.location.href = "http://localhost:3000/home";
        }, 1000);
      } else {
        let message: string = responce.message;
        errorServer.innerHTML = `<h5>${message}</h5>`;
        setTimeout(() => {
          errorServer.innerHTML = ``;
        }, 2000);
      }
    });
}
