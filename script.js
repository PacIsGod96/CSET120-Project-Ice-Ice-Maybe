// nav hamburger menu

function nav() {
    let menu = document.getElementById("menu-links")
    if (menu.style.top === "-200px") {
        menu.style.top = "40px";
    } else {
        menu.style.top = "-200px"
    }
}