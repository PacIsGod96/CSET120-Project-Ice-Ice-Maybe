// nav hamburger menu

function nav() {
    let menu = document.getElementById("menu-links")
    if (menu.style.top === "-200px") {
        menu.style.top = "0";
    } else {
        menu.style.top = "-200px"
    }
}

// responsive desk nav

window.addEventListener('scroll', function() {
    let scrollThreshold = 200;
    let tabNav = this.document.getElementById("tab-nav")
    let deskNav = this.document.getElementById("desk-nav")
    if (window.scrollY > scrollThreshold) {
        tabNav.style.backdropFilter = "blur(10px)" 
        deskNav.style.backdropFilter = "blur(10px)" 
        tabNav.style.opacity = "0.7"
        deskNav.style.opacity = "0.7"
        deskNav.style.padding = "20px 0"
        deskNav.style.top = "0"
        tabNav.style.top = "0"
    } else {
        tabNav.style.backdropFilter = "none" 
        deskNav.style.backdropFilter = "none" 
        tabNav.style.opacity = "1"
        deskNav.style.opacity = "1"
        deskNav.style.padding = "0"
    }
})

// review function
const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {  
    let name = document.getElementById("name");
    let stars = document.getElementById("stars");
    let review = document.getElementById("review");

    reviewForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let newReview = {
            userName: name.value,
            starRating: stars.value,
            feedback: review.value
        };

        const container = document.getElementById("review-container");
        const container2 = document.getElementById("msg-container");

        container.innerHTML = `
            <h3>${newReview.userName}</h3>
            <p>⭐ ${newReview.starRating} / 5</p>
            <p>"${newReview.feedback}"</p>
        `;

        container2.innerHTML = "<br><p>Thank You for Your Feedback!</p>";
    });
}


//Sign In/Sign Up
function passwordToggle(id, link){
    let input = document.getElementById(id)
    if(input.type == `password`){
        input.type = `text`
        link.textContent = `Hide Password`
    }else{
        input.type = `password`
        link.textContent = `Show Password`
    }
}
document.addEventListener("DOMContentLoaded", () =>{
    let loginSignUpBtn = document.querySelectorAll(".login-SignUp-Btn")
    let modal = document.getElementById("modal")
    let xBtns = document.querySelectorAll(".xIcon-Btn")
    let loginPanel = document.querySelector(".login")
    let signUpPanel = document.querySelector(".signUp")
    let signUpBtn = document.querySelector(".signUpBtn")
    let switchToSignUpLink = document.getElementById("goToSignUp")
    let switchToLoginLink = document.getElementsByClassName("signUpBtn")[0]
    let loginBtn = document.querySelector(".loginBtn")
    let signUpInputs = document.querySelector(".signUp").querySelectorAll("input")
    let loginInputs = document.querySelector(".login").querySelectorAll("input")
    let users = []

    loginSignUpBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex"
            loginPanel.classList.add("active")
            signUpPanel.classList.remove("active")
            document.body.style.position = "fixed"
            loginBtn.disabled = true
            loginBtn.style.color = "black"
        })
    })
   
    xBtns.forEach(xBtn => {
        xBtn.addEventListener("click", () => {
            modal.style.display = "none"
            loginPanel.classList.remove("active")
            signUpPanel.classList.remove("active")
            document.body.style.position = "static"
        })
    })

    if(switchToSignUpLink){
        switchToSignUpLink.addEventListener("click", (e) => {
            e.preventDefault()
            loginPanel.classList.remove("active")
            signUpPanel.classList.add("active")
            signUpBtn.disabled = true
            signUpBtn.style.color = "black"
            
            let scrollContainers= modal.querySelectorAll(".scroll-inner")
            scrollContainers.forEach(container => {
                container.scrollTop = 0
            })

            inputCheck()
        })
        
    }

    if(signUpBtn){
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault()
            let newUser = storeSignUpInfo()
            console.log(newUser)
            for(let i = 0; i < signUpInputs.length; i++){
                signUpInputs[i].value = ""
            }   
            loginPanel.classList.add("active")
            signUpPanel.classList.remove("active")

        })
    }
    //function to check and see if all the inputs were filled 
    function inputCheck(){
        let allFilled = true
        for(let i = 0; i < signUpInputs.length; i++){
            if(signUpInputs[i].value.trim() == ""){
                allFilled = false
                break
            }
        }
        signUpBtn.disabled = !allFilled
        
    }
    
    for(let i = 0; i < signUpInputs.length; i++){
        signUpInputs[i].addEventListener("input", inputCheck)
    }

    inputCheck()

    function loginInputCheck(){
        let allFilled = true
        for(let i = 0; i < loginInputs.length; i++){
            if(loginInputs[i].value.trim() == ""){
                allFilled = false
                break
            }
            loginBtn.disabled = false
        }
    }

    //function to store the info
    function storeSignUpInfo(){
        let newUser = {}
        let inputMap = {
            "firstName": "firstname",
            "lastName": "lastName",
            "username": "signUp-username",
            "password": "signUp-password",
            "email": "email",
            "address": "address",
            "city": "city",
            "zipcode": "zipCode",
            "firstNameOnCard": "firstName-card",
            "middleInitial": "middleInitial",
            "lastNameOnCard": "lastName-card",
            "cardNumber": "cardNumber",
            "cvv": "cvv"
        }

        signUpInputs.forEach(input => {
            let propName = inputMap[input.id] || input.id
            newUser[propName] = input.value.trim()
        })

        users.push(newUser)

        return newUser
    }

    if(loginBtn){
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault
            let loginUsername = document.getElementById("login-username").value.trim()
            let loginPassword = document.getElementById("login-password").value.trim()
            for(let i = 0; i < users.length; i++){
                if(loginUsername == users[i].username && loginPassword == users[i].password){
                    modal.style.display = "none"
                    loginPanel.classList.remove("active")
                    signUpPanel.classList.remove("active")
                    document.body.style.position = "static"
                    break
                }
            }
        })
    }
})
