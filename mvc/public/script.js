const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
 

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {
    console.log("Scroll event fired!");
    if (window.scrollY > 0) {
        console.log("Adding scrolled class.");
        navbar.classList.add("scrolled");
    } else {
        console.log("Removing scrolled class.");
        navbar.classList.remove("scrolled");
    }
});





$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:1,
        itemsDesktop:[1000,1],
        itemsDesktopSmall:[979,1],
        itemsTablet:[768,1],
        pagination:true,
        transitionStyle:"backSlide",
        autoPlay:true
    });
});

const getStartedBtn = document.getElementById("get-started-btn");


// Function to show signup form
function showSignupForm() {
    // Add class to body to show popup
    document.body.classList.add("show-popup");
    // Add class to form-popup to show signup form
    formPopup.classList.add("show-signup");
}

// Event listener for Get Started button
getStartedBtn.addEventListener("click", showSignupForm);

const pdfLink = document.getElementById("pdf-link");

pdfLink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link

    // Replace "path_to_your_pdf_file.pdf" with the actual path to your PDF file
    const pdfFile = "terms and conditions.pdf";

    // Open the PDF file in a new tab
    window.open(pdfFile, "_blank");
});

const forgotPasswordLink = document.querySelector(".forgot-pass-link");

forgotPasswordLink.addEventListener("click", () => {
    // Hide the signup form
    formPopup.classList.remove("show-signup");
    
    // Show the login form
    formPopup.classList.add("show-login");

    // Update form content for the login form
    const loginFormContent = document.querySelector(".login .form-content");
    loginFormContent.innerHTML = `
        <h2>Forgot Password</h2>
        <form action="/forgot-password" method="POST">
            <div class="input-field">
                <input type="email" name="email" required>
                <label>Email</label>
            </div>
            <button type="submit">Submit</button>
        </form>
    `;

    // Hide the signup form content
    const signupFormContent = document.querySelector(".signup .form-content");
    signupFormContent.style.display = "none";
});

// Event listener for the close button
closePopupBtn.addEventListener("click", () => {
    // Hide the form popup
    document.body.classList.remove("show-popup");

    // Check if the form is in the "forgot password" or "signup" state
    if (formPopup.classList.contains("show-forgot-password") || formPopup.classList.contains("show-signup")) {
        // Hide the forgot password form or signup form
        formPopup.classList.remove("show-forgot-password");
        formPopup.classList.remove("show-signup");

        // Show the login form
        formPopup.classList.add("show-login");

        // Reset the form content for the login form
        const loginFormContent = document.querySelector(".login .form-content");
        loginFormContent.innerHTML = `
            <h2>Login</h2>
            <form action="/submittedsignupform" method="POST">
                <div class="input-field">
                    <input type="text" name='email' required>
                    <label>Email</label>
                </div>
                <div class="input-field">
                    <input type="password" required>
                    <label>Password</label>
                </div>
                <a href="#" class="forgot-pass-link">Forgot password?</a>
                <button type="submit">Log In</button>
            </form>
            <div class="bottom-link">
                Don't have an account?
                <a href="" id="signup-link">Signup</a>
            </div>
        `;
    }
});
