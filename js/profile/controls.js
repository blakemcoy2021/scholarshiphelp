function uploadPhoto() {
    document.getElementById("inpPhoto").click();
}

document.getElementById("male").addEventListener("click", function (evt) {
    document.getElementById("female").checked = false;
});
document.getElementById("female").addEventListener("click", function (evt) {
    document.getElementById("male").checked = false;
}); 

document.getElementById("btnUpdateProfile").addEventListener("click", function (evt) {
    evt.preventDefault();

    let fullname = document.getElementById("fullname");
    let birthdate = document.getElementById("bday");
    let address = document.getElementById("address");
        let gmale = document.getElementById("male");
        let fmale = document.getElementById("female");
        let gender = "no";
        if (gmale.checked == true) {
            gender = "1";
        } else if (fmale.checked == true) {
            gender = "0";
        }
    let contact = document.getElementById("contact");

    let uid = document.getElementById("hidfld_uid");

    let photo = document.getElementById("inpPhoto");


    let failfieldctr = 0;
    if (fullname.value == "") { failfieldctr++; }
    if (birthdate.value == "") { failfieldctr++; }
    if (address.value == "") { failfieldctr++; }
    if (contact.value == "") { failfieldctr++; }
        if (gender == "no") { failfieldctr++; }
    if (uid.value == "?") { failfieldctr++; }

    // if (photo.files.length == 0) { failfieldctr++; }

    if (failfieldctr > 0) {
        alert('all field(s) required');
        return;
    }

    var frmdata = new FormData();
    frmdata.append("fname", fullname.value);
    frmdata.append("bdate", birthdate.value);
    frmdata.append("addr", address.value);
    frmdata.append("phnum", contact.value);
    frmdata.append("gender", gender);
    frmdata.append("uid", uid.value);

    // frmdata.append("photo", photo.files[0]);

    if (photo.files.length != 0) { frmdata.append("photo", photo.files[0]); }

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/profile/upd_profile.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.send(frmdata); //data
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            let d;
            try { d = JSON.parse(this.responseText); } catch (e) { alert('Response Format error! ' + this.responseText); return; }
            alert(d.message);
            if (d.success == false) { return; } console.log(d.success);

            if (d.success == "fail") {
                console.log("failed... " + d.logs);
            }
            
        }
    };

});