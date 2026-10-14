const p = document.createElement("p");
function signup() {
    let newemail = document.getElementById("newuserinfo_email").value;
    let newusername = document.getElementById("newuserinfo_username").value;
    let newpassword = document.getElementById("newuserinfo_password").value;
    let newpassword2 = document.getElementById("newuserinfo_passwordagain").value;

    if (newemail.length === 0 || newusername.length === 0 || newpassword.length === 0 || newpassword2.length === 0) {
        //classi saad lisada siia
                            //
        p.classList.remove("nrw")
        p.classList.add("none_voibvabaltmuuta");
        p.textContent = "please fill out all the inputs" // siit saab teksti muuta
        document.getElementById("newusercreation").appendChild(p);
    }
    
    else if (newpassword !== newpassword2) {
        console.log("wrong passwrod");
        //classi saad lisada siia
                            //
        p.classList.remove("none_voibvabaltmuuta")
        p.classList.add("nrw");
        p.textContent = "passwords must match"; // siit saab teksti muuta
        document.getElementById("newusercreation").appendChild(p);
    } 

    else {
        document.getElementById("newusercreation").style.display="none";
        document.getElementById("loading").style.display="flex"; //laadimis ekraani display muutuja
        fetch("https://script.google.com/macros/s/AKfycby6zQgXblywwWflmcfwcj7--FbGAelkP1OO7JxTpzQHskYOxdMafSGKkxyOAwgiOW9W/exec?"+"operation=signup"+"&username="+newusername+"&newemail="+newemail+"&newpassword="+newpassword).then(
            d => d.text()).then(recived_fetch);
    }
}

function recived_fetch(returne) {
    document.getElementById("loading").style.display="none"
    document.getElementById('account_created').style.display="flex"
    localStorage.setItem("logincheck", JSON.stringify({
        "username" : newusername,
        "email" : newemail,
        "password" : newpassword
    }))
}