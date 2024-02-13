function submitForm(e){
    console.log(`Form submitted, timestamp: ${e.timeStamp}`)
    var form = document.getElementById("job-form")
    var formData = new FormData(form);
    var url = chrome.runtime.getURL('action.html');
console.log(url);
    var uri = "https://localhost:7021/JobAPI/Add"
    for(var data of formData.entries()){
        console.log(data)
    }
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json)
    fetch(uri,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:json
    }).then(res=>res.json())
    .then(data=>console.log("Success:",data))
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
    input.value = now;
    console.log("Applied date to input for DateApplied:",now);
})
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
            submitForm(e);
        }
        else{
            alert("form is missing required fields")
        }
    })