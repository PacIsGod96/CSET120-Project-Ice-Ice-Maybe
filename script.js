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
    let tabNav = this.document.getElementById("tab-nav");
    let deskNav = this.document.getElementById("desk-nav");
    if (window.scrollY > scrollThreshold) {
        tabNav.style.backdropFilter = "blur(10px)";
        deskNav.style.backdropFilter = "blur(10px)"; 
        tabNav.style.opacity = "0.7";
        deskNav.style.opacity = "0.7";
        deskNav.style.padding = "20px 0";
        deskNav.style.top = "0";
        tabNav.style.top = "0";
    } else {
        tabNav.style.backdropFilter = "none";
        deskNav.style.backdropFilter = "none"; 
        tabNav.style.opacity = "1";
        deskNav.style.opacity = "1";
        deskNav.style.padding = "0";
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
let toggleLinks = document.querySelectorAll(".password-toggle");

toggleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        let targetId = this.dataset.target;
        let input = document.getElementById(targetId);

        if(input.type == "password"){
            input.type = "text";
            this.textContent = "Hide Password";
        }else{
            input.type = "password";
            this.textContent = "Show Password";
        }
    });
});

//depending on if the user or manager is logged in it will update the visibility of UI elements
function updateLoginState(){
    let loggedIn = localStorage.getItem("loggedIn") == "true";
    let managerLoggedIn = localStorage.getItem("manager") == "true";
    
    let loginSignUpBtn = document.querySelectorAll(".login-SignUp-Btn");
    if(loginSignUpBtn.length){
        loginSignUpBtn.forEach(btn => {
            if (btn) btn.style.display = loggedIn ? "none" : "flex";
        });
    }
    let managerBtn = document.querySelectorAll(".manager-btns");
    if(managerBtn.length){
        managerBtn.forEach(btn => {
            if (btn) btn.style.display = managerLoggedIn ? "flex" : "none";
        });
    }
    let addToCartBtn = document.querySelectorAll(".cart-btn");
    if(addToCartBtn.length){
        addToCartBtn.forEach(btn => {
            if (btn) btn.style.display = managerLoggedIn ? "none" : "flex";
        });
    }
}

