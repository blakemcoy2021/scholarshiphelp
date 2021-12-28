<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $query = "update tbl_scholar ";
    $query .= "set scholar_status='done'";
    $query .= "where scholar_id='$sid' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbdone";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "success";
    $data['message'] = "Successfully claimed scholarship!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>