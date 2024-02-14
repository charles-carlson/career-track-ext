function toggle(){
    console.log("Toggling elements");
    var iconContainer = document.getElementById("icon-container");
    var jobFormContainer = document.getElementById("job-form-container");
    var backArrowContainer = document.getElementById("back-arrow-container")
    var firstFormGroup = document.getElementById("input-1");
    var submissionAfterDiv = document.getElementById("submission")
    console.log("Icon container style before toggle:", iconContainer.style.display);
    console.log("Job form container style before toggle:", jobFormContainer.style.display);
    console.log("Back Arrow Icon style before toggle",backArrowContainer.style.display);

    firstFormGroup.classList.add("form-animation")

    if(submissionAfterDiv.style.display === "flex"){
        submissionAfterDiv.style.display = "none"
        iconContainer.style.display = "flex";
        backArrowContainer.style.display = "none";
    }
    else{
        iconContainer.style.display = iconContainer.style.display === "none" ? "flex" : "none";
        jobFormContainer.style.display = jobFormContainer.style.display === "none" ? "flex" : "none";
        backArrowContainer.style.display = backArrowContainer.style.display === "none" ? "block" : "none"
        firstFormGroup.style.display = firstFormGroup.style.display === "none" ? "flex" : "none";
    }
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