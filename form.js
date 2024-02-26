function getCurrentTab(callback){
    let queryOptions = {active:true,currentWindow:true};
    chrome.tabs.query(queryOptions,(tab)=>{
        callback(tab);
    })
}
function submitForm(){
    console.log(`Form submitted`)
    var form = document.getElementById("job-form")
    var formData = new FormData(form);
    var url = chrome.runtime.getURL('action.html');
    console.log(url);
    var uri = "https://localhost:7021/JobAPI/Add"
    for(var data of formData.entries()){
        console.log(data)
    }
    fetch(uri,{
        method:'POST',
        body:formData
    }).then(res=>res.json())
    .then(data=>{
        console.log("Success:",data)
        var success = document.getElementById("submission-text")
        success.innerHTML = `Your application for ${data["position"]} with the company ${data["name"]} has been submitted`
        var submitAfter = document.getElementById("submission");
        var form = document.getElementById("job-form-container");
        var lastInput = document.getElementById("input-6")
        lastInput.style.display = "none"
        form.style.display = "none"
        submitAfter.style.display = "flex";
        var jobForm = document.getElementById("job-form")
        jobForm.reset();
    })
    .catch((e)=>{
        console.log("Error:",e)
    })
    console.log("Form submitted",form)
}
function checkForm(id){
    var formGroup = document.getElementById(id);
    var input = formGroup.children[1];
    return input.value ? true : false;
}
function toggleNav(id){
    console.log("toggle the form group ",id)
    var formGroups = document.getElementsByClassName("form-group");
    for(let i=0; i<formGroups.length; i++){
        formGroups[i].style.display = "none";
    }
    var formGroup = document.getElementById(id);
    formGroup.style.display = formGroup.style.display === "none" ? "flex" : "none";
}
function submitNav(id){
    console.log("The id of clicked button ",id);
    var identifiers = id.split("-");
    console.log("This is your identifier array ", identifiers);
    var type = identifiers[0];
    var dir = Number(identifiers[1]);
    console.log(`Identifiers of element are ${type} and ${dir}`)
    switch(type){
        case "next":   
            if(checkForm(`input-${dir}`)){
                toggleNav(`input-${dir + 1}`)
            }
            else{
                alert("input is required")
            }
            break;
        case "back":
            toggleNav(`input-${dir}`)
            break;
        default:
            console.log("error with type value in switch case")
            break;
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    var formGroups = document.getElementsByClassName("form-group")
    Array.prototype.forEach.call(formGroups,(formGroup)=>{
        formGroup.style.alignItems = "center";
        formGroup.style.flexDirection = "column";
        formGroup.classList.add("form-animation")
    })
})
document.addEventListener("DOMContentLoaded",()=>{
    var now = new Date();
    console.log("Applying for this position on",now);
    var input = document.getElementById("DateApplied");
    input.value = now.toISOString();
    console.log("Applied date to input for DateApplied:",now);
})
function _retrieveURLForSubmission(tab){
    console.log(tab[0].url)
    var sourceForm = document.getElementById("Source")
    sourceForm.value = tab[0].url;
    console.log("Callback added value to source form")
    submitForm();
}
document.addEventListener("DOMContentLoaded",()=>{
    var nextBtns = document.getElementsByClassName("nav-btn");
    console.log("Creating nav buttons")
    for(let i=0;i<nextBtns.length;i++){
        console.log("Adding event listener to ",nextBtns[i])
        nextBtns[i].addEventListener("click",(event)=>{
            event.preventDefault();
            console.log(nextBtns[i].id, " was clicked!");
            submitNav(nextBtns[i].id);
        })
    }
})
document.forms["job-form"]
    .addEventListener("submit",(e)=>{
        e.preventDefault();
        if(document.forms["job-form"].reportValidity()){
            getCurrentTab(_retrieveURLForSubmission)
        }
        else{
            alert("form is missing required fields")
        }
    })