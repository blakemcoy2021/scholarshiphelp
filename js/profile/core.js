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

            let fnme = records[0].user_firstname;
            let mnme = records[0].user_middlename;
            let lnme = records[0].user_lastname;
            let fnmeArr = fnme.split(" ");
            
            document.getElementById("firstname").value = fnme;
            document.getElementById("middlename").value = mnme;
            document.getElementById("lastname").value = lnme;
                let bdate = new Date(records[0].user_birthdate);
                
                let month = bdate.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                let day = bdate.getDate();
                if (day < 10) {
                    day = "0" + day;
                }
                let bday = bdate.getFullYear() + "-" + month + "-" + day;
                console.log(bday);
            document.getElementById("bday").value = bday;
            document.getElementById("address").value = records[0].contact_address;
                let rawgender = records[0].user_gender;
                document.getElementById("male").checked = true;
                document.getElementById("female").checked = false;              
                if (rawgender == 0) { 
                    document.getElementById("male").checked = false;
                    document.getElementById("female").checked = true;
                }

            document.getElementById("contact").value = records[0].contact_phnum;

            let casualname = "Mr. ";
            if (rawgender == "0") {
                casualname = "Ms. ";
            }
            casualname += fnmeArr[0];
            document.getElementById("casualname").innerHTML = casualname;

            let rmcache = new Date();
            
            if (records[0].user_photo != "no_img") {
                document.getElementById("imgPhotoInput").src = records[0].user_photo + "?nc=" + rmcache.getMilliseconds();
                document.getElementById("imgPhoto").src = records[0].user_photo + "?nc=" + rmcache.getMilliseconds();
            }


        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };

}

document.getElementById("inpPhoto").onchange = function (evt) {
    var tar = evt.target || window.event.srcElement;
    var photofile = tar.files;

    if (FileReader && photofile && photofile.length) {

        var fr = new FileReader();
        fr.readAsDataURL(photofile[0]);
        fr.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.name = e.target.name;
            img.size = e.target.size;
            img.onload = function (el) {
                var elem = document.createElement("canvas");
                var scaleFactor = 100/el.target.width;
                elem.width = 100;
                elem.height = el.target.height * scaleFactor;

                var ctx = elem.getContext("2d");
                ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

                var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

                document.getElementById("imgPhotoInput").src = srcEncoded;
            }
        }
    }
    else {
        console.log("not supported :: try sending the image uploaded to a server then ajax query download it back");
    }
}