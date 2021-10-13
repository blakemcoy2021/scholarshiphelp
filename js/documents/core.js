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

    window.sessionStorage.setItem("last_dbctrLatestUpFiles", 0);
    window.sessionStorage.setItem("last_upfileid", 0);
    window.sessionStorage.setItem("donereq_dataLatestUpFileCtr", 0);
    window.sessionStorage.setItem("donereq_dataLatestUpFiles", 1);
        window.sessionStorage.setItem("last_dbctrUpFileCtr", 0);
        window.sessionStorage.setItem("last_upfileCtrid", 0);
        window.sessionStorage.setItem("donereq_dataUpFileCtr", 0);
        window.sessionStorage.setItem("donereq_dataCtrUpFile", 1);
    window.sessionStorage.setItem("sortstatus_name", 0);
    window.sessionStorage.setItem("sortstatus_joined", 0);
}


function load_UploadFilesCtr() {
    var spn = document.getElementById("lblTotalFiles");

    let uid = document.getElementById("hidfld_uid");
    let failfieldctr = 0;
    if (uid.value == "?") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert('Connection Problem. Logout and try logging in again');
        return;
    }

    var data = "suid=" + uid.value;

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/documents/ctr_uploadfiles.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);

            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == "false") { alert(d.message); return; } //console.log(d.success);

            let loadUpFileCtr = true;
            let prev_upfileCtr = window.sessionStorage.getItem("last_dbctrUpFileCtr");
            let new_upfileCtr = d.success;
            //console.log(prev_upfileCtr + " = " + new_upfileCtr);
            if (new_upfileCtr == prev_upfileCtr) {
                loadUpFileCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrUpFileCtr", new_upfileCtr);
            //let t = window.sessionStorage.getItem("last_dbctrUpFileCtr"); console.log(t);


            let prev_upfileCtrId = window.sessionStorage.getItem("last_upfileCtrid");
            let new_upfileCtrId = d.success;
            //console.log(prev_upfileCtrId + " = " + new_upfileCtrId);

            let ctr = window.sessionStorage.getItem("donereq_dataUpFileCtr");
            if (ctr >= 4) {
                if (prev_upfileCtrId == new_upfileCtrId) {
                    if (!loadUpFileCtr) {
                        console.log("Same recent data COUNT, no refresh on counter label..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_upfileCtrId > new_upfileCtrId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        //alert("Number of total uploaded iles updated!")
                    }
                }
                window.sessionStorage.setItem("last_upfileCtrid", d.success);
            } else {
                window.sessionStorage.setItem("donereq_dataUpFileCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_upfileCtrid"); console.log(t);

            spn.innerHTML = "you have " + d.success + " of uploaded files.";         
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrUpFile",1);
    };
}
function load_UploadFiles() {
    var tbl = document.getElementById("tblscholardocs");

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/documents/get_uploadfiles.php?suid=" + document.getElementById("hidfld_uid").value;
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
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>No Uploaded Files...</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestUpFiles",1);
                return; 
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>PARSE ERROR</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestUpFiles",1);
                return;
            }     
            console.log(records);


            //**prio record counter to avoid glitch of table/field not refreshing due to old ids in it being updated */
            let loadUpFiles = true;
            let prev_upfileCtr = window.sessionStorage.getItem("last_dbctrLatestUpFiles");
            let new_upfileCtr = records.length;
            //console.log(prev_upfileCtr + " = " + new_upfileCtr);
            if (new_upfileCtr == prev_upfileCtr) {
                loadUpFiles = false;
            }
            window.sessionStorage.setItem("last_dbctrLatestUpFiles", new_upfileCtr);
            //let t = window.sessionStorage.getItem("last_dbctrLatestUpFiles"); console.log(t);


            let prev_upfileId = window.sessionStorage.getItem("last_upfileid");
            let new_upfileId = records[0].user_id; 
            //console.log(prev_upfileId + " = " + new_upfileId);


            // below where used to refresh table/field even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)
            let ctr = window.sessionStorage.getItem("donereq_dataLatestUpFileCtr");
            if (ctr >= 4) {
                if (prev_upfileId == new_upfileId) {
                    //records are not equal even there is no new records due to being lessen, allow to reload table
                    if (!loadUpFiles) {
                        console.log("Same recent data, no refresh on fields..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_upfileId > new_upfileId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        alert("New Uploaded Files added!")
                    }
                }
                window.sessionStorage.setItem("last_upfileid", records[0].user_id);
            } else {
                window.sessionStorage.setItem("donereq_dataLatestUpFileCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_upfileid"); console.log(t);

            let tbl_colname = '';
            let tbl_rowdata = "";
            
            if (records.length == 0) {
                tbl_rowdata = 	"<tr><td>No Records.</td></tr>";
            } else {
                for (let i = 0; i < records.length; i++) {	// deal with the parseInt(respo) > 1 NOT 0
                    
                    let typ = records[i].type;

                    let d;
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let approve_val = " style='background-color: #4CAF50; color: white;'";
                    let file_name;

                    if (typ == 'cor') {
                        d = new Date(records[i].cor_lastupdate);
                        if (records[i].cor_verified != "1") {   approve_val = "";   }
                        file_name = records[i].cor_filename;

                    } else if (typ == 'cog') {
                        d = new Date(records[i].cog_lastupdate);
                        if (records[i].cog_verified != "1") {   approve_val = "";   }
                        file_name = records[i].cog_filename;

                    } else if (typ == 'idg') {
                        d = new Date(records[i].idg_lastupdate);
                        if (records[i].idg_verified != "1") {   approve_val = "";   }
                        file_name = records[i].idg_filename;

                    }
                    let date_val = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();

                    tbl_rowdata += 	"<tr" + approve_val + ">" +
                                        "<td class='tdbasic'>" + records[i].scholar_title + "</td>" +
                                        "<td class='tdbasic'>" + file_name + "</td>" +
                                        "<td class='tdbasic'>" + records[i].scholar_status + "</td>" +
                                        "<td class='tdbasic'>" + date_val + "</td>" +
                                        "<td class='tdbasic'>" + typ + "</td>" +
                                    "</tr>";
    
                }            
            }

            document.getElementById("lblLoadingRecords").style.display = "none";
            
            tbl.innerHTML = tbl_colname + tbl_rowdata;           
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataLatestUpFiles",1);
    };
}
function startcycle_load_UploadFiles() {
    return setInterval(function() {
        let donereq = window.sessionStorage.getItem("donereq_dataLatestUpFiles");
        if (donereq == 1) {
            //console.log(donereq + " A");
            let ctr = window.sessionStorage.getItem("donereq_dataLatestUpFileCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataLatestUpFileCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataLatestUpFiles", 0);
            load_UploadFiles();
        }
        //console.log(donereq  + " B");
        
        let donereq2 = window.sessionStorage.getItem("donereq_dataCtrUpFile");
        if (donereq2 == 1) {
            //console.log(donereq + " C");
            let ctr = window.sessionStorage.getItem("donereq_dataUpFileCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataUpFileCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataCtrUpFile", 0);
            load_UploadFilesCtr();
        }
        //console.log(donereq  + " D");

    }, 2000);    
}
function start_uploadFileTime() {
    uploadfileTimer = startcycle_load_UploadFiles();
}
