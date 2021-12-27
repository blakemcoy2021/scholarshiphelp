<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    $vfy = "none";
    
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    if (isset($_GET["vfy"])) { $vfy = $_GET["vfy"]; }

    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($vfy == "none") { $failfieldctr += 1; }
    
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qval = "Approved Info";
    if ($vfy == "0") {
        $qval = "Reviewing";
    } else if ($vfy == "3") {
        $qval = "Review Docs";
    }
    $query = "update tbl_scholar ";
    $query .= "set scholar_status='$qval' ";
    $query .= "where scholar_id='$sid' ";
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
    $data['message'] = "Successfully updated status of scholar application #$sid!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>