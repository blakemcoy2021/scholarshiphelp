function init() {
    //var uname = document.getElementById("lblScholarName");
    if (typeof(Storage) !== "undefined") {
        let fname = window.localStorage.getItem("fname");
        //uname.innerHTML = fname;
        console.log("Acquire localstorage value :: " + fname);

        document.getElementById("hidfld_uid").value = window.localStorage.getItem("uid");
        document.getElementById("hidfld_fname").value = fname;

    } else {
        let urlParams = new URLSearchParams(window.location.search);
        let fname = urlParams.get("fname");
        //uname.innerHTML = fname;
        console.log("NO localstorage support :: " + fname);

        document.getElementById("hidfld_uid").value = urlParams.get('uid');
        document.getElementById("hidfld_fname").value = fname;
    }

    window.sessionStorage.setItem("last_dbctrLatestSchApps", 0);
    window.sessionStorage.setItem("last_schappid", 0);
    window.sessionStorage.setItem("donereq_dataLatestSchAppCtr", 0);
    window.sessionStorage.setItem("donereq_dataLatestSchApps", 1);
        window.sessionStorage.setItem("last_dbctrSchAppCtr", 0);
        window.sessionStorage.setItem("last_schappCtrid", 0);
        window.sessionStorage.setItem("donereq_dataSchAppCtr", 0);
        window.sessionStorage.setItem("donereq_dataCtrSchApp", 1);
}

function load_admschupds(d_arr) {

    let data = "";
    for (let j = 1; j < d_arr.length-1; j++) {
        data += d_arr[j] + "&";
    }
    data += d_arr[d_arr.length-1] + "";

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/masterlist/notify.php?" + data;
    xmlhttp.open("GET", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);

            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == "false") { alert(d.message); return; } //console.log(d.success);
            
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}

