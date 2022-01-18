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
        onwardProgress(row.bio_verified, "tenthStep");
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
                    if (this.readyState == 4 && this.status == 200) { console.log("########### " + this.responseText);
                
                        // **below is template: json formatted
                        let d;
                        try { d = JSON.parse(this.responseText); }
                        catch (e) { alert('Response Format error! ' + this.responseText); return; }
                        if (d.success == false) { alert(d.message); return; } //console.log(d.success);
                        
                        alert("Scholarship Claimed! " + d.success);

                        var Pagelink = "about:blank";
                        var pwa = window.open(Pagelink, "_new");
                        pwa.document.open();
                        pwa.document.write(PrintScholarReceipt(d.success));
                        pwa.document.close();

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

function PrintScholarReceipt(msg)
{
    return '<!DOCTYPE html>' +
    '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="x-apple-disable-message-reformatting">' +
    '<title></title>' +
    '<style>' +
    '    table, td, div, h1, p {font-family: Arial, sans-serif;}'+
    '</style>'+
    '</head>'+
    '<body style="margin:0;padding:0;">'+
    '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">'+
        '<tr>'+
        '<td align="center" style="padding:0;">'+
            '<table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">'+
            '<tr>'+
                '<td align="center" style="padding:0px;background:#70bbd9;">'+
                '<img src="http://45.77.42.41/images/headercover.jpg" alt="" style="height:auto;display:block;" />'+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td style="padding:36px 30px 42px 30px;">'+
                '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">'+
                    '<tr>'+
                    '<td style="padding:0 0 36px 0;color:#153643;">'+
                        '<h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Congratulations! You have received your scholarship.</h1>'+
                        '<p id="htmMsgAssessResult" style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">' + msg + '</p>'+

                    '</td>'+
                    '</tr>'+

                '</table>'+
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td style="padding:30px;background:#ee4c50;">'+
                '<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">'+
                   '<tr>'+
                    '<td style="padding:0;width:50%;" align="left">'+
                        '<p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">'+
                        '&reg; Scholarhelp @ 2021<br/>'+

                        '</p>'+
                    '</td>'+
                    
                    '</tr>'+
                '</table>'+
                '</td>'+
            '</tr>'+
            '</table>'+
        '</td>'+
        '</tr>'+
    '</table>'+
    '</body>'+
    '</html>';
}

