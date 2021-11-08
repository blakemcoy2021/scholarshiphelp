<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_school, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_scholar.scholar_approved, tbl_scholar.scholar_dateadded, ";
    $qfield .= "tbl_cor.cor_path, tbl_cog.cog_path, tbl_idg.idg_path, tbl_idc.idc_path ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "inner join tbl_idc on tbl_scholar.scholar_id=tbl_idc.idc_scholarid ";
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
        echo json_encode($data);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbappl";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>