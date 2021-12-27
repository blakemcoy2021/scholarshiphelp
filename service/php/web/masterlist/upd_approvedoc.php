<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    $vfy = "none";
    $doc = "none";
    
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    if (isset($_GET["vfy"])) { $vfy = $_GET["vfy"]; }
    if (isset($_GET["doc"])) { $doc = $_GET["doc"]; }

    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($vfy == "none") { $failfieldctr += 1; }
    if ($doc == "none") { $failfieldctr += 1; }
    
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qval = "1";
    if ($vfy == "0") {
        $qval = "0";
    }

    $qtbl = "tbl_cor";
    $stbl = "cor_verified";
    $ftbl = "cor_scholarid";
    if ($doc == "cog") {
        $qtbl = "tbl_cog";
        $stbl = "cog_verified";
        $ftbl = "cog_scholarid";
    } else if ($doc == "idg") {
        $qtbl = "tbl_idg";
        $stbl = "idg_verified";
        $ftbl = "idg_scholarid";
    } else if ($doc == "idc") {
        $qtbl = "tbl_idc";
        $stbl = "idc_verified";
        $ftbl = "idc_scholarid";
    }
    
    $query = "update $qtbl ";
    $query .= "set $stbl='$qval' ";
    $query .= "where $ftbl='$sid' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbstrvwl";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "success";
    $data['message'] = "Successfully updated status of $doc from scholar application #$sid!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>