// nav hamburger menu

function nav() {
    let menu = document.getElementById("menu-links")
    if (menu.style.top === "-200px") {
        menu.style.top = "0";
    } else {
        menu.style.top = "-200px"
    }
}

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

