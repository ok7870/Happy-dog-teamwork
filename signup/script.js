import jsondata from '../info.json' with { type: 'json'};
import fs from 'fs/promises';

window.signup = function signup() {
    let newemail = document.getElementById("newuserinfo_email").value;
    let newusername = document.getElementById("newuserinfo_username").value;
    let newpassword = document.getElementById("newuserinfo_password").value;
    let newpassword2 = document.getElementById("newuserinfo_passwordagain").value;

    if (newpassword !== newpassword2) {
        console.log("wrong passwrod");
        const p = document.createElement("p")
        //classi saad lisada siia
                        //
        p.classList.add("none_voibvabaltmuuta");
        p.textContent = "passwords must match" // siit saab teksti muuta
        document.getElementById("newusercreation").appendChild(p)
    } 

    else {
        console.log(jsondata.name);
    }
    //kuradi aja raiskamine
}