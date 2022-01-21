function claim(scholarId) {
  if (confirm("Set scholarship as claimed?") == true) {
    var xmlhttp = new XMLHttpRequest();
    route = "service/php/web/scholars/claim.php?sid=" + scholarId;
    xmlhttp.open("GET", route, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { console.log(this.responseText);
            // **below is template: json formatted
            let d;
            try { d = JSON.parse(this.responseText); }
            catch (e) { alert('Response Format error! ' + this.responseText); return; }
            alert(d.message);
        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
  }
}

function openMenuBars() {
    var x = document.getElementById("htmDivTopNav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}


function viewScholarApp(scholarId) {
  mdl_viewUpdate.style.display='block';

    hid_scholarId.value = scholarId;

  clearInterval(scholarTimer);
  scholarTimer = 0;

  var xmlhttp = new XMLHttpRequest();
  route = "service/php/web/applist/get_scholarinfo.php?sid=" + scholarId;
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

          lbl_mdl_regnumber.innerHTML = records[0].scholar_serial;

              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              let dt = new Date(records[0].user_lastupdate);
              let date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
              lbl_mdlinfo_updatedInfo1.innerHTML = "Below Last Updated: " + date_val;

          lbl_mdlinfo_fullname.value = records[0].user_firstname + " " + records[0].user_lastname;
              let bdate = new Date(records[0].user_birthdate);
              let ndate = new Date();
              let age = ndate.getFullYear() - bdate.getFullYear();
          lbl_mdlinfo_age.value = age;
          lbl_mdlinfo_address.value = records[0].contact_address;
              let rawgender = records[0].user_gender;
              let gender = "Male";
              if (rawgender == 0) { gender = "Female"; }
          lbl_mdlinfo_gender.value = gender;
          lbl_mdlinfo_contact.value = records[0].contact_phnum;

              dt = new Date(records[0].scholar_lastupdate);
              date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlinfo_updatedInfo2.innerHTML = "Below Last Updated: " + date_val;
          lbl_mdlinfo_scholartitle.value = records[0].scholar_title;
          lbl_mdlinfo_course.value = records[0].scholar_course;
          lbl_mdlinfo_school.value = records[0].scholar_school;
          lbl_mdlinfo_grdyr.value = records[0].scholar_gradeyr;
            lbl_mdlinfo_brgy.value = records[0].scholar_barangay;

              let rmcache = new Date();

          dt = new Date(records[0].cor_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlregi_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

              let filetype = records[0].cor_filetype;
              let path = records[0].cor_path;
          if (filetype == "pdf" && path != "no_path") {
            pdf_mdlregi_pdfcor.style.display = "block";
            img_mdlregi_imgcor.style.display = "none";
            PDFObject.embed(path, "#pdfviewer_areaCOR");

          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlregi_pdfcor.style.display = "none";
            img_mdlregi_imgcor.style.display = "block";
            img_mdlregi_imgcor.src = path + "?nc=" + rmcache.getMilliseconds();
          
          }
          else {
            pdf_mdlregi_pdfcor.style.display = "none";
            img_mdlregi_imgcor.style.display = "block";
            img_mdlregi_imgcor.src = "images/noimg.png";

          }
              let state = records[0].cor_verified;
          lbl_mdlregi_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlregi_status.innerHTML = "Verified";
          } else if (state == "0" && path == "no_path") {
            lbl_mdlregi_status.innerHTML = "No File Uploaded Yet";
          } else if (state == "0") {
            lbl_mdlregi_status.innerHTML = "Not Verified";
          } else if (state == "2") {
            lbl_mdlregi_status.innerHTML = "DECLINED";
          }


          dt = new Date(records[0].cog_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlgrd_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].cog_filetype;
          path = records[0].cog_path;
          if (filetype == "pdf" && path != "no_path") {
            pdf_mdlgrd_pdfcog.style.display = "block";
            img_mdlgrd_imgcog.style.display = "none";
            PDFObject.embed(path, "#pdfviewer_areaCOG");


          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlgrd_pdfcog.style.display = "none";
            img_mdlgrd_imgcog.style.display = "block";
            img_mdlgrd_imgcog.src = path + "?nc=" + rmcache.getMilliseconds();

          } 
          else {
            pdf_mdlgrd_pdfcog.style.display = "none";
            img_mdlgrd_imgcog.style.display = "block";
            img_mdlgrd_imgcog.src = "images/noimg.png";

          }
          state = records[0].cog_verified;
          lbl_mdlgrd_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlgrd_status.innerHTML = "Verified";
          } else if (state == "0" && path == "no_path") {
            lbl_mdlgrd_status.innerHTML = "No File Uploaded Yet";
          } else if (state == "0") {
            lbl_mdlgrd_status.innerHTML = "Not Verified";
          } else if (state == "2") {
            lbl_mdlgrd_status.innerHTML = "DECLINED";
          }


          dt = new Date(records[0].idg_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlidg_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].idg_filetype;
          path = records[0].idg_path;
          if (filetype != "none" && path != "no_path") {
            img_mdlidg_img.src = path + "?nc=" + rmcache.getMilliseconds();

          } 
          else {
            img_mdlidg_img.src = "images/noimg.png";

          }
          state = records[0].idg_verified;
          lbl_mdlidg_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlidg_status.innerHTML = "Verified"; 
          } else if (state == "0" && path == "no_path") {
            lbl_mdlidg_status.innerHTML = "No File Uploaded Yet";
          } else if (state == "0") {
            lbl_mdlidg_status.innerHTML = "Not Verified";
          } else if (state == "2") {
            lbl_mdlidg_status.innerHTML = "DECLINED";
          }


          dt = new Date(records[0].idc_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlidc_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].idc_filetype;
          path = records[0].idc_path;
          if (filetype != "none" && path != "no_path") {
            img_mdlidc_img.src = path + "?nc=" + rmcache.getMilliseconds();

          } 
          else {
            img_mdlidc_img.src = "images/noimg.png";

          }
          state = records[0].idc_verified;
          lbl_mdlidc_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlidc_status.innerHTML = "Verified";
          } else if (state == "0" && path == "no_path") {
            lbl_mdlidc_status.innerHTML = "No File Uploaded Yet";
          } else if (state == "0") {
            lbl_mdlidc_status.innerHTML = "Not Verified";
          } else if (state == "2") {
            lbl_mdlidc_status.innerHTML = "DECLINED";
          }


          dt = new Date(records[0].bio_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlbio_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].bio_filetype;
          path = records[0].bio_path;
          if (filetype == "pdf" && path != "no_path") {
            pdf_mdlbio_pdfbio.style.display = "block";
            img_mdlbio_imgbio.style.display = "none";
            PDFObject.embed(path, "#pdfviewer_areaBIO");


          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlbio_pdfbio.style.display = "none";
            img_mdlbio_imgbio.style.display = "block";
            img_mdlbio_imgbiosrc = path + "?nc=" + rmcache.getMilliseconds();

          } 
          else {
            pdf_mdlbio_pdfbio.style.display = "none";
            img_mdlbio_imgbio.style.display = "block";
            img_mdlbio_imgbio.src = "images/noimg.png";

          }
          state = records[0].bio_verified;
          lbl_mdlbio_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlbio_status.innerHTML = "Verified";
          } else if (state == "0" && path == "no_path") {
            lbl_mdlbio_status.innerHTML = "No File Uploaded Yet";
          } else if (state == "0") {
            lbl_mdlbio_status.innerHTML = "Not Verified";
          } else if (state == "2") {
            lbl_mdlbio_status.innerHTML = "DECLINED";
          }






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