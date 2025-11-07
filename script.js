// nav hamburger menu

function nav() {
    let menu = document.getElementById("menu-links")
    if (menu.style.top === "-200px") {
        menu.style.top = "0";
    } else {
        menu.style.top = "-200px"
    }
}