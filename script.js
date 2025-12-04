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
    let deskNav = this.document.getElementById("desk-nav")
    if (window.scrollY > scrollThreshold) {
        deskNav.style.backdropFilter = "blur(10px)" 
        deskNav.style.opacity = "0.7"
        deskNav.style.padding = "20px 0"
        deskNav.style.top = "0"
    } else {
        deskNav.style.backdropFilter = "none" 
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
            <div class="menu-item center-txt">
                <div>
                    ${this.img}
                    <h3>${this.name}</h3>
                    <p><em>${this.desc}</em></p>
                    <p class="price">$${this.price.toFixed(2)}</p>
                    <button class="cart-btn" onclick="addToCart('${this.name}', ${this.price})"">Add To Cart</button>
                </div>
            </div>
        `;
    }
}


let snowcones = [
    item1 = new menuItem("Salisbury Steak", "Cooked to your liking", `<img src="Images/steak.png" alt="img">`,5),
    item2 = new menuItem("Clear Flavor #7", "We refuse to explain.", `<img src="Images/clear.png" alt="img">`, 4.5),
    item3 = new menuItem("Vanilla Ice", "Robert Matthew Van Winkle", `<img src="Images/vanilla.png" alt="img">`,3),
    item4 = new menuItem("Pickle Party", "Brine Forward.", `<img src="Images/pickle.png" alt="img">`, 4.5),
    item5 = new menuItem("Screaming Into the Void", "Absolutely no sweetness. Only echo.", `<img src="Images/void.png" alt="img">`, 4.5),
    item6 = new menuItem("Pool Water", "Just a hint of Chlorine", `<img src="Images/pool.png" alt="img">`, 3.5),
    item7 = new menuItem("404: Flavor Not Found", "Leaves the taste of error on your tongue", `<img src="Images/404.png" alt="img">`, 4),
    item8 = new menuItem("Red 40", "Self Explanatory", `<img src="Images/red.png" alt="img">`, 4.5),
    item9 = new menuItem("Cactus Melon", "Sweet, prickly, and strangely energizing.", `<img src="Images/cactus.png" alt="img">`, 4.5),
    item10 = new menuItem("Radioactive Banana", "glows just a little too brightly", `<img src="Images/banana.png" alt="img">`, 4.5),
    item11 = new menuItem("Microplastics", "Served with a tiny biodegradable spoon", `<img src="Images/plastic.png" alt="img">`, 5),
    item12 = new menuItem("Electric Cumcumber",'faint aftertaste of "why is this carbonated?"', `<img src="Images/cucumber.png" alt="img">`, 4.5),
]

let sides = [
    side1 = new menuItem("Icy Spicy Nachos", "We don't know how we did it either", `<img src="Images/nachos.png" alt="img">`, 6.5),
    side2 = new menuItem("Frozen Mozzerella Snowballs", "Cheese that looks like Snowballs", `<img src="Images/motzballs.png" alt="img">`, 5),
    side3 = new menuItem("Freezer-Burned Garlic Bread", "Edges burned and Icy", `<img src="Images/bread.png" alt="img">`, 6),
    side4 = new menuItem("Ice-Lattice Onion Rings", "Crunchy in all the Wrong Ways", `<img src="Images/rings.png" alt="img">`, 6)
]

let drinks = [
    drink1 = new menuItem("Frozen Hot Coco", "Deliciously Confusing", `<img src="Images/hot-coco.png" alt="img">`, 4),
    drink2 = new menuItem("Water", "But as a solid", `<img src="Images/water.png" alt="img">`, 1.5),
    drink3 = new menuItem("Melted Snowman", "Suprisingly Flavorful", `<img src="Images/snowman.png" alt="img">`, 4),
    drink4 = new menuItem("Frostbite Tonic", "Numbs your lips after each sip", `<img src="Images/tonic.png" alt="img">`, 4.5),
]


function appendSnowCones() {
    let coneContainer = document.getElementById("coneContainer");

    for(let i = 0; i < snowcones.length; i++) {
        let item = snowcones[i];
        coneContainer.innerHTML += item.toHTML();
    }
}

function appendSides() {
    let sidesContainer = document.getElementById("sidesContainer");
    for(let i = 0; i < sides.length; i++) {
        let side = sides[i];
        sidesContainer.innerHTML += side.toHTML();
    }
}

function appendDrinks() {
    let drinksContainer = document.getElementById("drinksContainer");
    for(let i = 0; i < drinks.length; i++) {
        let drink = drinks[i];
        drinksContainer.innerHTML += drink.toHTML();
    }
}

appendSnowCones();
appendSides();
appendDrinks();

let cart = [];
function addToCart(name, price) {
    // Find item in cart
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    let itemContainer = document.getElementById("currentCart");
    let total = 0;

    // clear previous items
    itemContainer.innerHTML = "";
     cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        itemContainer.innerHTML += `
            <div class="top-space item">
                <div class="cart-item">
                    <h1>${item.name}</h1>
                    <p>Price: <br>$${item.price.toFixed(2)}</p>

                    <label>Qty: 
                        <input type="number" value="${item.quantity}" min="1" max="10" 
                            class="quantity" onchange="changeQuantity(${index}, this.value)">
                    </label>
                </div>
                <button onclick="removeItem('${item.name}', ${item.price})">Remove</button>
                <p class="subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
        `;
    });
    
    itemContainer.innerHTML += `
        <h2 class="center-txt">Total: $${total.toFixed(2)}</h2>
        <button class="confirm">Confirm Order</button>
    `;
}

function changeQuantity(index, newQty) {
    cart[index].quantity = parseInt(newQty);
    updateCart();
}

function removeItem(name, price) {
    cart = cart.filter(item => !(item.name === name && item.price === price));
    updateCart();
}

// cart hamburger
let cartBtn = document.getElementById("cart-icon")
let cartContainer = document.getElementById("cart-container")
cartBtn.addEventListener("click", () => {
    if(cartContainer.style.right === "-383px") {
        cartContainer.style.right = "0px"
    } else {
        cartContainer.style.right = "-383px"
    }
})

