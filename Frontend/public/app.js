"use strict";
const signUpButton = document.querySelector(".ButtonSignUp");
const signInButton = document.querySelector(".ButtonSignIn");
const formSignUp = document.querySelector(".SignUpWrapper");
const formSignIn = document.querySelector(".SignInWrapper");
const errorLogin = document.querySelector(".ErrorLogin");
const errorPassword = document.querySelector(".ErrorPassword");
const errorRepeatPassword = document.querySelector(".ErrorRepeatPassword");
const errorEmail = document.querySelector(".ErrorEmail");
const errorLoginAndEmail = document.querySelector(".ErrorLoginAndEmail");
const errorPasswordSignUp = document.querySelector(".ErrorPasswordSignUp");
const errorServer = document.querySelector(".ErrorServer");
const errorServerForSignUp = document.querySelector(".ErrorServerForSignUp");
const formOneSubmit = document.querySelector(".Form1");
const formTwoSubmit = document.querySelector(".Form2");
const login = document.querySelector(".Login");
const password = document.querySelector(".Password");
const repeatPassword = document.querySelector(".RepeatPassword");
const email = document.querySelector(".Email");
const loginAndEmail = document.querySelector(".LoginAndEmail");
const passwordSignUp = document.querySelector(".PasswordSignUp");
let state = {
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
formOneSubmit.addEventListener("submit", (e) => {
    console.log("отправить");
    e.preventDefault();
    if (formValidationSignIn(login, password, repeatPassword, email).includes(false)) {
        return console.log("Заполните форму до конца");
    }
    resetForm(state.nameClassButton);
    sendPostRequest(state.nameClassButton, state.values);
    console.log("форма отправилась SignIn");
});
formTwoSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Вход");
    if (formValidationSignUp(loginAndEmail, passwordSignUp).includes(false)) {
        return console.log("Заполните форму до конца");
    }
    resetForm(state.nameClassButton);
    sendPostRequest(state.nameClassButton, state.valuesSignUp);
    console.log("форма отправилась SignUp");
});
// --------------------------------------------------Function-----------------------------------------------------
function activate_SignIn_or_Sign_up() {
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
function formValidationSignIn(Login, Password, Repeat_password, Email) {
    let message = "";
    let valuesTrueSignIn = [false, false, false, false];
    // SignIn
    // Login
    if (Login.value === "" || Login.value === null) {
        message = "Введите логин";
        errorLogin.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[0] = false;
    }
    else if (Login.value.length <= 4) {
        message = "Логин слишком короткий";
        errorLogin.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[0] = false;
    }
    else {
        state.values.Login = Login.value;
        errorLogin.innerHTML = ``;
        valuesTrueSignIn[0] = true;
    }
    // Password
    if (Password.value === "" || Password.value === null) {
        message = "Введите пароль";
        errorPassword.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[1] = false;
    }
    else {
        state.values.Password = Password.value;
        errorPassword.innerHTML = "";
        valuesTrueSignIn[1] = true;
    }
    // Repeat password
    if (Repeat_password.value === "" || Repeat_password.value === null) {
        message = "Повторите пароль";
        errorRepeatPassword.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[2] = false;
    }
    else if (Repeat_password.value !== Password.value) {
        message = "Пароль не совпадает";
        errorRepeatPassword.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[2] = false;
    }
    else {
        state.values.Repeat_password = Repeat_password.value;
        errorRepeatPassword.innerHTML = "";
        valuesTrueSignIn[2] = true;
    }
    // Email
    if (Email.value === "" || Email.value === null) {
        message = "Напишите электронную почту";
        errorEmail.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[3] = false;
    }
    else if (!Email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        message = "Нерпавильно введен Email";
        errorEmail.innerHTML = `<span>${message}</span>`;
        valuesTrueSignIn[3] = false;
    }
    else {
        state.values.Email = Email.value;
        errorEmail.innerHTML = "";
        valuesTrueSignIn[3] = true;
    }
    return valuesTrueSignIn;
}
//----------------------------------------------- formValidationSignUp
function formValidationSignUp(LoginAndEmail, PasswordSignUp) {
    let message = "";
    let valuesTrueSignUp = [false, false];
    if (LoginAndEmail.value === "" || LoginAndEmail.value === null) {
        message = "вы ничего не ввели";
        errorLoginAndEmail.innerHTML = `<span>${message}</span>`;
        valuesTrueSignUp[0] = false;
    }
    else if (LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        state.valuesSignUp.Email = LoginAndEmail.value;
        state.valuesSignUp.Login = "";
        valuesTrueSignUp[0] = true;
        errorLoginAndEmail.innerHTML = "";
        console.log("Вы ввели емэйл");
    }
    else if (!LoginAndEmail.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
        state.valuesSignUp.Login = LoginAndEmail.value;
        state.valuesSignUp.Email = "";
        valuesTrueSignUp[0] = true;
        errorLoginAndEmail.innerHTML = "";
        console.log("Вы ввели логин");
    }
    if (PasswordSignUp.value === "" || PasswordSignUp === null) {
        message = "Введите пароль";
        errorPasswordSignUp.innerHTML = `<span>${message}</span>`;
        valuesTrueSignUp[1] = false;
    }
    else {
        state.valuesSignUp.Password = PasswordSignUp.value;
        valuesTrueSignUp[1] = true;
        errorPasswordSignUp.innerHTML = "";
    }
    return valuesTrueSignUp;
}
function sendPostRequest(nameClassButton, state) {
    fetch("http://localhost:3000/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nameClassButton: nameClassButton,
            state: state,
        }),
    })
        .then((responce) => responce.json())
        .then((responce) => {
        if (responce.status === "SUCCESS") {
            setTimeout(() => {
                window.location.href = "http://localhost:3000/home";
            }, 1000);
        }
        else {
            let message = responce.message;
            if (nameClassButton === "Sign_in") {
                errorServer.innerHTML = `<h5>${message}</h5>`;
                setTimeout(() => {
                    errorServer.innerHTML = ``;
                }, 2000);
            }
            if (nameClassButton === "Sign_up") {
                errorServerForSignUp.innerHTML = `<h5>${message}</h5>`;
                setTimeout(() => {
                    errorServerForSignUp.innerHTML = ``;
                }, 2000);
            }
        }
    });
}
function resetForm(nameClassButton) {
    if (nameClassButton === "Sign_in") {
        (login.value = ""),
            (password.value = ""),
            (repeatPassword.value = ""),
            (email.value = "");
    }
    if (nameClassButton === "Sign_up") {
        (loginAndEmail.value = ""), (passwordSignUp.value = "");
    }
}
