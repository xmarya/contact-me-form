
import { alert } from "./showAlerts.js";

const emailRegex = new RegExp(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/);

const formInputs = [document.querySelector(".email-form input"), document.querySelector(".email-form textarea")];

let formStatus = {
  formComplete : {
    status: false,
    message: "Please Fill out all the Fields before Submitting"
  },
  emailFormatIsCorrect : {
    status: false,
    message: "Please Insert a valid Email address!"
  },
}


const shakingField = function(field) {
  field.classList.add("shaking");
  setTimeout(() => {
   field.classList.remove("shaking");
  }, 400);
}


export const validateEmail = function (event) {
  formStatus.emailFormatIsCorrect.status = true;
  const userInput = event.target.value;
  if (userInput !== "" && !emailRegex.test(userInput) || !emailRegex.test(userInput)) {
    shakingField(event.target);
    alert("error", formStatus.emailFormatIsCorrect.message);
    formStatus.emailFormatIsCorrect.status = false;
  } 
};

export const validateForm = () => {
  formStatus.formComplete.status = true
   formInputs.forEach(input => {
      if(input.value.trim() === "") formStatus.formComplete.status = false;
   });   
   
   return formStatus;
}
