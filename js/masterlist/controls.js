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

            window.sessionStorage.setItem("CORisPhoto", 0);
            window.sessionStorage.setItem("CORpathPhoto", "no_path");

          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlregi_pdfcor.style.display = "none";
            img_mdlregi_imgcor.style.display = "block";
            img_mdlregi_imgcor.src = path + "?nc=" + rmcache.getMilliseconds();
          
            window.sessionStorage.setItem("CORisPhoto", 1);
            window.sessionStorage.setItem("CORpathPhoto", path);
          }
          else {
            pdf_mdlregi_pdfcor.style.display = "none";
            img_mdlregi_imgcor.style.display = "block";
            img_mdlregi_imgcor.src = "images/noimg.png";

            window.sessionStorage.setItem("CORisPhoto", 0);
            window.sessionStorage.setItem("CORpathPhoto", "no_path");
          }
              let state = records[0].cor_verified; window.sessionStorage.setItem("ApproveCOR", 0);
          lbl_mdlregi_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlregi_status.innerHTML = "Verified";
            window.sessionStorage.setItem("ApproveCOR", 1);

          } else if (state == "0" && path == "no_path") {
            lbl_mdlregi_status.innerHTML = "No File Uploaded Yet";
            window.sessionStorage.setItem("ApproveCOR", 2);
          } else if (state == "0") {
            lbl_mdlregi_status.innerHTML = "Not Verified";
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

            window.sessionStorage.setItem("COGisPhoto", 0);
            window.sessionStorage.setItem("COGpathPhoto", "no_path");

          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlgrd_pdfcog.style.display = "none";
            img_mdlgrd_imgcog.style.display = "block";
            img_mdlgrd_imgcog.src = path + "?nc=" + rmcache.getMilliseconds();

            window.sessionStorage.setItem("COGisPhoto", 1);
            window.sessionStorage.setItem("COGpathPhoto", path);
          } 
          else {
            pdf_mdlgrd_pdfcog.style.display = "none";
            img_mdlgrd_imgcog.style.display = "block";
            img_mdlgrd_imgcog.src = "images/noimg.png";

            window.sessionStorage.setItem("COGisPhoto", 0);
            window.sessionStorage.setItem("COGpathPhoto", "no_path");
          }
          state = records[0].cog_verified; window.sessionStorage.setItem("ApproveCOG", 0);
          lbl_mdlgrd_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlgrd_status.innerHTML = "Verified";
            window.sessionStorage.setItem("ApproveCOG", 1);

          } else if (state == "0" && path == "no_path") {
            lbl_mdlgrd_status.innerHTML = "No File Uploaded Yet";
            window.sessionStorage.setItem("ApproveCOG", 2);
          } else if (state == "0") {
            lbl_mdlgrd_status.innerHTML = "Not Verified";
          }


          dt = new Date(records[0].idg_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlidg_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].idg_filetype;
          path = records[0].idg_path;
          if (filetype != "none" && path != "no_path") {
            img_mdlidg_img.src = path + "?nc=" + rmcache.getMilliseconds();

            window.sessionStorage.setItem("IDGisPhoto", 1);
            window.sessionStorage.setItem("IDGpathPhoto", path);
          } 
          else {
            img_mdlidg_img.src = "images/noimg.png";

            window.sessionStorage.setItem("IDGisPhoto", 0);
            window.sessionStorage.setItem("IDGpathPhoto", "no_path");
          }
          state = records[0].idg_verified; window.sessionStorage.setItem("ApproveIDG", 0);
          lbl_mdlidg_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlidg_status.innerHTML = "Verified"; 
            window.sessionStorage.setItem("ApproveIDG", 1);
            
          } else if (state == "0" && path == "no_path") {
            lbl_mdlidg_status.innerHTML = "No File Uploaded Yet";
            window.sessionStorage.setItem("ApproveIDG", 2);
          } else if (state == "0") {
            lbl_mdlidg_status.innerHTML = "Not Verified";
          }


          dt = new Date(records[0].idc_lastupdate);
          date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
          lbl_mdlidc_updatedInfo.innerHTML = "Below Last Updated: " + date_val;

          filetype = records[0].idc_filetype;
          path = records[0].idc_path;
          if (filetype != "none" && path != "no_path") {
            img_mdlidc_img.src = path + "?nc=" + rmcache.getMilliseconds();

            window.sessionStorage.setItem("IDCisPhoto", 1);
            window.sessionStorage.setItem("IDCpathPhoto", path);
          } 
          else {
            img_mdlidc_img.src = "images/noimg.png";

            window.sessionStorage.setItem("IDCisPhoto", 0);
            window.sessionStorage.setItem("IDCpathPhoto", "no_path");
          }
          state = records[0].idc_verified; window.sessionStorage.setItem("ApproveIDC", 0);
          lbl_mdlidc_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlidc_status.innerHTML = "Verified";
            window.sessionStorage.setItem("ApproveIDC", 1);

          } else if (state == "0" && path == "no_path") {
            lbl_mdlidc_status.innerHTML = "No File Uploaded Yet";
            window.sessionStorage.setItem("ApproveIDC", 2);
          } else if (state == "0") {
            lbl_mdlidc_status.innerHTML = "Not Verified";
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

            window.sessionStorage.setItem("BIOisPhoto", 0);
            window.sessionStorage.setItem("BIOpathPhoto", "no_path");

          } else if (filetype != "none" && path != "no_path" && filetype != "pdf") {
            pdf_mdlbio_pdfbio.style.display = "none";
            img_mdlbio_imgbio.style.display = "block";
            img_mdlbio_imgbio.src = path + "?nc=" + rmcache.getMilliseconds();

            window.sessionStorage.setItem("BIOisPhoto", 1);
            window.sessionStorage.setItem("BIOpathPhoto", path);
          } 
          else {
            pdf_mdlbio_pdfbio.style.display = "none";
            img_mdlbio_imgbio.style.display = "block";
            img_mdlbio_imgbio.src = "images/noimg.png";

            window.sessionStorage.setItem("BIOisPhoto", 0);
            window.sessionStorage.setItem("BIOpathPhoto", "no_path");
          }
          state = records[0].bio_verified; window.sessionStorage.setItem("ApproveBIO", 0);
          lbl_mdlbio_status.innerHTML = "N/A";
          if (state == "1") {
            lbl_mdlbio_status.innerHTML = "Verified";
            window.sessionStorage.setItem("ApproveBIO", 1);

          } else if (state == "0" && path == "no_path") {
            lbl_mdlbio_status.innerHTML = "No File Uploaded Yet";
            window.sessionStorage.setItem("ApproveBIO", 2);
          } else if (state == "0") {
            lbl_mdlbio_status.innerHTML = "Not Verified";
          }





          let scholarstate = records[0].scholar_status;
          if (scholarstate != "New" && scholarstate != "For Review" && scholarstate != "Reviewing") {
            window.sessionStorage.setItem("ApproveInfo", 1);
          } else {
            window.sessionStorage.setItem("ApproveInfo", 0);
          }

              let tabnum = window.sessionStorage.getItem("TabNumber");
              let cortabp1 = window.sessionStorage.getItem("CORisPhoto"); let cortabp2 = window.sessionStorage.getItem("CORpathPhoto");
              let cogtabp1 = window.sessionStorage.getItem("COGisPhoto"); let cogtabp2 = window.sessionStorage.getItem("COGpathPhoto");
              let idgtabp1 = window.sessionStorage.getItem("IDGisPhoto"); let idgtabp2 = window.sessionStorage.getItem("IDGpathPhoto");
              let idctabp1 = window.sessionStorage.getItem("IDCisPhoto"); let idctabp2 = window.sessionStorage.getItem("IDCpathPhoto");
              let biotabp1 = window.sessionStorage.getItem("BIOisPhoto"); let biotabp2 = window.sessionStorage.getItem("BIOpathPhoto")

              console.log(tabnum + " - " + cortabp1 + " " + cogtabp1 + " " + idgtabp1 + " " + idctabp1 + " " + biotabp1);

              if (cortabp1 == 1 && tabnum == 1) {
                btn_mdl_download.style.display = "inline-block";
                btn_mdl_print.style.display = "inline-block";
                
                btn_mdl_download.href = cortabp2;
                window.sessionStorage.setItem("SelectedPhoto", cortabp2);
                approveBtnState("ApproveCOR");
              }
              else if (cogtabp1 == 1 && tabnum == 2) {
                btn_mdl_download.style.display = "inline-block";
                btn_mdl_print.style.display = "inline-block";

                btn_mdl_download.href = cogtabp2;
                window.sessionStorage.setItem("SelectedPhoto", cogtabp2);
                approveBtnState("ApproveCOG");
              }
              else if (idgtabp1 == 1 && tabnum == 3) {
                btn_mdl_download.style.display = "inline-block";
                btn_mdl_print.style.display = "inline-block";

                btn_mdl_download.href = idgtabp2;
                window.sessionStorage.setItem("SelectedPhoto", idgtabp2);
                approveBtnState("ApproveIDG");
              }
              else if (idctabp1 == 1 && tabnum == 4) {
                btn_mdl_download.style.display = "inline-block";
                btn_mdl_print.style.display = "inline-block";

                btn_mdl_download.href = idctabp2;
                window.sessionStorage.setItem("SelectedPhoto", idctabp2);
                approveBtnState("ApproveIDC");
              }
              else if (biotabp1 == 1 && tabnum == 5) {
                btn_mdl_download.style.display = "inline-block";
                btn_mdl_print.style.display = "inline-block";

                btn_mdl_download.href = biotabp2;
                window.sessionStorage.setItem("SelectedPhoto", biotabp2);
                approveBtnState("ApproveBIO");
              }
              else {
                btn_mdl_updateInfo.innerHTML = "Approve";
                btn_mdl_updateInfo.removeAttribute('disabled');

                if (tabnum != 0) {
                  tabEventAfterInfoApprove();
                  if (tabnum == 1) {
                    if (window.sessionStorage.getItem("ApproveCOR") == 1) {
                      btn_mdl_updateInfo.innerHTML = "Verified";
                    }
                  } else if (tabnum == 2) {
                    if (window.sessionStorage.getItem("ApproveCOG") == 1) {
                      btn_mdl_updateInfo.innerHTML = "Verified";
                    }
                  } else if (tabnum == 3) {
                    if (window.sessionStorage.getItem("ApproveIDG") == 1) {
                      btn_mdl_updateInfo.innerHTML = "Verified";
                    }
                  } else if (tabnum == 4) {
                    if (window.sessionStorage.getItem("ApproveIDC") == 1) {
                      btn_mdl_updateInfo.innerHTML = "Verified";
                    }
                  } else if (tabnum == 5) {
                    if (window.sessionStorage.getItem("ApproveBIO") == 1) {
                      btn_mdl_updateInfo.innerHTML = "Verified";
                    }
                  }
                } else {
                  if (window.sessionStorage.getItem("ApproveInfo") == 1) {
                    btn_mdl_updateInfo.innerHTML = "Verified";
                  }                
                }

                btn_mdl_download.style.display = "none";
                btn_mdl_print.style.display = "none";
                btn_mdl_download.href = "#";
              }

              scholarAppReviewedState(scholarId);
      }
      else if (this.readyState == 4) {
          alert("Server Unreachable. Possible Slow Internet Connection..!");
      }
  };

}

