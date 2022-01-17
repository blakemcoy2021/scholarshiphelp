// document.onreadystatechange = function(e) {
//     if (document.readyState === 'complete') {
//         onSession();
//     }
// }

window.onpaint = onSession();

function onSession() {
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/common/session.php";
    xmlhttp.open("GET", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            console.log(this.responseText);
            if (this.responseText == "exit") {
                window.location.href = "index.html";
                alert("You are not yet login.");
                
            }
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}