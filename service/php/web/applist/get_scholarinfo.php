<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    if (isset($_GET["sid"]))   {   $sid = $_GET["sid"];      }

    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qfields = "tbl_user.user_firstname, tbl_user.user_middlename, tbl_user.user_lastname, tbl_user.user_photo, tbl_user.user_gender, tbl_user.user_birthdate, tbl_user.user_lastupdate, tbl_scholar.scholar_barangay, ";
    $qfields .= "tbl_contact.contact_phnum, tbl_contact.contact_address, tbl_scholar.scholar_title, tbl_scholar.scholar_course, tbl_scholar.scholar_school, tbl_scholar.scholar_status, ";
    $qfields .= "tbl_scholar.scholar_gradeyr, tbl_scholar.scholar_lastupdate, tbl_cor.cor_path, tbl_cor.cor_verified, tbl_cor.cor_filetype, tbl_scholar.scholar_serial, ";
    $qfields .= "tbl_cor.cor_lastupdate, tbl_cog.cog_path, tbl_cog.cog_verified, tbl_cog.cog_filetype, tbl_cog.cog_lastupdate, tbl_idg.idg_path, ";
    $qfields .= "tbl_idg.idg_verified, tbl_idg.idg_filetype, tbl_idg.idg_lastupdate, tbl_idc.idc_path, tbl_idc.idc_verified, tbl_idc.idc_filetype, tbl_idc.idc_lastupdate, ";
    
    $qfields .= "tbl_bio.bio_path, tbl_bio.bio_verified, tbl_bio.bio_filetype, ";
    $qfields .= "tbl_bio.bio_lastupdate, tbl_bio.bio_path ";

    $query = "select $qfields from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "inner join tbl_idc on tbl_scholar.scholar_id=tbl_idc.idc_scholarid ";
    $query .= "inner join tbl_bio on tbl_scholar.scholar_id=tbl_bio.bio_scholarid ";
    $query .= "where tbl_scholar.scholar_id='$sid' ";
    $query .= "order by tbl_scholar.scholar_id desc";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            $data['success'] = "zero";
            $data['message'] = "User identification gone. Try re-logging in.!";
            $data['logs'] = "User Not Found.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        $data['success'] = json_encode($results);
        $data['message'] = "Successfully acquired Scholar Application Information!";
        $data['logs'] = "Scholar Applicantion Information Found.";
        echo json_encode($data);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbsch";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>