function scholarAppReviewedState(scholarId) {
  var xmlhttp = new XMLHttpRequest();
  route = "service/php/web/masterlist/upd_scholarappstate.php?sid=" + scholarId;
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

function approveBtnState(itm) {
  btn_mdl_updateInfo.innerHTML = "Approve";
  btn_mdl_updateInfo.removeAttribute('disabled');
  if (window.sessionStorage.getItem(itm) == 1) { 
    btn_mdl_updateInfo.innerHTML = "Verified"; 
  } else if (window.sessionStorage.getItem(itm) == 2) {
    btn_mdl_updateInfo.setAttribute('disabled', 'disabled');
  }

}

btn_mdl_updateInfo.onclick = function() {
  let isInfoVerified = window.sessionStorage.getItem("ApproveInfo");
  let tabNum = window.sessionStorage.getItem("TabNumber");

  if (isInfoVerified == 0 && tabNum != 0) {
    alert("Verify first Scholar's User Information.");
    return;
  }
  
  if (isInfoVerified == 0 && tabNum == 0) {
    let route = "service/php/web/masterlist/upd_approveinfo.php?sid=" + hid_scholarId.value + "&vfy=1";
    requestApprovalProcess(route);
  }
  else if (isInfoVerified == 1 && tabNum == 0) {
    let route = "service/php/web/masterlist/upd_approveinfo.php?sid=" + hid_scholarId.value + "&vfy=0";
    requestApprovalProcess(route);
  } 
  else if (tabNum != 0) {  
    let route = "service/php/web/masterlist/upd_approvedoc.php?sid=" + hid_scholarId.value;
    if (tabNum == 1) {
      route += "&doc=cor";
      if (window.sessionStorage.getItem("ApproveCOR") == 0) {
        route += "&vfy=1";
      } else {
        route += "&vfy=0";
      }
    } else if (tabNum == 2) {
      route += "&doc=cog";
      if (window.sessionStorage.getItem("ApproveCOG") == 0) {
        route += "&vfy=1";
      } else {
        route += "&vfy=0";
      }
    } else if (tabNum == 3) {
      route += "&doc=idg";
      if (window.sessionStorage.getItem("ApproveIDG") == 0) {
        route += "&vfy=1";
      } else {
        route += "&vfy=0";
      }
    } else if (tabNum == 4) {
      route += "&doc=idc";
      if (window.sessionStorage.getItem("ApproveIDC") == 0) {
        route += "&vfy=1";
      } else {
        route += "&vfy=0";
      }
    } else if (tabNum == 5) {
      route += "&doc=bio";
      if (window.sessionStorage.getItem("ApproveBIO") == 0) {
        route += "&vfy=1";
      } else {
        route += "&vfy=0";
      }
    }
    requestApprovalProcess(route);
  }

  mdl_viewUpdate.style.display = "none"; 
  start_scholarAppTime(); 
}

function ImagetoPrint(source) {
    return "<html><head><scri"+"pt>function step1(){\n" +
            "setTimeout('step2()', 10);}\n" +
            "function step2(){window.print();window.close()}\n" +
            "</scri" + "pt></head><body onload='step1()'>\n" +
            "<img src='" + source + "' /></body></html>";
}

function requestApprovalProcess(route) {
  var xmlhttp = new XMLHttpRequest();
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

function tabEventAfterInfoApprove() {
  if (window.sessionStorage.getItem("ApproveInfo") == 1) {
    let route = "service/php/web/masterlist/upd_approveinfo.php?sid=" + hid_scholarId.value + "&vfy=3";
    requestApprovalProcess(route);
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

btn_mdl_print.onclick = function() {
  let filepath = window.sessionStorage.getItem("SelectedPhoto");
  var Pagelink = "about:blank";
  var pwa = window.open(Pagelink, "_new");
  pwa.document.open();
  pwa.document.write(ImagetoPrint(filepath));
  pwa.document.close();
}


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

  console.log(tabName);

  if (tabName == "htmMdlTabCOR") {
    window.sessionStorage.setItem("TabNumber", 1);

    if (window.sessionStorage.getItem("CORisPhoto") == 1) {
      btn_mdl_download.style.display = "inline-block";
      btn_mdl_print.style.display = "inline-block";

      let filepath = window.sessionStorage.getItem("CORpathPhoto");
      btn_mdl_download.href = filepath;
      window.sessionStorage.setItem("SelectedPhoto", filepath);
    }
    else {
      btn_mdl_download.style.display = "none";
      btn_mdl_print.style.display = "none";
      btn_mdl_download.href = "#";
    }
    approveBtnState("ApproveCOR");
    tabEventAfterInfoApprove();

  }
  else if (tabName == "htmMdlTabCOG") {
    window.sessionStorage.setItem("TabNumber", 2);

    if (window.sessionStorage.getItem("COGisPhoto") == 1) {
      btn_mdl_download.style.display = "inline-block";
      btn_mdl_print.style.display = "inline-block";

      let filepath = window.sessionStorage.getItem("COGpathPhoto");
      btn_mdl_download.href = filepath;
      window.sessionStorage.setItem("SelectedPhoto", filepath);
    }
    else {
      btn_mdl_download.style.display = "none";
      btn_mdl_print.style.display = "none";
      btn_mdl_download.href = "#";
    }
    approveBtnState("ApproveCOG");
    tabEventAfterInfoApprove();

  }
  else if (tabName == "htmMdlTabIDG") {
    window.sessionStorage.setItem("TabNumber", 3);

    if (window.sessionStorage.getItem("IDGisPhoto") == 1) {
      btn_mdl_download.style.display = "inline-block";
      btn_mdl_print.style.display = "inline-block";

      let filepath = window.sessionStorage.getItem("IDGpathPhoto");
      btn_mdl_download.href = filepath;
      window.sessionStorage.setItem("SelectedPhoto", filepath);
    }
    else {
      btn_mdl_download.style.display = "none";
      btn_mdl_print.style.display = "none";
      btn_mdl_download.href = "#";
    }
    approveBtnState("ApproveIDG");
    tabEventAfterInfoApprove();

  }
  else if (tabName == "htmMdlTabVID") {
    window.sessionStorage.setItem("TabNumber", 4);

    if (window.sessionStorage.getItem("IDCisPhoto") == 1) {
      btn_mdl_download.style.display = "inline-block";
      btn_mdl_print.style.display = "inline-block";

      let filepath = window.sessionStorage.getItem("IDCpathPhoto");
      btn_mdl_download.href = filepath;
      window.sessionStorage.setItem("SelectedPhoto", filepath);
    }
    else {
      btn_mdl_download.style.display = "none";
      btn_mdl_print.style.display = "none";
      btn_mdl_download.href = "#";
    }
    approveBtnState("ApproveIDC");
    tabEventAfterInfoApprove();

  } 
  else if (tabName == "htmMdlTabBIO") {
    window.sessionStorage.setItem("TabNumber", 5);

    if (window.sessionStorage.getItem("BIOisPhoto") == 1) {
      btn_mdl_download.style.display = "inline-block";
      btn_mdl_print.style.display = "inline-block";

      let filepath = window.sessionStorage.getItem("BIOpathPhoto");
      btn_mdl_download.href = filepath;
      window.sessionStorage.setItem("SelectedPhoto", filepath);
    }
    else {
      btn_mdl_download.style.display = "none";
      btn_mdl_print.style.display = "none";
      btn_mdl_download.href = "#";
    }
    approveBtnState("ApproveBIO");
    tabEventAfterInfoApprove();

  }
  else {
    window.sessionStorage.setItem("TabNumber", 0);
    btn_mdl_download.style.display = "none";
    btn_mdl_print.style.display = "none";
    btn_mdl_download.href = "#";

    approveBtnState("ApproveInfo");
  }
}