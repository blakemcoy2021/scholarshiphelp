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

        window.sessionStorage.setItem("last_dbctrSchAppCtr", 0);
        window.sessionStorage.setItem("last_schappCtrid", 0);
        window.sessionStorage.setItem("donereq_dataSchAppCtr", 0);
        window.sessionStorage.setItem("donereq_dataCtrSchApp", 1);

        window.sessionStorage.setItem("last_dbctrBgyAppCtr", 0);
        window.sessionStorage.setItem("last_bgyappCtrid", 0);
        window.sessionStorage.setItem("donereq_dataBgyAppCtr", 0);
        window.sessionStorage.setItem("donereq_dataCtrBgyApp", 1);

        window.sessionStorage.setItem("last_dbctrListSchApps", 0);
        window.sessionStorage.setItem("last_schappid", 0);
        window.sessionStorage.setItem("donereq_dataListSchAppCtr", 0);
        window.sessionStorage.setItem("donereq_dataListSchApps", 1);
}


function load_ScholarAppsCtr() {

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/dashboard/ctr_allscholarapps.php";
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

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                window.sessionStorage.setItem("donereq_dataCtrSchApp",1);
                return;
            }     
            console.log(records);

            let loadSchAppCtr = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrSchAppCtr");
            let new_schappCtr = records;
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchAppCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrSchAppCtr", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrSchAppCtr"); console.log(t);


            let prev_schappCtrId = window.sessionStorage.getItem("last_schappCtrid");
            let new_schappCtrId = records;
            //console.log(prev_schappCtrId + " = " + new_schappCtrId);

            let ctr = window.sessionStorage.getItem("donereq_dataSchAppCtr");
            if (ctr >= 4) {
                if (prev_schappCtrId === new_schappCtrId) {
                    if (!loadSchAppCtr) {
                        console.log("Same recent data COUNT, no refresh on counter label..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_schappCtrId === new_schappCtrId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        //alert("Number of total registered scholarship application updated!")
                    }
                }
                window.sessionStorage.setItem("last_schappCtrid", records);
            } else {
                window.sessionStorage.setItem("donereq_dataSchAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_schappCtrid"); console.log(t);

            lbl_ctrNewApps.innerHTML = records.new;
            lbl_ctrOngoingApps.innerHTML = records.curr;
            lbl_ctrDoneApps.innerHTML = records.done;

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrSchApp",1);
    };
}
function load_AppsBrgyCtr() {

    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/dashboard/ctr_allappsbrgy.php";
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

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                alert('Parse error! Contact System Administrator! ' + d.success);
                window.sessionStorage.setItem("donereq_dataCtrBgyApp",1);
                return;
            }     
            console.log(records);

            let loadSchAppCtr = true;
            let prev_schappCtr = window.sessionStorage.getItem("last_dbctrBgyAppCtr");
            let new_schappCtr = records;
            //console.log(prev_schappCtr + " = " + new_schappCtr);
            if (new_schappCtr == prev_schappCtr) {
                loadSchAppCtr = false;
            }
            window.sessionStorage.setItem("last_dbctrBgyAppCtr", new_schappCtr);
            //let t = window.sessionStorage.getItem("last_dbctrBgyAppCtr"); console.log(t);


            let prev_schappCtrId = window.sessionStorage.getItem("last_bgyappCtrid");
            let new_schappCtrId = records;
            //console.log(prev_schappCtrId + " = " + new_schappCtrId);

            let ctr = window.sessionStorage.getItem("donereq_dataBgyAppCtr");
            if (ctr >= 4) {
                if (prev_schappCtrId === new_schappCtrId) {
                    if (!loadSchAppCtr) {
                        console.log("Same recent data COUNT, no refresh on counter label..!");
                        return;    
                    }
                } else {
                    //records were lessen meaning no new records
                    if (prev_schappCtrId === new_schappCtrId) {
                        //allow the table/field to refresh without popping the notification
                    } else {
                        //**notification modal block here
                        //document.getElementById("iadmin_modalRecentReports").style.display = "block";
                        //alert("Number of total registered scholarship application updated!")
                    }
                }
                window.sessionStorage.setItem("last_bgyappCtrid", records);
            } else {
                window.sessionStorage.setItem("donereq_dataBgyAppCtr", 0);
                //allow the table to refresh without popping the notifications
            }

            // //t = window.sessionStorage.getItem("last_bgyappCtrid"); console.log(t);

            lbl_ctrAppsAgustin.innerHTML = records.agustin;
            lbl_ctrAppsBartolome.innerHTML = records.bartolome;
            lbl_ctrAppsSanIsidro.innerHTML = records.isidro;
            lbl_ctrAppsSanJoaquin.innerHTML = records.joaquin;

            lbl_ctrAppsSanJose.innerHTML = records.jose;
            lbl_ctrAppsSanJuan.innerHTML = records.juan;
            lbl_ctrAppsSanNicolas.innerHTML = records.nicolas;

            lbl_ctrAppsSanPablo.innerHTML = records.pablo;
            lbl_ctrAppsSanPedro.innerHTML = records.pedro;
            lbl_ctrAppsSanRoque.innerHTML = records.roque;
            lbl_ctrAppsSantaLucia.innerHTML = records.lucia;

            lbl_ctrAppsSantaMaria.innerHTML = records.maria;
            lbl_ctrAppsSantiago.innerHTML = records.santiago;
            lbl_ctrAppsSantaRosario.innerHTML = records.rosario;

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
        window.sessionStorage.setItem("donereq_dataCtrBgyApp",1);
    };
}


function startcycle_load_ScholarApps() {
    return setInterval(function() {        

        let donereq2 = window.sessionStorage.getItem("donereq_dataCtrSchApp");
        if (donereq2 == 1) {
            let ctr = window.sessionStorage.getItem("donereq_dataSchAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataSchAppCtr", ctr);

            window.sessionStorage.setItem("donereq_dataCtrSchApp", 0);
            load_ScholarAppsCtr();
        }

        let donereq3 = window.sessionStorage.getItem("donereq_dataCtrBgyApp");
        if (donereq3 == 1) {
            let ctr = window.sessionStorage.getItem("donereq_dataBgyAppCtr");
            ctr++;
            window.sessionStorage.setItem("donereq_dataBgyAppCtr", ctr);

            window.sessionStorage.setItem("donereq_dataCtrBgyApp", 0);
            load_AppsBrgyCtr();
        }

    }, 2000);    
}
function start_scholarAppTime() {
    scholarTimer = startcycle_load_ScholarApps();
}
