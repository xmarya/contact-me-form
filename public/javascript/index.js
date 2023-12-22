import { sendEmail } from "./emailSend.js";
import { validateEmail, validateForm } from "./validateForm.js";
import { alert } from "./showAlerts.js";
import { startAnimation } from "./contentAnimation.js";



document.addEventListener("DOMContentLoaded", event => {
  event.preventDefault();

  startAnimation();
});

const formBtn = document.querySelector(".form-btn");
const form = document.querySelector(".email-form");
const formInput = document.querySelector(".email-form input");
const formTextarea = document.querySelector(".email-form textarea");

formInput.addEventListener("blur", validateEmail);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const clientEmail = formInput.value;
  const projectDetail = formTextarea.value;

  const formStatus = validateForm(); //returns an object

  if (!formStatus.formComplete.status) alert("error", formStatus.formComplete.message);
  
  
  else {
    formBtn.textContent = "sending...";
    sendEmail({ clientEmail, projectDetail });

    form.reset();
  }
});
