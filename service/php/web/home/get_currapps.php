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

    $qfield = "scholar_id, scholar_title, scholar_status";
    $query = "select $qfield from tbl_scholar ";
    $query .= "where scholar_userid='$suid' and scholar_approved='0' and scholar_status <> 'done' ";
    $query .= "order by scholar_id desc";
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