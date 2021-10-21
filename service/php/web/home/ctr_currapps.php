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
    $query .= "where scholar_userid='$suid' and scholar_approved='0' and scholar_status <> 'done' ";
    $query .= "order by scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
    
        $stmt->execute();
        $results = $stmt->fetch();
        $ctr += intval($results["ctr"]);

        $data['success'] = $ctr;
        $data['message'] = "Number of Current Applications!";
        $data['logs'] = "Current Scholarship Applications total is $ctr.";
        echo json_encode($data);
        $conn = null;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbcurappctr1";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

?>