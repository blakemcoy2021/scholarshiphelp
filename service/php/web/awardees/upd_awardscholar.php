<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    $ops = "none";
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    if (isset($_GET["ops"])) { $ops = $_GET["ops"]; }
    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($ops == "none") { $failfieldctr += 1; }
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qval = "Awarded";
    $qval2 = "1";
    if ($ops == "0") {
        $qval = "Reviewing";
        $qval2 = "0";
    }
    $query = "update tbl_scholar ";
    $query .= "set scholar_status='$qval', scholar_approved='$qval2' ";
    $query .= "where scholar_id='$sid' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

        if ($ops == 0) {
            $query = "update tbl_cor ";
            $query .= "set cor_verified='0' ";
            $query .= "where cor_scholarid='$sid' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();

            $query = "update tbl_cog ";
            $query .= "set cog_verified='0' ";
            $query .= "where cog_scholarid='$sid' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();

            $query = "update tbl_idg ";
            $query .= "set idg_verified='0' ";
            $query .= "where idg_scholarid='$sid' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();

            $query = "update tbl_idc ";
            $query .= "set idc_verified='0' ";
            $query .= "where idc_scholarid='$sid' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
        }

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbstrvwl";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "success";
    $data['message'] = "Set of scholar application #$sid as/for $qval!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>