function toggle(){
    console.log("Toggling elements");
    var iconContainer = document.getElementById("icon-container");
    var jobFormContainer = document.getElementById("job-form-container");
    var backArrowContainer = document.getElementById("back-arrow-container")

    console.log("Icon container style before toggle:", iconContainer.style.display);
    console.log("Job form container style before toggle:", jobFormContainer.style.display);
    console.log("Back Arrow Icon style before toggle",backArrowContainer.style.display);

    iconContainer.style.display = iconContainer.style.display === "none" ? "flex" : "none";
    jobFormContainer.style.display = jobFormContainer.style.display === "none" ? "flex" : "none";
    backArrowContainer.style.display = backArrowContainer.style.display === "none" ? "block" : "none"

    console.log("Icon container style after toggle:", iconContainer.style.display);
    console.log("Job form container style after toggle:", jobFormContainer.style.display);
    console.log("Back Arrow Icon container after toggle", backArrowContainer.style.display);
    iconContainer.style.justifyContent = "center";
}
document.getElementById("icon-button").addEventListener("click",()=>{
    console.log("toggling job form");
    toggle();
})
document.getElementById("back-arrow-container").addEventListener("click",()=>{
    console.log("toggling out of form");
    toggle();
})