window.onload = () => {
    updateLoginState();
    let managerLoggedIn = localStorage.getItem("manager") == "true";
    let loggedIn = localStorage.getItem("loggedIn") == "true";

    let modal = document.querySelector("#modal");
    let loginPanel = document.querySelector(".login");
    let signUpPanel = document.querySelector(".signUp");
    let profilePanel = document.querySelector(".profile-panel");
    let profileContainer = document.querySelector(".profile-container");
    let loginSignUpBtn = document.querySelectorAll(".login-SignUp-Btn");
    let xBtns = document.querySelectorAll(".xIcon-Btn");
    let loginInputs = loginPanel ? loginPanel.querySelectorAll("input") : [];
    let loginBtn = loginPanel ? loginPanel.querySelector(".loginBtn") : null;
    let isMenuPage = document.getElementById("coneContainer") !== null;

    //function that runs when the the login/signup is pressed
    if(loginSignUpBtn.length){
        loginSignUpBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                if(modal){
                    modal.style.display = "flex";
                }
                if(loginPanel) loginPanel.classList.add("active");
                if(signUpPanel) signUpPanel.classList.remove("active");
                document.body.style.position = "fixed";
                if(loginBtn){
                    loginBtn.disabled = true;
                    loginBtn.style.color = "black";
                }
            });
        });
    }

    loginInputs.forEach(input => input.addEventListener("input", loginInputCheck));

    //function that closes the login and signup modal
    function closeModal(){
        if(modal) modal.style.display = "none";
        if(loginPanel) loginPanel.classList.remove("active");
        if(signUpPanel) signUpPanel.classList.remove("active");
        document.body.style.position = "static";
    }

    //runs when the x-btn is pressed 
    xBtns.forEach(xBtn => {
        xBtn.addEventListener("click", () => {
            closeModal();
        });
    });

    //runs when the login/signup btn is pressed inside of the profile
    document.addEventListener("click", (e) => {
        if(e.target.classList.contains("profile-guest-login-btn")) {
            if(profileContainer) profileContainer.style.display = "none";
            if(profilePanel) profilePanel.classList.remove("active");
            if(modal) modal.style.display = "flex";
            if(loginPanel) loginPanel.classList.add("active");
            document.body.style.position = "fixed";
        }
    });
    
    let profileBtns = document.querySelectorAll("#open-profile");
    
    //runs when the profile btn is pressed
    if(profileBtns.length){
        profileBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                if(profileContainer) profileContainer.style.display = "flex";
                if(profilePanel) profilePanel.classList.add("active");
                document.body.style.position = "fixed";

                let profileScroll= profilePanel.querySelectorAll(".profile-content-scroll");
                profileScroll.forEach(container => {
                    container.scrollTop = 0;
                });

                let guestDiv = document.querySelector(".profile-guest");
                let loggedInDiv = document.querySelector(".profile-logged-in");
                let managerInfoDiv = document.querySelector(".profile-manager-info");
                let managerBtn = document.querySelector(".manager-btns");

                if(guestDiv) guestDiv.style.display = "none";
                if(loggedInDiv) loggedInDiv.style.display = "none";
                if(managerInfoDiv) managerInfoDiv.style.display = "none";
                if(managerBtn) managerBtn.style.display = "none";

                let loggedIn = localStorage.getItem("loggedIn") == "true";
                let managerLoggedIn = localStorage.getItem("manager") == "true";

                if(!loggedIn){
                    if(guestDiv) guestDiv.style.display = "block";
                }else if(loggedIn && managerLoggedIn){
                    if(managerInfoDiv) managerInfoDiv.style.display = "flex";
                    if(managerBtn) managerBtn.style.display = "flex";
                }else if(loggedIn && !managerLoggedIn){
                    if(loggedInDiv) loggedInDiv.style.display = "block";
                    loadProfileInfo();
                }
            })
        })
    }

    //function that closes the profile panel
    function closeProfile(){
        if(profileContainer) profileContainer.style.display = "none";
        if(profilePanel) profilePanel.classList.remove("active");
        document.body.style.position = "static";
    
        let managerInfo = document.querySelector(".profile-manager-info");
        if(managerInfo) managerInfo.style.display = "none";

        let profileManagerBtns = profilePanel?.querySelectorAll(".profile-manager-btns") || [];
        profileManagerBtns.forEach(btn => btn.style.display = "none");

        let profileInputs = profilePanel?.querySelectorAll("input") || [];
        profileInputs.forEach(input => input.value = "");
    }

    //function that checks to see if all the login inputs have been filled 
    function loginInputCheck(){
        if(!loginPanel || !loginBtn) return;
        let allFilled = true;
        for(let i = 0; i < loginInputs.length; i++){
            if(loginInputs[i].value.trim() == ""){
                allFilled = false;
                break;
            }
        }
        loginBtn.disabled = !allFilled;
    }

    for(let i = 0; i < loginInputs.length; i++){
        loginInputs[i].addEventListener("input", loginInputCheck);
    }

    //runs inly if you are on the menu page 
    if(isMenuPage){
        class menuItem {
            constructor(name, desc, img, price, category, id) {
                this.name = name;
                this.desc = desc;
                this.img = img;
                this.price = price;
                this.category = category;
                this.id = id;
            }

            toHTML() {
                return `
                    <div class="menu-item center-txt" data-id="${this.id}" data-category="${this.category}">
                        <div>
                            ${this.img}
                            <h3>${this.name}</h3>
                            <p><em>${this.desc}</em></p>
                            <p class="price">${this.price}</p>
                            <button class="cart-btn">Add To Cart</button>
                            <div class="manager-btns">
                                <button class="menu-delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }


        let snowcones = [
            new menuItem("Salisbury Steak", "Cooked to your liking", `<img src="Images/steak.png" alt="img">`,"$67", "snowcone", 1),
            new menuItem("Clear Flavor #7", "We refuse to explain.", `<img src="Images/clear.png" alt="img">`,"$67", "snowcone", 2),
            new menuItem("Vanilla Ice", "Robert Matthew Van Winkle", `<img src="Images/vanilla.png" alt="img">`,"$67", "snowcone", 3),
            new menuItem("Pickle Party", "Brine Forward.", `<img src="Images/pickle.png" alt="img">`,"$67", "snowcone", 4),
            new menuItem("Screaming Into the Void", "Absolutely no sweetness. Only echo.", `<img src="Images/void.png" alt="img">`,"$67", "snowcone", 5),
            new menuItem("Pool Water", "Just a hint of Chlorine", `<img src="Images/pool.png" alt="img">`,"$67", "snowcone", 6),
            new menuItem("404: Flavor Not Found", "Leaves the taste of error on your tongue", `<img src="Images/404.png" alt="img">`,"$67", "snowcone", 7),
            new menuItem("Red 40", "Self Explanitory", `<img src="Images/red.png" alt="img">`,"$67", "snowcone", 8),
            new menuItem("Cactus Melon", "Sweet, prickly, and strangely energizing.", `<img src="Images/cactus.png" alt="img">`,"$67", "snowcone", 9),
            new menuItem("Radioactive Banana", "glows just a little too brightly", `<img src="Images/banana.png" alt="img">`,"$67", "snowcone", 10),
            new menuItem("Microplastics", "Served with a tiny biodegradable spoon", `<img src="Images/plastic.png" alt="img">`,"$67", "snowcone", 11),
            new menuItem("Electric Cumcumber",'faint aftertaste of "why is this carbonated?"', `<img src="Images/cucumber.png" alt="img">`,"$67", "snowcone", 12),
        ];

        let sides = [
            new menuItem("Icy Spicy Nachos", "We don't know how we did it either", `<img src="Images/nachos.png" alt="img">`,"$67", "side", 101),
            new menuItem("Frozen Mozzerella Snowballs", "Cheese that looks like Snowballs", `<img src="Images/motzballs.png" alt="img">`,"$67", "side", 102),
            new menuItem("Freezer-Burned Garlic Bread", "Edges burned and Icy", `<img src="Images/bread.png" alt="img">`,"$67", "side", 103),
            new menuItem("Ice-Lattice Onion Rings", "Crunchy in all the Wrong Ways", `<img src="Images/rings.png" alt="img">`,"$67", "side", 104)
        ];

        let drinks = [
            new menuItem("Frozen Hot Coco", "Deliciously Confusing", `<img src="Images/hot-coco.png" alt="img">`,"$67", "drink", 201),
            new menuItem("Water", "But as a solid", `<img src="Images/water.png" alt="img">`,"$67", "drink", 202),
            new menuItem("Melted Snowman", "Suprisingly Flavorful", `<img src="Images/snowman.png" alt="img">`,"$67", "drink", 203),
            new menuItem("Frostbite Tonic", "Numbs your lips after each sip", `<img src="Images/tonic.png" alt="img">`,"$67", "drink", 204),
        ];

        //funstion that restores the plain meni item objects to menuItem class instances with number IDs
        function reviveMenuItems(arr){
            return arr.map(obj => new menuItem(
                obj.name,
                obj.desc,
                obj.img,
                obj.price,
                obj.category,
                Number(obj.id)
            ));
        }

        if(localStorage.getItem("snowcones")){
            snowcones = reviveMenuItems(JSON.parse(localStorage.getItem("snowcones")));
        }
        if(localStorage.getItem("sides")){
            sides = reviveMenuItems(JSON.parse(localStorage.getItem("sides")));
        }
        if(localStorage.getItem("drinks")){
            drinks = reviveMenuItems(JSON.parse(localStorage.getItem("drinks")));
        }
        let deletedItems = [];

        let addItemModal = document.getElementById("addItemModal");
        let addItemInputs = {
            name: document.getElementById("addItem-name"),
            desc: document.getElementById("addItem-desc"),
            img: document.getElementById("addItem-img"),
            price: document.getElementById("addItem-price")
        }

        let addItemBtn = addItemModal ? addItemModal.querySelector("#addItemBtn") : null;
        console.log("addItemBtn =", addItemBtn);
        let closeAddModalBtn = addItemModal ? addItemModal.querySelector(".xIcon") : null;

        //function that renders menu items into a container and shows/hides manager or cart buttons based on the login status
        function renderItems(containerId, items){
            let container = document.getElementById(containerId);
            if(!container) return;
            container.innerHTML = items.map(item => item.toHTML()).join("");

            let managerLoggedIn = localStorage.getItem("manager") =="true";
            container.querySelectorAll(".menu-item").forEach(itemDiv => {
                let managerBtn = itemDiv.querySelector(".manager-btns");
                let addToCartBtn = itemDiv.querySelector(".cart-btn");

                if(managerBtn) managerBtn.style.display = managerLoggedIn ? "flex" : "none";
                if(addToCartBtn) addToCartBtn.style.display = managerLoggedIn ? "none" : "flex";
            });
        }

        //function that saves the menu arrays to local 
        function saveMenuToLocal(){
            localStorage.setItem("snowcones", JSON.stringify(snowcones));
            localStorage.setItem("sides", JSON.stringify(sides));
            localStorage.setItem("drinks", JSON.stringify(drinks));
        }

        renderItems("coneContainer", snowcones);
        renderItems("sidesContainer", sides);
        renderItems("drinksContainer", drinks);

        let addButtons = document.querySelectorAll(".menu-add-btn");

        //runs when the add button is clicked that will open the new item modal
        addButtons.forEach(btn => {
            btn.addEventListener("click", ()  => {
                let category = null;
                if(btn.closest(".snowcones")) category = "snowcone";
                else if(btn.closest(".sides")) category = "side";
                else if(btn.closest(".drinks")) category = "drink";
                else return;

                addItemModal.dataset.category  = category;
                addItemModal.classList.add("active");
                document.body.style.position = "fixed";
            });
        });

        if(closeAddModalBtn){
            closeAddModalBtn.addEventListener("click", () => {
                addItemModal.classList.remove("active");
                document.body.style.position = "static";
            })
        }

        document.addEventListener("click", (e) => {
            if(e.target == addItemModal){
                addItemModal.classList.remove("active");
                document.body.style.position = "static";
            }
        });

        //runs when the actaul add new item button is pressed inside of the new item modal
        if(addItemBtn){
            addItemBtn.addEventListener("click", (e) => {
                e.preventDefault();

                let name = addItemInputs.name.value.trim();
                let desc = addItemInputs.desc.value.trim();
                let price = addItemInputs.price.value.trim();
                let category = addItemModal.dataset.category;

                if(!name || !desc || !price){
                    alert("Please fill all required fields");
                    return;
                }

                let file = addItemInputs.img.files[0];
                let id = Date.now;
                
                if(file){
                    let reader = new FileReader();
                    reader.onload = function (evt){
                        let imgHTML = `<img src="${evt.target.result}" alt="">`;
                        finishAddItem(name, desc, imgHTML, price, category, id);
                    }
                    reader.readAsDataURL(file);
                }else{
                    finishAddItem(name, desc, "", price, category, id);
                }
            });
        }

        //function that add a new item to the appropiate array, updates the display, saves to local, and then resets the add-item form
        function finishAddItem(name, desc, imgHTML, price, category, id){
            let newItem = new menuItem(name, desc, imgHTML, price, category, id);
                
            if(category == "snowcone") snowcones.push(newItem);
            else if(category == "side") sides.push(newItem);
            else if(category == "drink") drinks.push(newItem);

            let containerId = category == "snowcone" ? "coneContainer" : category == "side" ? "sidesContainer" : "drinksContainer";

            renderItems(containerId, category == "snowcone" ? snowcones : category == "side" ? sides : drinks);
            saveMenuToLocal();

            addItemInputs.name.value = "";
            addItemInputs.desc.value = "";
            addItemInputs.price.value = "";
            addItemInputs.img.value = "";

            addItemModal.classList.remove("active");
            document.body.style.position = "static";
        }

        //runs when the delete btn is pressed on and item and will remove the item from the array that it is in
        document.addEventListener("click", (e) => {
            let deleteBtn = e.target.closest(".menu-delete-btn");
            if(!deleteBtn) return;

            let itemDiv = deleteBtn.closest(".menu-item");
            if(!itemDiv) return;

            let itemId = Number(itemDiv.dataset.id);
            let category = itemDiv.dataset.category;

            let itemArray = category == "snowcone" ? snowcones : category == "side" ? sides : drinks;
            let itemIndex = itemArray.findIndex(i => Number(i.id) == itemId);

            if(itemIndex == -1)return;

            let [deletedItem] = itemArray.splice(itemIndex, 1);
            deletedItems.push(deletedItem);

            showUndoNotification(deletedItem);

            let containerId = category =="snowcone" ? "coneContainer": category == "side" ? "sidesContainer" : "drinksContainer";

            renderItems(containerId, itemArray);
            saveMenuToLocal();
        })

        let undoTimeout;
        
        //function that shows a notifiction for a couple of secs that allows you undo the item you delted incase you chnage your mind 
        function showUndoNotification(item){
            let undoContainer = document.getElementById("undo-container");
            
            undoContainer.style.display = "block";

            if(undoTimeout) clearTimeout(undoTimeout);
            
            undoContainer.innerHTML = `
                <p>Deleted "${item.name}" <button id = "undo-btn">Undo</button></p>
            `;
            
            let undoBtn = document.getElementById("undo-btn");
            undoBtn.addEventListener("click", () => {
                undoDelete(item);
                undoContainer.style.display = "none";
                clearTimeout(undoTimeout);
            })

            undoTimeout = setTimeout(() => {
                undoContainer.style.display = "none";
            }, 5000);
        }

        //function un does the deleted item 
        function undoDelete(item){
            let containerMap = {"snowcone":"coneContainer", "side":"sidesContainer", "drink":"drinksContainer" };
            let containerId = containerMap[item.category];
            if(!containerId) return;

            let container = document.getElementById(containerId);
            if(!container) return;

            if(item.category == "snowcone") snowcones.push(item);
            else if(item.category == "side") sides.push(item);
            else if(item.category == "drink") drinks.push(item);

            
            renderItems(containerId, item.category == "snowcone" ? snowcones : item.category == "side" ? sides : drinks);
            deletedItems = deletedItems.filter(i => i.id !== item.id);
            saveMenuToLocal();
        }
        
        //runs if the x btn is pressed in the new item modal
        if(closeAddModalBtn){
            closeAddModalBtn.addEventListener("click", () => {
                addItemModal.classList.remove("active");
                document.body.style.position = "static";
            });
        }

        //when the buttin is pressed to add the new item the new item modal will close 
        document.addEventListener("click", (e) => {
            if(e.target == addItemModal){
                addItemModal.classList.remove("active");
            }
        })

        let managerBtn = document.querySelectorAll(".manager-btns");
        let addToCartBtn= document.querySelectorAll(".cart-btn");

    }
        
    xBtns = document.querySelectorAll(".xIcon-Btn");
    let signUpBtn = document.querySelector(".signUpBtn");
    let switchToSignUpLink = document.getElementById("goToSignUp");
    let alrHaveAccount = document.getElementById("alrHaveAccount");
    let switchToLoginLink = document.getElementsByClassName("signUpBtn")[0];
    let signUpInputs = signUpPanel ? signUpPanel.querySelectorAll("input") : [];
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let managerCredentials = {
        managerUsername: "williamsWiley2209",
        managerPassword: "snowyIce67!"
    };

    let customer = false;
    let manager = false;

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
    };
   
    //runs when the "sign up?" button is pressed that will take you to the signup panel
    if(switchToSignUpLink){
        switchToSignUpLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginPanel.classList.remove("active");
            signUpPanel.classList.add("active");
            signUpBtn.disabled = true;
            signUpBtn.style.color = "black";
            
            let scrollContainers= modal.querySelectorAll(".scroll-inner");
            scrollContainers.forEach(container => {
                container.scrollTop = 0;
            });

            inputCheck();
        });
    }

    //will run if the "already have an acoount?" btn is pressed in the signup panel that will take you back to the login panel
    if(alrHaveAccount){
        alrHaveAccount.addEventListener("click", (e) =>{
            e.preventDefault();
            for(let i = 0; i < signUpInputs.length; i++){
                signUpInputs[i].value = "";
            }   
            loginPanel.classList.add("active");
            signUpPanel.classList.remove("active");
        });
    }

    //will run when the signup btn is pressed that will save your info as a new user
    if(signUpBtn){
        switchToLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginInputCheck();
            let newUser = storeSignUpInfo();
            if(newUser){
                for(let i = 0; i < signUpInputs.length; i++){
                    signUpInputs[i].value = "";
                }   
                loginPanel.classList.add("active");
                signUpPanel.classList.remove("active");
            }
        });
    }

    //function to check and see if all the inputs were filled 
    function inputCheck(){
        if(!signUpPanel) return;
        let allFilled = true;
        for(let i = 0; i < signUpInputs.length; i++){
            if(signUpInputs[i].value.trim() == ""){
                allFilled = false;
                break;
            }
        }
        signUpBtn.disabled = !allFilled;
        
    }
    
    for(let i = 0; i < signUpInputs.length; i++){
        signUpInputs[i].addEventListener("input", inputCheck);
    }

    inputCheck();
    loginInputCheck();

    //function to see if another user has used the sane username, email, or password
    function isUserDupliacte(username, email, password){
        return users.some(user => user.username == username || user.email == email || user.password == password);
    }

    //function to store the info that was inputed into the signup in to local
    function storeSignUpInfo(){
        let newUser = {};
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
        };

        signUpInputs.forEach(input => {
            let propName = inputMap[input.id] || input.id;
            newUser[propName] = input.value.trim();
        });

        if(isUserDupliacte(newUser.username, newUser.email, newUser.password)){
            for(let i = 0; i < signUpInputs.length; i++){
                    signUpInputs[i].value = "";
            }  
            let scrollContainers= modal.querySelectorAll(".scroll-inner");
            scrollContainers.forEach(container => {
                container.scrollTop = 0;
            });
            alert("Username, Email, or Password already exist");
            return null;
        }
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        return newUser;
    }

    //runs if the login btn was pressed that check to see if the the info you inputed matches an account in local and signs you in 
    if(loginBtn){
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let loginUsername = document.getElementById("login-username").value.trim();
            let loginPassword = document.getElementById("login-password").value.trim();
            console.log("users array:", users);
            console.log("Login username:", loginUsername);
            console.log("Login password:", loginPassword);
            let found = false;
            if(loginUsername.trim() == managerCredentials.managerUsername.trim() && loginPassword.trim() == managerCredentials.managerPassword.trim()){
                manager = true;
                found = true;
                localStorage.setItem("manager", "true");
            }else {
                for(let i = 0; i < users.length; i++){
                    if(loginUsername.trim() == users[i].username.trim() && loginPassword.trim() == users[i].password.trim()){
                        customer = true;
                        found = true;

                        localStorage.removeItem("manager");
                        
                        break;
                    }
                }
            }

            if(found){
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("currentUser", loginUsername);
                closeModal();
                loginInputs.forEach(input => input.value = "");
                loginSignUpBtn.forEach(btn => btn.style.display = "none");

                let addToCartBtn = document.querySelectorAll(".cart-btn");
                let managerLoggedInNow = localStorage.getItem("manager") == "true";
                updateLoginState();

            }else{
                loginInputs.forEach(input => input.value);
                alert("Incorrect Username or Password");
            }
        })

        closeProfile();

        //function that closes the login signup modal
        function closeModal(){
            modal.style.display = "none";
            loginPanel.classList.remove("active");
            signUpPanel.classList.remove("active");
            document.body.style.position = "static";
        }
    }

    let profileXBtn = document.querySelectorAll(".profile-panel .xIcon-Btn");
    let logoutBtn = document.querySelectorAll(".profile-logout-btn");
    let deleteAccountBtn = document.querySelectorAll(".profile-delete-account-btn");
    let changeBtn = document.querySelectorAll(".profile-change-info-btn");

    //function that puts all of the info that was submited when you logged into the inputs in the profile when you sign in
    function loadProfileInfo(){
        let loggedIn = localStorage.getItem("loggedIn") == "true";
        if(!loggedIn) return;

        let managerLoggedIn = localStorage.getItem("manager") == "true";
        if(managerLoggedIn){
            document.querySelector(".profile-manager-info").style.display = "flex";
            return;
        }else{
            let currentUser = localStorage.getItem("currentUser");
            if(!currentUser) return;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let foundUser = users.find(u => u.username == currentUser);
            if(!foundUser) return;

            for(let key in profileMap){
                let inputId = profileMap[key];
                let input = document.getElementById(inputId);
                if(input) input.value = foundUser[key] || "";
            }
        }
    }

    //runs when the x buttin is pressed 
    profileXBtn.forEach(btn => {
        btn.addEventListener("click",() => {
            closeProfile();
        });
    });
    


    //runs when the logout btn is pressed that will log you out of your account 
    logoutBtn.forEach( btn => {
        btn.addEventListener("click", (e) => {
            localStorage.setItem("loggedIn", "false");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("manager");
            loginSignUpBtn.forEach(btn => {
                btn.style.display = "flex";
            })

            let managerBtn = document.querySelectorAll(".manager-btns");
            managerBtn.forEach(btn => btn.style.display = "none");

            let addToCartBtn = document.querySelectorAll(".cart-btn");
            addToCartBtn.forEach(btn => btn.style.display = "flex");
            closeProfile();
        })
    })
    

    //runs when the delete account btn runs that will delete your acount from local storage and signs you out immeditely 
    deleteAccountBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            let currentUser = localStorage.getItem("currentUser");
            if(!currentUser)return;

            users = users.filter(u => u.username.trim().toLowerCase() !== currentUser.trim().toLowerCase());
            localStorage.setItem("users", JSON.stringify(users));

            localStorage.removeItem("currentUser");
            localStorage.setItem("loggedIn", "false");

            closeProfile();

            loginSignUpBtn.forEach(btn => btn.style.display = "flex");

            let profileInputs = profilePanel.querySelectorAll("input");
            profileInputs.forEach(input => input.value = "");

        });
    })

    //runs when the change btn is pressed that will allow you to change any information you changed in the profile 
    changeBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            let currentUser = localStorage.getItem("currentUser");
            if(!currentUser) return;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let updatedUser = users.find(u => u.username == currentUser);
            if(!updatedUser) return;

            for(let key in profileMap){
                let input = profilePanel.querySelector(`#${profileMap[key]}`);
                if(input) updatedUser[key] = input.value.trim();
            }

            localStorage.setItem("users", JSON.stringify(users));
        })
    })
    updateLoginState();
}