<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_school, tbl_scholar.scholar_status, tbl_scholar.scholar_barangay, ";
    $qfield .= "tbl_scholar.scholar_approved, tbl_scholar.scholar_dateadded, tbl_user.user_firstname, tbl_user.user_middlename, tbl_user.user_lastname, tbl_scholar.scholar_serial, ";
    $qfield .= "tbl_cor.cor_path, tbl_cog.cog_path, tbl_idg.idg_path, tbl_idc.idc_path, tbl_scholar.scholar_id, ";
    $qfield .= "tbl_cor.cor_verified, tbl_cog.cog_verified, tbl_idg.idg_verified, tbl_idc.idc_verified";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "inner join tbl_idc on tbl_scholar.scholar_id=tbl_idc.idc_scholarid ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
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
            $data['message'] = "No scholarship applications recorded!";
            $data['logs'] = "Scholarship Applications Not Found.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        $data['success'] = json_encode($results);
        $data['message'] = "Successfully acquired Scholarship Applications!";
        $data['logs'] = "List of Scholarship Applications Found.";

        $query = "update tbl_scholar ";
        $query .= "set scholar_status='For Review' ";
        $query .= "where scholar_status='New' ";
        $stmt = $conn->prepare($query);
        $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbappl";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }
    $conn = null;
    echo json_encode($data);
?>