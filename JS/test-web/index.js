// Get the navbar element
let navbar = document.getElementById("navbar");

// Get the offset position of the navbar
let sticky = navbar.offsetTop;
console.log(sticky)

// Add the sticky class to the navbar when you reach its scroll position
window.onscroll = function() {
    if (window.pageYOffset >=100) {
        navbar.classList.add("sticky");
        console.log(navbar)
        console.log(sticky)
    } else {
        navbar.classList.remove("sticky");
        console.log(navbar)
        console.log(sticky)
  }
};
