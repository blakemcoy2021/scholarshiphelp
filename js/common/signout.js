function logout() {
    var login_uid = document.getElementById("hidfld_uid").value
    var xmlhttp = new XMLHttpRequest();
        route = "service/php/web/common/logout.php?uid=" + login_uid;
        xmlhttp.open("GET", route, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);
                //alert(this.responseText + " " + login_uid);
                // **below is template: json formatted
                let d;
                try { d = JSON.parse(this.responseText); }
                catch (e) { alert('Response Format error! ' + this.responseText); return; }
                if (d.success == false) { alert(d.message); return; } //console.log(d.success);
                window.location.href = "index.html";
            }
            else if (this.readyState == 4) {
                alert("Server Unreachable. Possible Slow Internet Connection..!");
            }
        };
}