// console.log("OK");
// Show alert
const showAlert = document.querySelector("[show-alert]");
const closeAlert =document.querySelector("[close-alert]");
// console.log(closeAlert);
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// End Show alert