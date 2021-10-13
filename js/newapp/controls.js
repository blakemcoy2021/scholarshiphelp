function uploadCOR() {
    document.getElementById("inpCOR").click();
}

function uploadCOG() {
    document.getElementById("inpCOG").click();
}

function uploadIDG() {
    document.getElementById("inpIDG").click();
}

document.getElementById("btnCreateApp").addEventListener("click", function (evt) {
    evt.preventDefault();

        let scholartitle = document.getElementById("scholartitle");
    let edulevel = document.getElementById("edulevel");
    let school = document.getElementById("school");
    let gradeyear = document.getElementById("gradeyear");

    let uname = document.getElementById("hidfld_fname");
    let uid = document.getElementById("hidfld_uid");

    let cogfile = document.getElementById("inpCOR");
    let corfile = document.getElementById("inpCOG");
    let idgfile = document.getElementById("inpIDG");

    let failfieldctr = 0;
        if (scholartitle.value == "") { failfieldctr++; }
    if (edulevel.value == "") { failfieldctr++; }
    if (school.value == "") { failfieldctr++; }
    if (gradeyear.value == "") { failfieldctr++; }
    if (uid.value == "?") { failfieldctr++; }
    if (uname.value == "?") { failfieldctr++; }

    // if (cogfile.files.length == 0) { failfieldctr++; }
    // if (corfile.files.length == 0) { failfieldctr++; }
    // if (idgfile.files.length == 0) { failfieldctr++; }

    if (failfieldctr > 0) {
        alert('all field(s) required');
        return;
    }

    var frmdata = new FormData();
        frmdata.append("schotitle", scholartitle.value);
    frmdata.append("edulevel", edulevel.value);
    frmdata.append("school", school.value);
    frmdata.append("gradeyear", gradeyear.value);
    frmdata.append("uid", uid.value);
    frmdata.append("uname", uname.value);

    // frmdata.append("cogfile", cogfile.files[0]);
    // frmdata.append("corfile", corfile.files[0]);
    // frmdata.append("idgfile", idgfile.files[0]);

    if (cogfile.files.length != 0) { frmdata.append("cogfile", cogfile.files[0]); }
    if (corfile.files.length != 0) { frmdata.append("corfile", corfile.files[0]); }
    if (idgfile.files.length != 0) { frmdata.append("idgfile", idgfile.files[0]); }

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/newapp/createapp.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.send(frmdata); //data
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            let d;
            try { d = JSON.parse(this.responseText); } catch (e) { alert('Response Format error! ' + this.responseText); return; }
            alert(d.message);
            if (d.success == false) { return; } //console.log(d.success);

            if (d.success == "fail") {
                console.log("failed... " + d.logs);
            } else {
                scholartitle.value = "";
                edulevel.value = "";
                school.value = "";
                gradeyear.value = "";
                document.getElementById("lbldoc1").innerHTML = "";
                document.getElementById("lbldoc2").innerHTML = "";
                document.getElementById("lbldoc3").innerHTML = "";

                cogfile.files[0] = null;
                corfile.files[0] = null;
                idgfile.files[0] = null;
            }
        }
    };

});