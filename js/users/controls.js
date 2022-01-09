function openMenuBars() {
    var x = document.getElementById("htmDivTopNav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
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


  
//function tblSearch(elm, elm2, elm3, tbl, col) {
function tblSearch(elm, elm2, tbl, col) {
    var input, filter, table, tr, td, i, txtValue;
    input = elm;
    filter = input.value.toUpperCase();

    elm2.value = "";
    //elm3.value = "";

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


document.getElementsByClassName("tablink")[0].click();
function viewTabs(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("req");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");

}