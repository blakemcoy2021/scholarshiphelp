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
    switch (s) {
        case "new":
            c += "Waiting for review.</i>";
            setProgress(1);
            break;
        case "queue":
            c += "Your application will be next.</i>";
            setProgress(2);
            break;
        case "documents":
            c += "Your documents are under-review.</i>";
            setProgress(5);
            break;
    }

    h.innerHTML = c;

}

