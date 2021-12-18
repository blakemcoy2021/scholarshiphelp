function viewList(barangay, elm) {
    if (elm.innerHTML == "???") {
        return;
    }
    if (parseInt(elm.innerHTML) == 0) {
        alert("There are no applicants in this barangay.");
        return;
    }

    document.getElementById('htmMdlViewUpdate').style.display='block';

    let brgynme = document.getElementById("htmMdlLblBrgyName");
    if (barangay == "Maria" || barangay == "Lucia" || barangay == "Rosario") {
        brgynme.innerHTML = "Brgy. Santa " + barangay;
    } else if (barangay == "Santiago") {
        brgynme.innerHTML = "Brgy. " + barangay;
    } else {
        brgynme.innerHTML = "Brgy. San " + barangay;
    }

    clearInterval(scholarTimer);
    scholarTimer = 0;

    var tbl = document.getElementById("tblscholarapps");

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/dashboard/get_brgyrapps.php?bgy=" + barangay;
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
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>No Applicants Recorded...</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataListSchApps",1);
                return; 
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>PARSE ERROR</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataListSchApps",1);
                return;
            }     
            console.log(records);


            //**prio record counter to avoid glitch of table/field not refreshing due to old ids in it being updated */
            let loadSchApps = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrListSchApps");
            let new_schappCtr = records.length;
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchApps = false;
            }
            window.sessionStorage.setItem("last_dbctrListSchApps", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrListSchApps"); console.log(t);


            let prev_schappId = window.sessionStorage.getItem("last_schappid");
            let new_schappId = records[0].user_id; 
            //console.log(prev_schappId + " = " + new_schappId);


            // below where used to refresh table/field even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)
            let ctr = window.sessionStorage.getItem("donereq_dataListSchAppCtr");
            if (ctr >= 4) {
                if (prev_schappId == new_schappId) {
                    //records are not equal even there is no new records due to being lessen, allow to reload table
                    if (!loadSchApps) {
                        console.log("Same recent data, no refresh on fields..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_schappId > new_schappId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        alert("New Scholarship Application added!")
                    }
                }
                window.sessionStorage.setItem("last_schappid", records[0].user_id);
            } else {
                window.sessionStorage.setItem("donereq_dataListSchAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_schappid"); console.log(t);

            let tbl_colname = '';
            let tbl_rowdata = "";
            
            if (records.length == 0) {
                tbl_rowdata = 	"<tr><td>No Records.</td></tr>";
            } else {
                for (let i = 0; i < records.length; i++) {	// deal with the parseInt(respo) > 1 NOT 0
                    
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let d = new Date(records[i].scholar_dateadded);
                    let date_val = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
                    

                    tbl_rowdata += 	"<tr>" +
                                        "<td class='tdoverflow'>" + records[i].user_firstname + " " + records[i].user_lastname + "</td>" +
                                        "<td class='tdoverflow'>" + records[i].scholar_serial + "</td>" +
                                        "<td class='tdbasic'>" + records[i].scholar_status + "</td>" +
                                        "<td class='tdbasic'>" + date_val+ "</td>" +
                                    "</tr>";
    
                }            
            }

            document.getElementById("lblLoadingRecords").style.display = "none";
            
            tbl.innerHTML = tbl_colname + tbl_rowdata;           
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataListSchApps",1);
    };
}
