// nav hamburger menu
let menu = document.getElementById("menu-links")
function nav() {
    if (menu.style.top === "-210px") {
        menu.style.top = "0";
        menu.style.zIndex = "9998"
    } else {
        menu.style.top = "-210px"
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
    let loginBtn = document.querySelector(".loginBtn")

    let signUpInputs = document.querySelector(".signUp").querySelectorAll("input")
    let signUpFirstNameInput = document.getElementById("firstName")
    let signUpLastNameInput = document.getElementById("lastName")
    let signUpUsernameInput = document.getElementById("signUp-username")
    let signUpPasswordInput = document.getElementById("signup-username")
    let signUpEmailInput = document.getElementById("email")
    let signUpAddressInput = document.getElementById("address")
    let signUpCityInput = document.getElementById("city")
    let signUpZipCodeInput = document.getElementById("zipCode")
    let signUpCardInfoFirstNameInput = document.getElementById("firstName-card")
    let signUpCardInfoMiddleInitialInput = document.getElementById("middleInitial-card")
    let signUpCardInfoLastNameInput = document.getElementById("lastName-card")
    let signUpCardNumberInput = document.getElementById("cardNumber")
    let signUpCardCVV = document.getElementById("cvv")

    loginSignUpBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex"
            loginPanel.classList.add("active")
            signUpPanel.classList.remove("active")
            document.body.style.position = "fixed"
            loginBtn.disabled = true
            loginBtn.style.color = "black"
            menu.style.top = "-210px"
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
        })
    }

    if(signUpBtn){
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault()
            loginPanel.classList.add("active")
            signUpPanel.classList.remove("active")
        })
    }

    //function to check and see if all the inputs were filled 
    function inputCheck(){
        let contains = 0
        for(let i = 0; i < signUpInputs.length; i++){
            if(signUpInputs[i].value.trim() !== ""){
                contains = contains + 1
            }
        }
        if(contains == 13){
            signUpBtn.disabled = false 
        }else{
            signUpBtn.disabled = true
        }
    }

    //function to store the info

})

// menu

class menuItem {
    constructor(name, desc, img, price) {
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.price = price;
    }

    toHTML() {
        return `
            <div class="menu-item">
                ${this.img}
                <h3>${this.name}</h3>
                <p>${this.desc}</p>
                <span class="price">${this.price}</span>
            </div>
        `;
    }
}


let items = [
    item1 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item2 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item3 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item4 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item5 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item6 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item7 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item8 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item9 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item10 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item11 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item12 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item13 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item14 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item15 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item16 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item17 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item18 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item19 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67"),
    item20 = new menuItem("Item", "description", `<img src="Images/404.png" alt="img">`,"$67")
]

function appendMenu() {
    let menuContainer = document.getElementById("menuContainer");

    for(let i = 0; i <= 20; i++) {
        let item = items[i];
        menuContainer.innerHTML = item.toHTML();
    }
}

appendMenu();
