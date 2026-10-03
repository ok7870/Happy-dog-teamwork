const p = document.createElement("p");
window.signup = function signup() {
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
        fetch("https://script.google.com/macros/s/AKfycbz5KYVR22bnQQK03s-LDY8Ef6kjAMZZutN5WxG7Qfo8hbX-MXZh8qSo5M0ahghz8_e6/exec?"+"operation=signup"+"&username="+newusername+"&newemail="+newemail+"&newpassword="+newpassword)
    }

}