// menu
function loadCart() {
    let saved = localStorage.getItem("cart");
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
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
                    <p class="price">$${this.price.toFixed(2)}</p>
                    <button class="cart-btn" onclick="addToCart('${this.name}', ${this.price})"">Add To Cart</button>
                </div>
                <p id="msg-${this.name.replace(/\s+/g, '')}" class="item-message"></p>
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
    if(!coneContainer) return;

    for (let item of snowcones) {
        coneContainer.innerHTML += item.toHTML();
    }
}

function appendSides() {
    let sidesContainer = document.getElementById("sidesContainer");
    if(!sidesContainer) return;

    for (let item of sides) {
        sidesContainer.innerHTML += item.toHTML();
    }
}

function appendDrinks() {
    let drinksContainer = document.getElementById("drinksContainer");
    if(!drinksContainer) return;

    for (let item of drinks) {
        drinksContainer.innerHTML += item.toHTML();
    }
}

appendSnowCones();
appendSides();
appendDrinks();

let cart = [];
function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    showItemMessage(name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function showItemMessage(name) {
    let id = "msg-" + name.replace(/\s+/g, '');
    let p = document.getElementById(id);
    p.textContent = `Added to cart!`;
}

function removeMessage(name) {
    let id = "msg-" + name.replace(/\s+/g, '');
    let p = document.getElementById(id);
    p.textContent = '';
}

function updateCart() {
    let itemContainer = document.getElementById("currentCart");
    let total = 0;

    if (itemContainer) {
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
            <a class="confirm" href="order.html">Confirm Order</a>
        `;
    }

}

function changeQuantity(index, newQty) {
    cart[index].quantity = parseInt(newQty);
    updateCart();
}

function removeItem(name, price) {
    cart = cart.filter(item => !(item.name === name && item.price === price));
    removeMessage(name);
    updateCart();
}


// cart hamburger
let cartBtn = document.getElementById("cart-icon")
let cartContainer = document.getElementById("cart-container")
if (cartBtn && cartContainer) {
    cartBtn.addEventListener("click", () => {
        if(cartContainer.style.right === "-383px") {
            cartContainer.style.right = "0px"
        } else {
            cartContainer.style.right = "-383px"
        }
    })
}

loadCart();

document.addEventListener("DOMContentLoaded", () => {
    let pickupBtn = document.getElementById("pickup");
    let deliveryBtn = document.getElementById("delivery");
    let orderSubmitBtn = document.getElementById("order-submit");
    let orderMsg = document.getElementById("order-msg")

    let pickupContainer = document.getElementById("pickup-container");
    let deliveryContainer = document.getElementById("delivery-container");
    let payContainer = document.getElementById("pay-container");

    // Function to show/hide based on type
    function showOrderForm(type) {
        if (type === "pickup") {
            pickupContainer.style.display = "block";
            deliveryContainer.style.display = "none";
        } else if (type === "delivery") {
            pickupContainer.style.display = "none";
            deliveryContainer.style.display = "block";
        }
        payContainer.style.display = "block";
        orderSubmitBtn.style.display = "block";
    }

    // Load saved order type from localStorage
    const savedType = localStorage.getItem("orderType");
    if (savedType) {
        showOrderForm(savedType);
    }

    // Event listeners to set type
    pickupBtn.addEventListener("click", () => {
        localStorage.setItem("orderType", "pickup");
        showOrderForm("pickup");
    });

    deliveryBtn.addEventListener("click", () => {
        localStorage.setItem("orderType", "delivery");
        showOrderForm("delivery");
    });
    orderSubmitBtn.addEventListener("click", () => {
        cart = [];
        localStorage.removeItem("cart");
        alert("Order Placed. Thank you for your business!");
    })
})