function openMenuBars() {
    var x = document.getElementById("htmDivTopNav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}



function viewScholarApp(scholarId) {

    hid_scholarId.value = scholarId;

  clearInterval(scholarTimer);
  scholarTimer = 0;

  if (confirm("*** Award scholarship to this application?") == false) {
      if (confirm("*** !!! Review scholarship application again?") == true) {
        requestAwardProcess(scholarId, 0);
      }
      start_scholarAppTime();
      return;
  }
  start_scholarAppTime();

  requestAwardProcess(scholarId, 1);
}

function requestAwardProcess(scholarId, operation) {
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/awardees/upd_awardscholar.php?sid=" + scholarId + "&ops=" + operation;
    xmlhttp.open("GET", route, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { //console.log(this.responseText);
  
            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            if (d.success == false) { alert(d.message); return; } //console.log(d.success);
  
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}


btn_sort.onclick = function() {
  let x = window.sessionStorage.getItem("tblsort");
  if (x == "def") {
    window.sessionStorage.setItem("tblsort", "az");
    btn_sort.innerHTML = "A-Z to Z-A";
  }
  else if (x == "az") {
    window.sessionStorage.setItem("tblsort", "za");
    btn_sort.innerHTML = "Z-A to Default";
  }
  else if (x == "za") {
    window.sessionStorage.setItem("tblsort", "def");
    btn_sort.innerHTML = "Default to A-Z";
  }
}
  
function tblSearch(elm, elm2, elm3, tbl, col) {
    var input, filter, table, tr, td, i, txtValue;
    input = elm;
    filter = input.value.toUpperCase();

    elm2.value = "";
    elm3.value = "";

    if (filter !== "") {

        clearInterval(scholarTimer);
        scholarTimer = 0;

        table = tbl;
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[parseInt(col)];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
    } else {
        start_scholarAppTime();
    }
};

