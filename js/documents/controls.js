
function tblSearch(elm, tbl) {
    var input, filter, table, tr, td, i, txtValue;
    input = elm;
    filter = input.value.toUpperCase();

    if (filter !== "") {

        clearInterval(uploadfileTimer);
        uploadfileTimer = 0;

        table = tbl;
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
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
        start_uploadFileTime();
    }
};


function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

      
var modal = document.getElementById("mdl_fileViewer");
var span = document.getElementsByClassName("close")[0];

function rowOpenFile(pdfoimg, path, filename) {
  modal.style.display = "block";
  document.getElementById("mdl_filename").innerHTML = filename;

  if (pdfoimg == "pdf") { 
    document.getElementById("mdl_case").style.width = '80%';
    document.getElementById("pdfviewer_area").style.display = "block";
    document.getElementById("imgviewer_area").style.display = "none";
    PDFObject.embed(path, "#pdfviewer_area");
  } else {
    document.getElementById("mdl_case").style.width = '50%';
    document.getElementById("pdfviewer_area").style.display = "none";
    document.getElementById("imgviewer_area").style.display = "block";
    document.getElementById("imgviewer_area").src = path;
  }

}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
