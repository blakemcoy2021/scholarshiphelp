// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

document.getElementById("imgPhoto").onerror = function() {
    document.getElementById("imgPhoto").src = "images/register/photoplaceholder.jpg";
}

function checkStatus(schid, status, el) {
    // let tbl = document.getElementById("tblcurrapplist");
    // let tbd = tbl.getElementsByTagName("tbody")[0];
    // let tr = tbd.getElementsByTagName("tr")[0];
    // tr.classList.remove('w3-gray');
    // el.classList.add('w3-gray');

    let td = el.getElementsByTagName("td")[0];
    document.getElementById("lblSelectedApp").innerHTML = "Application Label: " + td.innerHTML;

    h = document.getElementById("currAppState");
    c = "<i class='fa fa-area-chart' aria-hidden='true'> ";
    let s = status.toLowerCase();
    let overall = false;
    switch (s) {
        case "new":
            c += "Going to be received.</i>";
            setProgress(1);
            break;
        case "for review":
            c += "Going to be reviewed.</i>";
            setProgress(2);
            break;
        case "reviewing":
            c += "Your application is under-review.</i>";
            setProgress(3);
            break;
        case "approved info":
            c += "Info in your app - approved.</i>";
            setProgress(4);
            break;
        case "review docs":
            c += "Your documents are under-review.</i>";
            setProgress(5);
            break;
        case "overall":
            c += "You are almost there.</i>";
            setProgress(10);
            overall = true;
            break;
        case "awarded":
            c = "<i class='fa fa-trophy' aria-hidden='true'> Congratulations! Claim Here!</i>";
            setProgress(11);
            overall = true;
            break;
            
    }

    if (overall == false) {
        onwardProgress(row.cor_verified, "sixthStep");
        onwardProgress(row.cog_verified, "seventhStep");
        onwardProgress(row.idg_verified, "eightStep");
        onwardProgress(row.idc_verified, "ninthStep");
    } 
    else {
        if (s == "awarded") {
            h.style.cursor = "pointer";
            h.onclick = function() {
                var xmlhttp = new XMLHttpRequest();
                route = "service/php/web/home/upd_getscholar.php?sid=" + row.scholar_id;
                xmlhttp.open("GET", route, true);
                xmlhttp.send();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) { //console.log(this.responseText);
                
                        // **below is template: json formatted
                        let d;
                        try { d = JSON.parse(this.responseText); }
                        catch (e) { alert('Response Format error! ' + this.responseText); return; }
                        if (d.success == false) { alert(d.message); return; } //console.log(d.success);
                        
                        alert("Scholarship Claimed!");
                    }
                    else if (this.readyState == 4) {
                        alert("Server Unreachable. Possible Slow Internet Connection..!");
                    }
                };

            }
        }
    }

    h.innerHTML = c;

}

