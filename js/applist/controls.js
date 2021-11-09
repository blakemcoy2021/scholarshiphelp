document.getElementById("imgPhoto").onerror = function() {
  document.getElementById("imgPhoto").src = "images/register/photoplaceholder.jpg";
}

function tblSearch(elm, tbl) {
    var input, filter, table, tr, td, i, txtValue;
    input = elm;
    filter = input.value.toUpperCase();

    if (filter !== "") {

        clearInterval(scholarTimer);
        scholarTimer = 0;

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
        start_scholarAppTime();
    }
};

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

              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              let dt = new Date(records[0].user_lastupdate);
              let date_val = months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + dt.getHours() + ":" + dt.getMinutes();
              lbl_mdlinfo_updatedInfo1.innerHTML = "Below Last Updated: " + date_val;

          lbl_mdlinfo_fullname.value = records[0].user_fullname;
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

          } else if (filetype != "none" && path != "no_path") {
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

          } else if (filetype != "none" && path != "no_path") {
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
          }

      }
      else if (this.readyState == 4) {
          alert("Server Unreachable. Possible Slow Internet Connection..!");
      }
  };

}

btn_mdl_updateInfo.addEventListener("click", (evt) => {
  evt.preventDefault();

  let failfieldctr = 0;
    if (lbl_mdlinfo_scholartitle.value == "") { failfieldctr++; }
  if (lbl_mdlinfo_course.value == "") { failfieldctr++; }
  if (lbl_mdlinfo_school.value == "") { failfieldctr++; }
  if (lbl_mdlinfo_grdyr.value == "") { failfieldctr++; }
  if (document.getElementById("hidfld_uid").value == "?") { failfieldctr++; }
  if (hid_scholarId.value == "?") { failfieldctr++; }

  if (failfieldctr > 0) {
    alert('all field(s) required');
    return;
  }

  var frmdata = new FormData();
    frmdata.append("lbl", lbl_mdlinfo_scholartitle.value);
  frmdata.append("crs", lbl_mdlinfo_course.value);
  frmdata.append("sch", lbl_mdlinfo_school.value);
  frmdata.append("grd", lbl_mdlinfo_grdyr.value);
  frmdata.append("uid", document.getElementById("hidfld_uid").value);
  frmdata.append("sid", hid_scholarId.value);

  var xmlhttp = new XMLHttpRequest();
  route = "service/php/web/applist/upd_schappinfo.php";
  xmlhttp.open("POST", route, true);
  xmlhttp.send(frmdata); //data
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);

        let d;
        try { d = JSON.parse(this.responseText); } catch (e) { alert('Response Format error! ' + this.responseText); return; }
        alert(d.message);
        if (d.success == false) { return; } //console.log(d.success);

        if (d.success == "fail") {
            console.log("failed... " + d.logs);
        } else {
          mdl_viewUpdate.style.display='none';
        }
    }
  };

  start_scholarAppTime();

});


function uploadFile(fileclass, inpfile, evt) {

  var frmdata = new FormData();
  frmdata.append("sid", hid_scholarId.value);
  frmdata.append("clas", fileclass);
  frmdata.append("fil", inpfile.files[0]);

  var xmlhttp = new XMLHttpRequest();
  route = "service/php/web/applist/post_appfile.php";
  xmlhttp.open("POST", route, true);
  xmlhttp.send(frmdata);
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);

          let d;
          try { 
              d = JSON.parse(this.responseText); 
          } catch (e) { 
              alert('Response Format error! ' + this.responseText);
              inpfile.value = "";
              inpfile.files[0] = null;    
              return; 
          }   console.log(d.success);

          alert(d.message);
          if (d.success == false) {
              return;
          }

          let filenme = inpfile.value;
          let filearr = filenme.split(".");
          if (filearr[filearr.length - 1] != "pdf") {
            var tar = evt.target || window.event.srcElement;
            var photofile = tar.files;
            if (FileReader && photofile && photofile.length) {
                var fr = new FileReader();
                fr.readAsDataURL(photofile[0]);
                fr.onload = function (e) {
                    var img = new Image();
                    img.src = e.target.result;
                    img.name = e.target.name;
                    img.size = e.target.size;
                    img.onload = function (el) {
                        var elem = document.createElement("canvas");
                        var scaleFactor = 100/el.target.width;
                        elem.width = 100;
                        elem.height = el.target.height * scaleFactor;
                        var ctx = elem.getContext("2d");
                        ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
                        var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

                        if (fileclass == "cor") {
                          pdf_mdlregi_pdfcor.style.display = "none";
                          img_mdlregi_imgcor.style.display = "block";
                          img_mdlregi_imgcor.src = srcEncoded;

                        } else if (fileclass == "cog") {
                          pdf_mdlgrd_pdfcog.style.display = "none";
                          img_mdlgrd_imgcog.style.display = "block";
                          img_mdlgrd_imgcog.src = srcEncoded;

                        } else if (fileclass == "idg") {
                          img_mdlidg_img.src = srcEncoded;
                        } else if (fileclass == "idc") {
                          img_mdlidc_img.src = srcEncoded;
                        }

                        mdl_viewUpdate.style.display='none';
                        start_scholarAppTime();
                    }
                }
            }
            else {
                console.log("not supported :: try sending the image uploaded to a server then ajax query download it back");
            }
          }
          else { //pdf
            if (fileclass == "cor") {
              pdf_mdlregi_pdfcor.style.display = "block";
              img_mdlregi_imgcor.style.display = "none";
              PDFObject.embed(d.success, "#pdfviewer_areaCOR");

            } else if (fileclass == "cog") {
              pdf_mdlgrd_pdfcog.style.display = "block";
              img_mdlgrd_imgcog.style.display = "none";
              PDFObject.embed(d.success, "#pdfviewer_areaCOG");

            }
          }
          
          inpfile.value = "";
          inpfile.files[0] = null;    
      }
  };
}

btn_mdl_updateCOR.addEventListener("click", (evt) => {
  inp_mdl_updateCOR.click();
});
inp_mdl_updateCOR.onchange = function (evt) {
  if (inp_mdl_updateCOR.files.length == 0) { 
    return; 
  }
  uploadFile("cor", inp_mdl_updateCOR, evt);
}

btn_mdl_updateCOG.addEventListener("click", (evt) => {
  inp_mdl_updateCOG.click();
});
inp_mdl_updateCOG.onchange = function (evt) {
  if (inp_mdl_updateCOG.files.length == 0) { 
    return; 
  }
  uploadFile("cog", inp_mdl_updateCOG, evt);
}

btn_mdl_updateIDG.addEventListener("click", (evt) => {
  inp_mdl_updateIDG.click();
});
inp_mdl_updateIDG.onchange = function (evt) {
  if (inp_mdl_updateIDG.files.length == 0) { 
    return; 
  }
  uploadFile("idg", inp_mdl_updateIDG, evt);
}

btn_mdl_updateIDC.addEventListener("click", (evt) => {
  inp_mdl_updateIDC.click();
});
inp_mdl_updateIDC.onchange = function (evt) {
  if (inp_mdl_updateIDC.files.length == 0) { 
    return; 
  }
  uploadFile("idc", inp_mdl_updateIDC, evt);
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
}