<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $suid = "none";
    if (isset($_GET["suid"]))   {   $suid = $_GET["suid"];      }

    $failfieldctr = 0;
    if ($suid == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $set = [];

    $qfield = "tbl_scholar.scholar_id, tbl_scholar.scholar_title, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_cor.cor_verified, tbl_cog.cog_verified, tbl_idg.idg_verified, tbl_idc.idc_verified";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "inner join tbl_idc on tbl_scholar.scholar_id=tbl_idc.idc_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_scholar.scholar_status <> 'done' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();   

        if (sizeof($results) < 1) {
            $data['success'] = "zero";
            $data['message'] = "No current applications recorded!";
            $data['logs'] = "Current Applications Not Found.";
    
        } else {
            $data['success'] = json_encode($results);
            $data['message'] = "Successfully acquired Current Applications!";
            $data['logs'] = "List of Current Applications Found.";
    
        }
        echo json_encode($data);

    } catch(PDOException $e) {  echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbcurapp1";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

    $conn = null;

?>