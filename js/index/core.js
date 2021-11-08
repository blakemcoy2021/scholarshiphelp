document.getElementById("frmIndex").onsubmit = function(evt) {
    evt.preventDefault();

    let stp = window.localStorage.getItem("goto");  // if register button is clicked
    if (stp == 1) {
        window.location.href = "register.html";
        return false;
    }

    let uname = document.getElementById("username");
    let passw = document.getElementById("password");

    let failfieldctr = 0;
    if (uname.value == "") { failfieldctr++; }
    if (passw.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("All field(s) required!");
        return false;
    }

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmailValid = regexEmail.test(String(uname.value).toLowerCase());
    if (!isEmailValid) { 
        alert('Correct format of email is required!');
        return false;
    }

    let data = "uname=" + uname.value + "&passw=" + passw.value;
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/login/login.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {   console.log(this.responseText);
    
            //**below is template: json formatted
            let d;
            try { 
                d = JSON.parse(this.responseText);
            } catch (e) { 
                alert('Response Format error! ' + this.responseText); 
                return false; 
            
            }
            if (d.success == false) { 
                alert(d.message); 
                return false;

            } console.log(d.success);
    
            uname.value = "";
            passw.value = "";

            d = d.success.split(",");

            alert("Welcome aboard Mr/Ms. " + d[2]);
            if (typeof(Storage) !== "undefined") {
                window.localStorage.setItem("role", d[0]);
                window.localStorage.setItem("uid", d[1]);
                window.localStorage.setItem("fname", d[2].replace("-", " "));

                if (d[0] == "superadmin" || d[0] == "admin") {
                    window.location.href = "masterlist.html"; //dashboard
                } else {
                    window.location.href = "home.html";
                }

            } else {
                // no web storage
                console.log("**** No web storage.");

                if (d[0] == "superadmin" || d[0] == "admin") {   //dashboard
                    window.location.href = "masterlist.html?uid=" + d[1] + "&fname=" + d[2].replace("-", " ");
                } else {
                    window.location.href = "home.html?uid=" + d[1] + "&fname=" + d[2].replace("-", " ");
                }
            }
    
        } else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };

}