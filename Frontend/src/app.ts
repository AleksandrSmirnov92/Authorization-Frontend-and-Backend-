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
const button_submit = document.querySelector("#Form1")!;
const button_submit2 = document.querySelector("#Form2")!;
let state = {
  nameClassButton: "",
  values: {
    Login: "",
    Password: "",
    Repeat_password: "",
    Email: "",
  },
  valuesTrueSignIn: [false, false, false, false],
  valuesTrueSignUp: [false, false],
};

SignUp_Button.addEventListener("click", () => {
  state.nameClassButton = "Sign_up";
  console.log("Зарегестрироваться", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});
SignIn_Button.addEventListener("click", () => {
  state.nameClassButton = "Sign_in";
  console.log("Войти", state.nameClassButton);
  activate_SignIn_or_Sign_up();
});

button_submit.addEventListener("submit", (e) => {
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
  let include: any = state.valuesTrueSignIn.includes(false);
  // if (include === false) {
  //   (Login.value = ""), (Password.value = ""), (Repeat_password.value = "");
  //   createUsers();
  //   console.log("форма отправилась1");
  // } else {
  //   console.log("Заполните форму до конца");
  // }
  // Email.value = "";
  // console.log(JSON.stringify(state.values));
});
button_submit2.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Вход");
  const LoginAndEmail = document.querySelector(
    "[name= 'LoginAndPassword']"
  ) as HTMLInputElement;
  const PasswordSignUp = document.querySelector(
    "[name = 'PasswordSignUp']"
  ) as HTMLInputElement;
  formValidationSignUp(LoginAndEmail, PasswordSignUp);
  let include: any = state.valuesTrueSignIn.includes(false);
});

// --------------------------------------------------Function-----------------------------------------------------
function activate_SignIn_or_Sign_up() {
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
) {
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
) {
  let message: string = "";
  if (LoginAndEmail.value === "" || LoginAndEmail.value === null) {
    message = "вы ничего не ввели";
    Error_LoginAndEmail.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[0] = false;
  } else if (LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    console.log("Вы ввели емэйл");
    // запроса на поиск email
  } else if (!LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
    console.log("Вы ввели логин");
    // запрос на поиск логина
  }
  if (PasswordSignUp.value === "" || PasswordSignUp === null) {
    message = "Введите пароль";
    Error_PasswordSignUp.innerHTML = `<span>${message}</span>`;
    state.valuesTrueSignUp[1] = false;
  }
}
