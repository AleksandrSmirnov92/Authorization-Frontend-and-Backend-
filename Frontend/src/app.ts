const SignUp_Button = document.querySelector(".button_Sign_up")!;
const SignIn_Button = document.querySelector(".button_Sign_in")!;
const FormSignUp = document.querySelector(".SignUp_Wrapper")!;
const FormSignIn = document.querySelector(".SignIn_Wrapper")!;
let state = {
  nameClassButton: "",
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
