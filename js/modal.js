const openModal = document.getElementById("open-modal");
const closeModal= document.getElementById("close-modal");

openModal.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("modal-content").style.visibility = "visible";
    document.getElementById("modal-content").style.opacity = 1;
    document.getElementById("modal-content").style.transform = "translateY(2%)";
});

closeModal.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(0%)";
});

document.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modal")) {
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(0%)";
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key == "Escape") {
    document.getElementById("modal-content").style.visibility = "hidden";
    document.getElementById("modal-content").style.opacity = 0;
    document.getElementById("modal-content").style.transform = "translateY(0%)";
    }
})