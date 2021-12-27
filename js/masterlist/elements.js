/** scholar id upon selecting scholarship application */
var hid_scholarId = document.getElementById("hidfld_sid");

/** view edit scholarship application modal */
var mdl_viewUpdate = document.getElementById('htmMdlViewUpdate');
    // registration number
    var lbl_mdl_regnumber = document.getElementById("htmMdlLblRegNum");
    // information
    var lbl_mdlinfo_updatedInfo1 = document.getElementById("htmLblInfoLastUpdate1");
    var lbl_mdlinfo_fullname = document.getElementById("fullname");
    var lbl_mdlinfo_age = document.getElementById("age");
    var lbl_mdlinfo_address = document.getElementById("address");
    var lbl_mdlinfo_gender = document.getElementById("gender");
    var lbl_mdlinfo_contact = document.getElementById("contact");
    var lbl_mdlinfo_updatedInfo2 = document.getElementById("htmLblInfoLastUpdate2");
    var lbl_mdlinfo_scholartitle = document.getElementById("scholartitle");
    var lbl_mdlinfo_course = document.getElementById("course");
    var lbl_mdlinfo_school = document.getElementById("school");
    var lbl_mdlinfo_grdyr = document.getElementById("gradeyear");
        var lbl_mdlinfo_brgy = document.getElementById("standard-select");

    //registration
    var lbl_mdlregi_updatedInfo = document.getElementById("htmLblInfoLastUpdate3");
    var pdf_mdlregi_pdfcor = document.getElementById("pdfviewer_areaCOR");
    var img_mdlregi_imgcor = document.getElementById("imgviewer_areaCOR");
    var lbl_mdlregi_status = document.getElementById("htmMdlTabCorStatus");

    //grades
    var lbl_mdlgrd_updatedInfo = document.getElementById("htmLblInfoLastUpdate4");
    var pdf_mdlgrd_pdfcog = document.getElementById("pdfviewer_areaCOG");
    var img_mdlgrd_imgcog = document.getElementById("imgviewer_areaCOG");
    var lbl_mdlgrd_status = document.getElementById("htmMdlTabCogStatus");

    //indigency
    var lbl_mdlidg_updatedInfo = document.getElementById("htmLblInfoLastUpdate5");
    var img_mdlidg_img = document.getElementById("imgviewer_areaIDG");
    var lbl_mdlidg_status = document.getElementById("htmMdlTabIDGStatus");

    //valid id
    var lbl_mdlidc_updatedInfo = document.getElementById("htmLblInfoLastUpdate6");
    var img_mdlidc_img = document.getElementById("imgviewer_areaIDC");
    var lbl_mdlidc_status = document.getElementById("htmMdlTabIDCStatus");

    //updating controls
    var btn_mdl_updateInfo = document.getElementById("htmMdlBtnUpdateApp");
    var btn_mdl_updateCOR = document.getElementById("htmMdlUpdateInpCOR");
    var inp_mdl_updateCOR = document.getElementById("inpCOR");
    var btn_mdl_updateCOG = document.getElementById("htmMdlUpdateInpCOG");
    var inp_mdl_updateCOG = document.getElementById("inpCOG");
    var btn_mdl_updateIDG = document.getElementById("htmMdlUpdateInpIDG");
    var inp_mdl_updateIDG = document.getElementById("inpIDG");
    var btn_mdl_updateIDC = document.getElementById("htmMdlUpdateInpIDC");
    var inp_mdl_updateIDC = document.getElementById("inpIDC");

    var btn_mdl_download = document.getElementById("imgviewer_download");
    var btn_mdl_print = document.getElementById("imgviewer_print");

    var btn_sort = document.getElementById("htmMdlBtnSort");