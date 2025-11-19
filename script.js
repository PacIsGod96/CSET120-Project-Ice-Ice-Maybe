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

//Sign In/Sign Up


// review function

let name = document.getElementById("name");
let stars = document.getElementById("stars");
let review = document.getElementById("review");
document.getElementById("reviewForm").addEventListener("submit", function(e) {
      e.preventDefault(); // Stop form from refreshing the page
    
      let newReview = {
        userName: name.value,
        starRating: stars.value,
        feedback: review.value
      }

      const container = document.getElementById("review-container");
      const container2 = document.getElementById("msg-container");
      container.innerHTML = `
        <h3>${newReview.userName}</h3>
        <p>⭐ ${newReview.starRating} / 5</p>
        <p>\"${newReview.feedback}\"</p>
      `;
      container2.innerHTML = "<br><p>Thank You for Your Feedback!</p>"
    });


