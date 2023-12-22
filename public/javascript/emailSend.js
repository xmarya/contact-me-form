
import { useFetch } from "./fetchData.js";
import { alert } from "./showAlerts.js";


const formBtn = document.querySelector(".form-btn");

export const sendEmail = async (data) => {

  try {
    const result = await useFetch("/sendEmail", data);

    if (result.status === "success") {
      formBtn.classList.add("form-btn--rounded");
      formBtn.textContent = "✔";
      alert("success", "Your email has been sent successfully! 👍");
    }
      
    if (result.status !== "success") return;

  } catch (error) {
    alert("error", error.message);
  }
};
