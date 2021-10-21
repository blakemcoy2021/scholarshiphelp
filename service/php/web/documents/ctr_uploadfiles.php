<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $suid = "none";
    if (isset($_POST["suid"]))   {   $suid = $_POST["suid"];      }

    $failfieldctr = 0;
    if ($suid == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }

    $ctr = 0;

    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_cor.cor_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
    
        $stmt->execute();
        $results = $stmt->fetch();
        $ctr += intval($results["ctr"]);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbfilectr1";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }
    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_cog.cog_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $results = $stmt->fetch();
        $ctr += intval($results["ctr"]);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbfilectr2";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }
    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_idg.idg_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $results = $stmt->fetch();
        $ctr += intval($results["ctr"]);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbfilectr3";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

    $data['success'] = $ctr;
    $data['message'] = "Acquired sum value of Scholarship Application!";
    $data['logs'] = "Scholarship Applications total is $ctr.";
    echo json_encode($data);
    $conn = null;

?>