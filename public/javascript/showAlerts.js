
const formBtn = document.querySelector(".form-btn");
let refresh;
const hideAlert = () => {
  const element = document.querySelector(".alert");
  if(element) element.parentElement.removeChild(element);
  formBtn.classList.remove("form-btn--rounded"); // remove it at the same time of hiding the alert

  if(refresh) setTimeout(() => location.assign("/"), 0.5 * 1000);
}

export const alert = (type, msg) => {
  const htmlCode = `<div class="alert alert--${type}">${msg}</div>`
  document.querySelector("body").insertAdjacentHTML("afterbegin", htmlCode);
  type === "success"? refresh = true : refresh = false;

  window.setTimeout(hideAlert, 4 *1000);
};
