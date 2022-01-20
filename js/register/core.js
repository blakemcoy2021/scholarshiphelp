document.getElementById("frmRegister").onsubmit = function(evt) {
    evt.preventDefault();

    let stp = window.localStorage.getItem("goto");  // if register button is clicked
    if (stp == 1) {
        window.location.href = "index.html";
        return false;
    }

    let fnme = document.getElementById("firstname"); //fllname
        let mnme = document.getElementById("middlename");
        let lnme = document.getElementById("lastname");
    let pnum = document.getElementById("phone");
    let addr = document.getElementById("address");
    let gndr1 = document.getElementById("gender1");
    let gndr2 = document.getElementById("gender2");

    let phto = document.getElementById("inpPhoto");

    let bday = document.getElementById("birthdate");
    let unme = document.getElementById("username");
    let pass = document.getElementById("password");

    let gndr = [gndr1, gndr2];
    let gndrIdx = -1;
    for (let i = 0; i < gndr.length; i++) {
        if (gndr[i].checked == true) {
            gndrIdx = i;
            break;
        }
    }
    if (gndrIdx == -1) { 
        alert("Gender field is also required."); 
        return false; 
    }
    let gndrName = "male";
    if (gndrIdx == 1) { gndrName = "female"; }


    let ext = phto.value.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
        alert("The selected file is not a photo! Only accepts .jpg and .png. Convert first your photo, also in less than 20MB. " + ext);
        return false;
    }

    let failfieldctr = 0;
    if (fnme.value == "") { failfieldctr++; }
        if (mnme.value == "") { failfieldctr++; }
        if (lnme.value == "") { failfieldctr++; }
    if (pnum.value == "") { failfieldctr++; }
    if (addr.value == "") { failfieldctr++; }
    if (bday.value == "") { failfieldctr++; }
    if (unme.value == "") { failfieldctr++; }
    if (pass.value == "") { failfieldctr++; }
    if (phto.files.length == 0) { failfieldctr++; }

    if (failfieldctr > 0) {
        alert("All field(s) required!");
        return false;
    }
    if (fnme.value.length > 50) { failfieldctr++; }
    if (mnme.value.length > 50) { failfieldctr++; }
    if (lnme.value.length > 50) { failfieldctr++; }
    if (unme.value.length > 50) { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("Name and email field(s) cannot exceed 50 characters!");
        return false;
    }
    if (pnum.value.length > 11) { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("Only 11 digit mobile number format e.g. '09xx' is accepted.");
        return false;
    }
    if (addr.value.length > 70) { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("Address field cannot exceed 70 characters!");
        return false;
    }


    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isEmailValid = regexEmail.test(String(unme.value).toLowerCase());
    if (!isEmailValid) { 
        alert('Correct format of email is required!');
        return false;
    }

    let frmdata = new FormData();
    frmdata.append("fnme", fnme.value);
        frmdata.append("mnme", mnme.value);
        frmdata.append("lnme", lnme.value);
    frmdata.append("pnum", pnum.value);
    frmdata.append("addr", addr.value);
    frmdata.append("bday", bday.value);
    frmdata.append("unme", unme.value);
    frmdata.append("pass", pass.value);

    frmdata.append("phto", phto.files[0]);

    frmdata.append("gndr", gndrName);

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/register/register.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.send(frmdata);
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
    
            alert(d.message);

            fnme.value = "";
            pnum.value = "";
            addr.value = "";
            for (let i = 0; i < gndr.length; i++) { gndr[i].checked = false; }
            phto.files[0] = null;
            document.getElementById("imgPhoto").src = "images/register/photoplaceholder.jpg";
            bday.value = "";
            unme.value = "";
            pass.value = "";

            window.location.href = "index.html";
    
        } else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };

}