function load_ScholarAppsCtr() {
    var spn = document.getElementById("lblTotalApplications");

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/masterlist/ctr_applyscholars.php";
    xmlhttp.open("GET", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);

            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == "false") { alert(d.message); return; } //console.log(d.success);

            let d_arr = d.success.split(",");


            if (d_arr.length > 1) {
                let h = window.localStorage.getItem("scholar_updatePrompt");
                if (h == 0) {
                    window.localStorage.setItem("scholar_updatePrompt", 1);
                    let msg = "There are new updates regarding ";
                    for (let j = 1; j < d_arr.length-1; j++) {
                        let k = d_arr[j].split("=");
                        msg += k[0] + ", ";
                    }
                    let k = d_arr[d_arr.length-1].split("=");
                    msg += k[0] + ".";
                    alert(msg);
                    load_admschupds(d_arr)

                }
            }

            let loadSchAppCtr = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrSchAppCtr");
            let new_schappCtr = d_arr[0];
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchAppCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrSchAppCtr", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrSchAppCtr"); console.log(t);


            let prev_schappCtrId = window.sessionStorage.getItem("last_schappCtrid");
            let new_schappCtrId = d_arr[0];
            //console.log(prev_schappCtrId + " = " + new_schappCtrId);

            let ctr = window.sessionStorage.getItem("donereq_dataSchAppCtr");
            if (ctr >= 4) {
                if (prev_schappCtrId == new_schappCtrId) {
                    if (!loadSchAppCtr) {
                        console.log("Same recent data COUNT, no refresh on counter label..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_schappCtrId > new_schappCtrId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        //alert("Number of total registered scholarship application updated!")
                    }
                }
                window.sessionStorage.setItem("last_schappCtrid", d_arr[0]);
            } else {
                window.sessionStorage.setItem("donereq_dataSchAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_schappCtrid"); console.log(t);

            spn.innerHTML = d_arr[0] + " on-going scholarship applications.";         
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrSchApp",1);
    };
}
function load_ScholarApps() {
    var tbl = document.getElementById("tblscholarapps");

        var x = window.sessionStorage.getItem("tblsort");
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/masterlist/get_applyscholars.php?zrt=" + x;
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
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>No Scholarship Applications Recorded...</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestSchApps",1);
                return; 
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>PARSE ERROR</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestSchApps",1);
                return;
            }     
            console.log(records);


            //**prio record counter to avoid glitch of table/field not refreshing due to old ids in it being updated */
            let loadSchApps = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrLatestSchApps");
            let new_schappCtr = records.length;
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchApps = false;
            }
            window.sessionStorage.setItem("last_dbctrLatestSchApps", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrLatestSchApps"); console.log(t);


            let prev_schappId = window.sessionStorage.getItem("last_schappid");
            let new_schappId = records[0].scholar_id; 
            //console.log(prev_schappId + " = " + new_schappId);


            // below where used to refresh table/field even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)
            let ctr = window.sessionStorage.getItem("donereq_dataLatestSchAppCtr");
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
                window.sessionStorage.setItem("last_schappid", records[0].scholar_id);
            } else {
                window.sessionStorage.setItem("donereq_dataLatestSchAppCtr", 0);
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
                     
                    //let docs_val = "";
                    let hasCOR = "N/A - Certificate of Registration";
                    let hasCOG = "N/A - Copy of Grades";
                    let hasIDG = "N/A - Certificate of Indigency";
                    let hasIDC = "N/A - Photo ID";
                    let hasBIO = "N/A - Biodata";
                    if (records[i].cor_path != "no_path") {
                        hasCOR = "SENT - Certificate of Registration";
                    }
                    if (records[i].cog_path != "no_path") {
                        hasCOG = "SENT - Copy of Grades";
                    }
                    if (records[i].idg_path != "no_path") {
                        hasIDG = "SENT - Certificate of Indigency";
                    }
                    if (records[i].idc_path != "no_path") {
                        hasIDC = "SENT - Photo ID";
                    }
                    if (records[i].bio_path != "no_path") {
                        hasBIO = "SENT - Biodata";
                    }

                    let viewRecord = "style='cursor:pointer;' onclick=\"javascript: viewScholarApp('"+records[i].scholar_id+"');\" ";
                    
                    tbl_rowdata += 	"<tr "+viewRecord+">" +
                                        "<td class='tdoverflow'>" + records[i].user_firstname + " " + records[i].user_lastname + "</td>" +
                                        "<td class='tdoverflow'>" + records[i].scholar_barangay + "</td>" +
                                        "<td class='tdbasic'>" + records[i].scholar_status + "</td>" +
                                        "<td class='tdoverflow'>" + 
                                            "<p style='padding: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%'>" 
                                                + hasCOR + 
                                            "</p>" +
                                            "<p style='padding: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%'>" 
                                                + hasCOG + 
                                            "</p>" +
                                            "<p style='padding: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%'>" 
                                                + hasIDG + 
                                            "</p>" +
                                            "<p style='padding: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%'>" 
                                                + hasIDC + 
                                            "</p>" +
                                            "<p style='padding: 0; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%'>" 
                                                + hasBIO + 
                                            "</p>" +
                                        "</td>" +
                                        "<td class='tdbasic'>" + records[i].scholar_serial + "</td>" +
                                        "<td class='tdoverflow'>" + records[i].scholar_school + "</td>" +
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
        window.sessionStorage.setItem("donereq_dataLatestSchApps",1);
    };
}
function startcycle_load_ScholarApps() {
    return setInterval(function() {
        let donereq = window.sessionStorage.getItem("donereq_dataLatestSchApps");
        if (donereq == 1) {
            //console.log(donereq + " A");
            let ctr = window.sessionStorage.getItem("donereq_dataLatestSchAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataLatestSchAppCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataLatestSchApps", 0);
            load_ScholarApps();
        }
        //console.log(donereq  + " B");
        
        let donereq2 = window.sessionStorage.getItem("donereq_dataCtrSchApp");
        if (donereq2 == 1) {
            //console.log(donereq + " C");
            let ctr = window.sessionStorage.getItem("donereq_dataSchAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataSchAppCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataCtrSchApp", 0);
            load_ScholarAppsCtr();
        }
        //console.log(donereq  + " D");

    }, 2000);    
}
function start_scholarAppTime() {
    scholarTimer = startcycle_load_ScholarApps();
}
