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


function load_ScholarAppsCtr() {
    var spn = document.getElementById("lblTotalOnlineScholars");

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/users/ctr_allscholars.php";
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

            let loadSchAppCtr = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrSchAppCtr");
            let new_schappCtr = d.success;
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchAppCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrSchAppCtr", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrSchAppCtr"); console.log(t);


            let prev_schappCtrId = window.sessionStorage.getItem("last_schappCtrid");
            let new_schappCtrId = d.success;
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
                window.sessionStorage.setItem("last_schappCtrid", d.success);
            } else {
                window.sessionStorage.setItem("donereq_dataSchAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_schappCtrid"); console.log(t);

            spn.innerHTML = "There are " + d.success + " total of online scholars.";         
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrSchApp",1);
    };
}
function load_ScholarApps() {
    var tbl = document.getElementById("tblscholars");

        var x = window.sessionStorage.getItem("tblsort");
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/users/get_allscholars.php?zrt=" + x;
    xmlhttp.open("GET", route, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);

            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == false) { alert(d.message); return; } //console.log(d.success);

            if (d.success == "zero") {
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>No Scholars Recorded...</h2></td></tr>"; 
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
                        alert("New Scholars added!")
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
                    let d = new Date(records[i].login_lastupdate);
                    let date_last = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
                    d = new Date(records[i].user_dateadded);
                    let date_added = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();

                    let viewRecord = "";
                    let status = records[i].login_isonline;
                    if (status == "1") {
                        viewRecord = "style='background-color: green; color: white;' ";
                        status = "YES";
                    } else {
                        viewRecord = "style='background-color: gray; color: white;' ";
                        status = "NO"
                    }



                    tbl_rowdata += 	"<tr "+viewRecord+">" +
                                        "<td class='tdoverflow'>" + records[i].user_firstname + " " + records[i].user_lastname + "</td>" +
                                        "<td class='tdoverflow'>" + records[i].contact_address + "</td>" +
                                        "<td class='tdbasic'>" + status + "</td>" +
                                        "<td class='tdbasic'>" + records[i].contact_phnum + "</td>" +
                                        "<td class='tdbasic'>" + date_last + "</td>" +
                                        "<td class='tdbasic'>" + date_added + "</td>" +
                                        
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
