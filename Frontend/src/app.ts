const SignUp_Button = document.querySelector(".button_Sign_up")!;
const SignIn_Button = document.querySelector(".button_Sign_in")!;
const FormSignUp = document.querySelector(".SignUp_Wrapper")!;
const FormSignIn = document.querySelector(".SignIn_Wrapper")!;
const Error_Login = document.querySelector("#Error_Login")!;
const Error_Password = document.querySelector("#Error_Password")!;
const Error_Repeat_Password = document.querySelector("#Error_Repeat_Password")!;
const Error_Email = document.querySelector("#Error_Email");
const button_submit = document.querySelector("#Form1")!;
let state = {
  nameClassButton: "",
  values: {
    Login: "",
    Password: "",
    Repeat_password: "",
    Email: null,
  },
  valuesTrue: [false, false, false],
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
  const Login = document.querySelector("[name = 'Login']") as HTMLInputElement;
  const Password = document.querySelector(
    "[name = 'Password']"
  ) as HTMLInputElement;
  const Repeat_password = document.querySelector(
    "[name = 'RepeatPassword']"
  ) as HTMLInputElement;
  e.preventDefault();
  formValidation(Login, Password, Repeat_password);
  let include: any = state.valuesTrue.includes(false);
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

function formValidation(
  Login: HTMLInputElement,
  Password: HTMLInputElement,
  Repeat_password: HTMLInputElement
) {
  let message: string = "";
  // Login
  if (Login.value === "" || Login.value === null) {
    message = "Введите логин";
    Error_Login.innerHTML = `<span>${message}</span>`;
    state.valuesTrue[0] = false;
  } else if (Login.value.length <= 4) {
    message = "Логин слишком короткий";
    Error_Login.innerHTML = `<span>${message}</span>`;
    state.valuesTrue[0] = false;
  } else {
    state.values.Login = Login.value;
    Error_Login.innerHTML = ``;
    state.valuesTrue[0] = true;
  }
  // Password
  if (Password.value === "" || Password.value === null) {
    message = "Введите пароль";
    Error_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrue[1] = false;
  } else {
    state.values.Password = Password.value;
    Error_Password.innerHTML = "";
    state.valuesTrue[1] = true;
  }
  // Repeat password
  if (Repeat_password.value === "" || Repeat_password.value === null) {
    message = "Повторите пароль";
    Error_Repeat_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrue[2] = false;
  } else if (Repeat_password.value !== Password.value) {
    message = "Пароль не совпадает";
    Error_Repeat_Password.innerHTML = `<span>${message}</span>`;
    state.valuesTrue[2] = false;
  } else {
    state.values.Repeat_password = Repeat_password.value;
    Error_Repeat_Password.innerHTML = "";
    state.valuesTrue[2] = true;
  }
}
