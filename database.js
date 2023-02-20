import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyBtCpZBuPCQtSo88jH628VtCxUPMqBut9Y",
  authDomain: "crypto-4fb35.firebaseapp.com",
  projectId: "crypto-4fb35",
  storageBucket: "crypto-4fb35.appspot.com",
  messagingSenderId: "963473078559",
  appId: "1:963473078559:web:1792d1216b18eedc7f582a",
  measurementId: "G-1DCEF5H614",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const user = db.collection("user");

const name = document.querySelector("#inputName");
const email = document.querySelector("#inputEmail");
const age = document.querySelector("#inputAge");
const phone = document.querySelector("#inputPhone");
const checkbox = document.querySelector("#termsCheckbox");
const submitButton = document.querySelector("#submit-btn");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  const nameRegex = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,}$/;
  const ageRegex = /^(?:[1-9]|[1-9][0-9])$/;
  const phoneRegex = /^(?:\+[\d-]{1,}|[\d-]{1,})\d{4,}[\d-]*$/;

  const message = document.getElementById("toast-msg");
  const toastLive = document.getElementById("liveToast");

  let allChecks = false;
  if (
    nameRegex.test(name.value) &&
    emailRegex.test(email.value) &&
    ageRegex.test(age.value) &&
    phoneRegex.test(phone.value) &&
    checkbox.checked
  ) {
    user
      .add({
        name: name.value,
        email: email.value,
        age: age.value,
        phone: phone.value,
      })
      .then(function (user) {
        message.innerHTML = "Success!";
        toastLive.classList.add("green-toast");
        toastLive.classList.remove("red-toast");
        console.log("Document written with ID: ", user.id);
      })
      .catch(function (error) {
        toastLive.classList.add("red-toast");
        toastLive.classList.remove("green-toast");
        message.innerHTML = "Something went wrong. Try again later!";
        console.error("Error adding document: ", error);
      });
  } else {
    message.innerHTML = "Please verify your data again!";
    toastLive.classList.add("red-toast");
    toastLive.classList.remove("green-toast");
  }
  const toast = new bootstrap.Toast(toastLive);
  toast.show();
});
