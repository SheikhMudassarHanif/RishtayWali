const formOpenBtn = document.querySelector("#form-open"),
  beginButton = document.querySelector("#beginButton"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => {
  home.classList.add("show");
  formContainer.classList.remove("active"); // Close sign-up form if open
});

formCloseBtn.addEventListener("click", () => {
  home.classList.remove("show");
  formContainer.classList.remove("active"); // Close sign-up form if open
});

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});



signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active"); // Open sign-up form
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active"); // Open login form
});

$(document).ready(function(){
  $("#testimonial-slider").owlCarousel({
      items:2,
      itemsDesktop:[1000,2],
      itemsDesktopSmall:[980,1],
      itemsTablet:[768,1],
      pagination:true,
      navigation:true,
      
      autoPlay:true
  });
});