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

            let rmcache = new Date();
            document.getElementById("imgPhoto").src = records[0].user_photo + "?nc=" + rmcache.getMilliseconds();

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };

    window.sessionStorage.setItem("last_dbctrLatestCurrApps", 0);
    window.sessionStorage.setItem("last_currappid", 0);
    window.sessionStorage.setItem("donereq_dataLatestCurrAppCtr", 0);
    window.sessionStorage.setItem("donereq_dataLatestCurrApps", 1);
        window.sessionStorage.setItem("last_dbctrCurrAppCtr", 0);
        window.sessionStorage.setItem("last_currAppid", 0);
        window.sessionStorage.setItem("donereq_dataCurrAppCtr", 0);
        window.sessionStorage.setItem("donereq_dataCtrCurrApp", 1);
    window.sessionStorage.setItem("sortstatus_name", 0);
    window.sessionStorage.setItem("sortstatus_joined", 0);
}


function load_CurrAppsCtr() {
    var spn = document.getElementById("numCurrApps");

    let uid = document.getElementById("hidfld_uid");
    let failfieldctr = 0;
    if (uid.value == "?") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert('Connection Problem. Logout and try logging in again');
        return;
    }

    var data = "suid=" + uid.value;

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/home/ctr_currapps.php";
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

            let loadCurrAppCtr = true;
            let prev_currappCtr = window.sessionStorage.getItem("last_dbctrCurrAppCtr");
            let new_currappCtr = d.success;
            //console.log(prev_currappCtr + " = " + new_currappCtr);
            if (new_currappCtr == prev_currappCtr) {
                loadCurrAppCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrCurrAppCtr", new_currappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrCurrAppCtr"); console.log(t);


            let prev_currappCtrId = window.sessionStorage.getItem("last_currAppid");
            let new_currappCtrId = d.success;
            //console.log(prev_currappCtrId + " = " + new_currappCtrId);

            let ctr = window.sessionStorage.getItem("donereq_dataCurrAppCtr");
            if (ctr >= 4) {
                if (prev_currappCtrId == new_currappCtrId) {
                    if (!loadCurrAppCtr) {
                        console.log("Same recent data COUNT, no refresh on counter label..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_currappCtrId > new_currappCtrId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        //alert("Number of total current application updated!")
                    }
                }
                window.sessionStorage.setItem("last_currAppid", d.success);
            } else {
                window.sessionStorage.setItem("donereq_dataCurrAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_currAppid"); console.log(t);

            if (parseInt(d.success) != 0) {
                spn.innerHTML = "Current Application: " + d.success;
                document.getElementById("viewAppProgress").style.removeProperty('display');
                document.getElementById("viewNoCurrApp").style.display = 'none';
            } else {
                document.getElementById("viewNoCurrApp").style.removeProperty('display');
                document.getElementById("viewAppProgress").style.display = 'none';
            }


        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrCurrApp",1);
    };
}
function load_CurrApps() {
    var tbl = document.getElementById("tblcurrapplist");

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/home/get_currapps.php?suid=" + document.getElementById("hidfld_uid").value;
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
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>No Current Applications...</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestCurrApps",1);
                return; 
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                document.getElementById("lblLoadingRecords").style.display = "none";
                tbl.innerHTML = "<tr><td><h2 class='w3-text-red'>PARSE ERROR</h2></td></tr>"; 
                window.sessionStorage.setItem("donereq_dataLatestCurrApps",1);
                return;
            }     
            console.log(records);


            //**prio record counter to avoid glitch of table/field not refreshing due to old ids in it being updated */
            let loadCurrApps = true;
            let prev_currappCtr = window.sessionStorage.getItem("last_dbctrLatestCurrApps");
            let new_currappCtr = records.length;
            //console.log(prev_currappCtr + " = " + new_currappCtr);
            if (new_currappCtr == prev_currappCtr) {
                loadCurrApps = false;
            }
            window.sessionStorage.setItem("last_dbctrLatestCurrApps", new_currappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrLatestCurrApps"); console.log(t);


            let prev_currappId = window.sessionStorage.getItem("last_currappid");
            let new_currappId = records[0].user_id; 
            //console.log(prev_currappId + " = " + new_currappId);


            // below where used to refresh table/field even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)
            let ctr = window.sessionStorage.getItem("donereq_dataLatestCurrAppCtr");
            if (ctr >= 4) {
                if (prev_currappId == new_currappId) {
                    //records are not equal even there is no new records due to being lessen, allow to reload table
                    if (!loadCurrApps) {
                        console.log("Same recent data, no refresh on fields..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_currappId > new_currappId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        alert("New Current Applications Found!")
                    }
                }
                window.sessionStorage.setItem("last_currappid", records[0].user_id);
            } else {
                window.sessionStorage.setItem("donereq_dataLatestCurrAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_currappid"); console.log(t);

            let tbl_colname = '';
            let tbl_rowdata = "";
            
            let firstrow = true;
            let highlight = "class='w3-gray'";
            
            if (records.length == 0) {
                tbl_rowdata = 	"<tr><td>No Records.</td></tr>";
            } else {
                for (let i = 0; i < records.length; i++) {	// deal with the parseInt(respo) > 1 NOT 0

                    let xyz = window.localStorage.getItem("singleRun");
                    if (xyz == 0) {
                        window.localStorage.setItem("singleRun", 1);
                        document.getElementById("lblSelectedApp").innerHTML = "Application Name: " + records[i].scholar_title;
                        let s = records[i].scholar_status;
                        s = s.toLowerCase();
                        
                        h = document.getElementById("currAppState");
                        c = "<i class='fa fa-area-chart' aria-hidden='true'> ";

                        switch (s) {
                            case "new":
                                c += "Waiting for review.</i>";
                                setProgress(1);
                                break;
                            case "queue":
                                c += "Your application will be soon reviewed.</i>";
                                setProgress(2);
                                break;
                            case "documents":
                                c += "Your uploaded documents are under-review.</i>";
                                setProgress(5);
                                break;
                        }
 
                        h.innerHTML = c;
                    }

                    if (!firstrow) { highlight = "class='w3-hover-gray'"; } highlight = "";

                    tbl_rowdata += 	"<tr " + highlight + " style='cursor: pointer;' onclick=\"javascript: checkStatus('" + records[i].scholar_id + "', '" + records[i].scholar_status + "', this);\">" +
                                        "<td class='tdbasic'>" + records[i].scholar_title + "</td>" +
                                    "</tr>";
    
                    firstrow = false;
                }            
            }

            document.getElementById("lblLoadingRecords").style.display = "none";
            
            tbl.innerHTML = tbl_colname + tbl_rowdata;           
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataLatestCurrApps",1);
    };
}
function startcycle_load_CurrApps() {
    return setInterval(function() {
        let donereq = window.sessionStorage.getItem("donereq_dataLatestCurrApps");
        if (donereq == 1) {
            //console.log(donereq + " A");
            let ctr = window.sessionStorage.getItem("donereq_dataLatestCurrAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataLatestCurrAppCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataLatestCurrApps", 0);
            load_CurrApps();
        }
        //console.log(donereq  + " B");
        
        let donereq2 = window.sessionStorage.getItem("donereq_dataCtrCurrApp");
        if (donereq2 == 1) {
            //console.log(donereq + " C");
            let ctr = window.sessionStorage.getItem("donereq_dataCurrAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataCurrAppCtr", ctr);
            // above where used to refresh table even w/o new records 
            // in case there is a modification among those records happened (e.g. respond and solve state)

            window.sessionStorage.setItem("donereq_dataCtrCurrApp", 0);
            load_CurrAppsCtr();
        }
        //console.log(donereq  + " D");

    }, 2000);    
}
function start_currAppsTime() {
    currAppTimer = startcycle_load_CurrApps();
}


function setProgress(step) {

    let arr = ["firstStep", "secondStep", "thirdStep", "fourthStep", "fifthStep", 
                "sixthStep", "seventhStep", "eightStep", "ninthStep", "tenthStep"];

    /** turn all row steps to gray first */
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).classList.remove("w3-green");
        document.getElementById(arr[i]).classList.add("w3-gray");        
    }
    /** turn all row steps to green based on the status */
    for (let i = 0; i < step; i++) {
        document.getElementById(arr[i]).classList.remove("w3-gray");    
        document.getElementById(arr[i]).classList.add("w3-green");
    }


}