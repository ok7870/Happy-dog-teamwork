function login() {
    console.log("it should work")
    fetch("https://script.google.com/macros/s/AKfycbyOxSLmkgrZqZxgw54pHsP60U4Oly9i-u6ScxqUFsOZCX386v6gn-Bu9N7f78aM17tdXA/exec?"+"username="+document.getElementById("username").value+"&password="+document.getElementById("password").value).then(
        d => d.text()).then(check_complete);
}

function check_complete(data) {
    let p = document.createElement("p");
    p.textContent = data.email
    console.log(data.email)
    document.getElementById("loginsec").appendChild(p)
}