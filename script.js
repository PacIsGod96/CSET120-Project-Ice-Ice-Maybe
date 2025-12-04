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
let toggleLinks = document.querySelectorAll(".password-toggle")

toggleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault()
        let targetId = this.dataset.target
        let input = document.getElementById(targetId)

        if(input.type == "password"){
            input.type = "text"
            this.textContent = "Hide Password"
        }else{
            input.type = "password"
            this.textContent = "Show Password"
        }
    })
})
window.onload = () => {
    let loginSignUpBtn = document.querySelectorAll(".login-SignUp-Btn")
    let loggedIn = localStorage.getItem("loggedIn")
    if(loggedIn == "true"){
        loginSignUpBtn.forEach(btn => {
            btn.style.display = "none"
        })
        
    }else{
        loginSignUpBtn.forEach(btn => {
            btn.style.display = "flex"
        })
    }
    let xBtns = document.querySelectorAll(".xIcon-Btn")
    let loginPanel = document.querySelector(".login")
    let signUpPanel = document.querySelector(".signUp")
    let signUpBtn = document.querySelector(".signUpBtn")
    let switchToSignUpLink = document.getElementById("goToSignUp")
    let alrHaveAccount = document.getElementById("alrHaveAccount")
    let switchToLoginLink = document.getElementsByClassName("signUpBtn")[0]
    let loginBtn = document.querySelector(".loginBtn")
    let signUpInputs = signUpPanel ? signUpPanel.querySelectorAll("input") : []
    let loginInputs = loginPanel ? loginPanel.querySelectorAll("input") : []
    let users = JSON.parse(localStorage.getItem("users")) || []
    let managerCredentials = {
        managerPassword: "snowyIce67!",
        managerUsername: "williamsWiley2209"
    }
    let customer = false 
    let manager = false 

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
            closeModal()
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

    if(alrHaveAccount){
        alrHaveAccount.addEventListener("click", (e) =>{
            e.preventDefault()
            for(let i = 0; i < signUpInputs.length; i++){
                signUpInputs[i].value = ""
            }   
            loginPanel.classList.add("active")
            signUpPanel.classList.remove("active")
        })
    }

    if(signUpBtn){
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault()
            let newUser = storeSignUpInfo()
            if(newUser){
                for(let i = 0; i < signUpInputs.length; i++){
                    signUpInputs[i].value = ""
                }   
                loginPanel.classList.add("active")
                signUpPanel.classList.remove("active")
            }
        })
        loginInputCheck()
    }
    //function to check and see if all the inputs were filled 
    function inputCheck(){
        if(!signUpPanel) return
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
    loginInputCheck()

    function loginInputCheck(){
        if(!loginPanel) return
        let allFilled = true
        for(let i = 0; i < loginInputs.length; i++){
            if(loginInputs[i].value.trim() == ""){
                allFilled = false
                break
            }
        }
        loginBtn.disabled = !allFilled
    }

    for(let i = 0; i < loginInputs.length; i++){
        loginInputs[i].addEventListener("input", loginInputCheck)
    }

    function isUserDupliacte(username, email, password){
        return users.some(user => user.username == username || user.email == email || user.password == password)
    }

    //function to store the info
    function storeSignUpInfo(){
        let newUser = {}
        let inputMap = {
            "firstName": "firstname",
            "lastName": "lastName",
            "signUp-username": "username",
            "signUp-password": "password",
            "email": "email",
            "address": "address",
            "city": "city",
            "zipcode": "zipCode",
            "firstNameOnCard": "firstName-card",
            "middleInitial-card": "middleInitial",
            "lastNameOnCard": "lastName-card",
            "cardNumber": "cardNumber",
            "cvv": "cvv"
        }

        signUpInputs.forEach(input => {
            let propName = inputMap[input.id] || input.id
            newUser[propName] = input.value.trim()
        })

        if(isUserDupliacte(newUser.username, newUser.email, newUser.password)){
            for(let i = 0; i < signUpInputs.length; i++){
                    signUpInputs[i].value = ""
            }  
            let scrollContainers= modal.querySelectorAll(".scroll-inner")
            scrollContainers.forEach(container => {
                container.scrollTop = 0
            })
            alert("Username, Email, or Password already exist")
            return null
        }
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        return newUser
    }

    if(loginBtn){
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault()
            let loginUsername = document.getElementById("login-username").value.trim()
            let loginPassword = document.getElementById("login-password").value.trim()
            console.log("users array:", users)
            console.log("Login username:", loginUsername)
            console.log("Login password:", loginPassword)
            let found = false
            if(loginUsername == managerCredentials.managerUsername && loginPassword == managerCredentials.managerPassword){
                manager = true
                found = true
            }else {
                for(let i = 0; i < users.length; i++){
                    if(loginUsername == users[i].username && loginPassword == users[i].password){
                        customer = true
                        found = true
                        break
                    }
                }
            }

            if(found){
                localStorage.setItem("loggedIn", "true")
                localStorage.setItem("currentUser", loginUsername)
                closeModal()
                loginInputs.forEach(input => input.value = "")
                loginSignUpBtn.forEach(btn => btn.style.display = "none")
            }else{
                for(let i = 0; i < loginInputs.length; i++){
                    loginInputs[i].value = ""
                }
                alert("Incorrect Username or Password")
            }
        })

        

        function closeModal(){
            modal.style.display = "none"
            loginPanel.classList.remove("active")
            signUpPanel.classList.remove("active")
            document.body.style.position = "static"
        }
    }

    let profileBtns = document.querySelectorAll("#open-profile")
    let profileContainer = document.querySelector(".profile-container")
    let profilePanel = document.querySelector(".profile-panel")
    let profileXBtn = document.querySelectorAll(".profile-panel .xIcon-Btn")
    let logoutBtn = document.querySelectorAll(".profile-logout-btn")
    let deleteAccountBtn = document.querySelectorAll(".profile-delete-account-btn")

    function loadProfileInfo(){
        let currentUser = localStorage.getItem("currentUser")
        if(!currentUser) return

        let users = JSON.parse(localStorage.getItem("users")) || []
        let foundUser = users.find(u => u.username == currentUser)
        if(!foundUser)return

        let profileMap = {
            "firstname": "profile-firstName",
            "lastName": "profile-lastName",
            "username": "profile-username",
            "password": "profile-password",
            "email": "profile-email",
            "address": "profile-address",
            "city": "profile-city",
            "zipCode": "profile-zipCode",
            "firstName-card": "profile-firstName-card",
            "middleInitial": "profile-middleInitial-card",
            "lastName-card": "profile-lastName-card",
            "cardNumber": "profile-cardNumber",
            "cvv": "profile-cvv"
        }

        for(let key in profileMap){
            let inputId = profileMap[key]
            let input = document.getElementById(inputId)
            if(input) input.value = foundUser[key] || ""
        }

    }

    function closeProfile(){
        profilePanel.classList.remove("active")
        profileContainer.style.display = "none"
        document.body.style.position = "static"

        let profileInputs = profilePanel.querySelectorAll("input")
        profileInputs.forEach(input => input.value = "")
    }

    profileXBtn.forEach(btn => {
        btn.addEventListener("click",() => {
            closeProfile()
        })
    })
    
    if(profileBtns){
        profileBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                profileContainer.style.display = "flex"
                profilePanel.classList.add("active")
                document.body.style.position = "fixed"
                loadProfileInfo()
            })
        })
    }

    if(logoutBtn){
        logoutBtn.forEach( btn => {
            btn.addEventListener("click", (e) => {
                localStorage.setItem("loggedIn", "false")
                localStorage.removeItem("currentUser")
                loginSignUpBtn.forEach(btn => {
                    btn.style.display = "flex"
                })
                closeProfile()
            })
        })
    }

    if(deleteAccountBtn){
        deleteAccountBtn.forEach(btn => {
            btn.addEventListener("click", (e) => {

            })
        })
    }



    class menuItem {
        constructor(name, desc, img, price) {
            this.name = name;
            this.desc = desc;
            this.img = img;
            this.price = price;
        }

        toHTML() {
            return `
                <div class="menu-item center-txt">
                    <div>
                        ${this.img}
                        <h3>${this.name}</h3>
                        <p><em>${this.desc}</em></p>
                        <p class="price">${this.price}</p>
                        <button class="cart-btn">Add To Cart</button>
                    </div>
                </div>
            `;
        }
    }


    let snowcones = [
        item1 = new menuItem("Salisbury Steak", "Cooked to your liking", `<img src="Images/steak.png" alt="img">`,"$67"),
        item2 = new menuItem("Clear Flavor #7", "We refuse to explain.", `<img src="Images/clear.png" alt="img">`,"$67"),
        item3 = new menuItem("Vanilla Ice", "Robert Matthew Van Winkle", `<img src="Images/vanilla.png" alt="img">`,"$67"),
        item4 = new menuItem("Pickle Party", "Brine Forward.", `<img src="Images/pickle.png" alt="img">`,"$67"),
        item5 = new menuItem("Screaming Into the Void", "Absolutely no sweetness. Only echo.", `<img src="Images/void.png" alt="img">`,"$67"),
        item6 = new menuItem("Pool Water", "Just a hint of Chlorine", `<img src="Images/pool.png" alt="img">`,"$67"),
        item7 = new menuItem("404: Flavor Not Found", "Leaves the taste of error on your tongue", `<img src="Images/404.png" alt="img">`,"$67"),
        item8 = new menuItem("Red 40", "Self Explanitory", `<img src="Images/red.png" alt="img">`,"$67"),
        item9 = new menuItem("Cactus Melon", "Sweet, prickly, and strangely energizing.", `<img src="Images/cactus.png" alt="img">`,"$67"),
        item10 = new menuItem("Radioactive Banana", "glows just a little too brightly", `<img src="Images/banana.png" alt="img">`,"$67"),
        item11 = new menuItem("Microplastics", "Served with a tiny biodegradable spoon", `<img src="Images/plastic.png" alt="img">`,"$67"),
        item12 = new menuItem("Electric Cumcumber",'faint aftertaste of "why is this carbonated?"', `<img src="Images/cucumber.png" alt="img">`,"$67"),
    ]

    let sides = [
        sides1 = new menuItem("Icy Spicy Nachos", "We don't know how we did it either", `<img src="Images/nachos.png" alt="img">`,"$67"),
        sides2 = new menuItem("Frozen Mozzerella Snowballs", "Cheese that looks like Snowballs", `<img src="Images/motzballs.png" alt="img">`,"$67"),
        sides3 = new menuItem("Freezer-Burned Garlic Bread", "Edges burned and Icy", `<img src="Images/bread.png" alt="img">`,"$67"),
        sides4 = new menuItem("Ice-Lattice Onion Rings", "Crunchy in all the Wrong Ways", `<img src="Images/rings.png" alt="img">`,"$67")
    ]

    let drinks = [
        drink1 = new menuItem("Frozen Hot Coco", "Deliciously Confusing", `<img src="Images/hot-coco.png" alt="img">`,"$67"),
        drink2 = new menuItem("Water", "But as a solid", `<img src="Images/water.png" alt="img">`,"$67"),
        drink3 = new menuItem("Melted Snowman", "Suprisingly Flavorful", `<img src="Images/snowman.png" alt="img">`,"$67"),
        drink4 = new menuItem("Frostbite Tonic", "Numbs your lips after each sip", `<img src="Images/tonic.png" alt="img">`,"$67"),
    ]


    function appendsnowCones() {
        let coneContainer = document.getElementById("coneContainer");
        if (!coneContainer) return;
        for(let i = 0; i < snowcones.length; i++) {
            let item = snowcones[i];
            coneContainer.innerHTML += item.toHTML();
        }
    }

    function appendSides() {
        let sidesContainer = document.getElementById("sidesContainer");
        if (!sidesContainer) return;
        for(let i = 0; i < sides.length; i++) {
            let side = sides[i];
            sidesContainer.innerHTML += side.toHTML();
        }
    }

    function appendDrinks() {
        let drinksContainer = document.getElementById("drinksContainer");
        if (!drinksContainer) return;
        for(let i = 0; i < drinks.length; i++) {
            let drink = drinks[i];
            drinksContainer.innerHTML += drink.toHTML();
        }
    }

    appendsnowCones();
    appendSides();
    appendDrinks();


}