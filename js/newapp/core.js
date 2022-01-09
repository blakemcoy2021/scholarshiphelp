function init() {
    var uname = document.getElementById("lblScholarName");

    if (typeof(Storage) !== "undefined") {
        let fname = window.localStorage.getItem("fname");
        uname.innerHTML = fname;
        console.log("Acquire localstorage value :: " + fname);

        document.getElementById("hidfld_uid").value = window.localStorage.getItem("uid");
        document.getElementById("hidfld_fname").value = fname;

    } else {
        let urlParams = new URLSearchParams(window.location.search);
        let fname = urlParams.get("fname");
        uname.innerHTML = fname;
        console.log("NO localstorage support :: " + fname);

        document.getElementById("hidfld_uid").value = urlParams.get('uid');
        document.getElementById("hidfld_fname").value = fname;
    }

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/newapp/get_userinfo.php?suid=" + document.getElementById("hidfld_uid").value;
    xmlhttp.open("GET", route, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { //console.log(this.responseText);

            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == false) { alert(d.message); return; } //console.log(d.success);

            if (d.success == "zero") {
                alert(d.message);
                return; 
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                return;
            }     
            console.log(records);

            document.getElementById("firstname").value = records[0].user_firstname;
            document.getElementById("middlename").value = records[0].user_middlename;
            document.getElementById("lastname").value = records[0].user_lastname;
                let bdate = new Date(records[0].user_birthdate);
                let ndate = new Date();
                let age = ndate.getFullYear() - bdate.getFullYear();
            document.getElementById("age").value = age;
            document.getElementById("address").value = records[0].contact_address;
                let rawgender = records[0].user_gender;
                let gender = "Male";
                if (rawgender == 0) { gender = "Female"; }
            document.getElementById("gender").value = gender;
            document.getElementById("contact").value = records[0].contact_phnum;

            if (records[0].user_photo != "no_img") {
                let rmcache = new Date();
                document.getElementById("imgPhoto").src = records[0].user_photo + "?nc=" + rmcache.getMilliseconds();
            }

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };

}

document.getElementById("inpCOR").onchange = function (evt) {
    document.getElementById("lbldoc1").innerHTML = getFileName(document.getElementById("inpCOR").value);
}

document.getElementById("inpCOG").onchange = function (evt) {
    document.getElementById("lbldoc2").innerHTML = getFileName(document.getElementById("inpCOG").value);
}

document.getElementById("inpIDG").onchange = function (evt) {
    document.getElementById("lbldoc3").innerHTML = getFileName(document.getElementById("inpIDG").value);
}

document.getElementById("inpIDC").onchange = function (evt) {
    document.getElementById("lbldoc4").innerHTML = getFileName(document.getElementById("inpIDC").value);
}

document.getElementById("inpBIO").onchange = function (evt) {
    document.getElementById("lbldoc5").innerHTML = getFileName(document.getElementById("inpBIO").value);
}

function getFileName(fullPath) {
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    console.log(filename);
    return filename;
}