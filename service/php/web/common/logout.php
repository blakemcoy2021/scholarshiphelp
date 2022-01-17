<?php

    include "../common/dbconfig.php";

    $uid = "none";

    $errors = [];
    $data = [];

    if (isset($_GET["uid"]))       {   $uid = $_GET["uid"];        }

    $failfieldctr = 0;
    if ($uid == "none") { $failfieldctr += 1; }
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $dateupd = date("Y-m-d G:i:s");
    $qval = "login_isonline='0', login_lastupdate='$dateupd'";
    $query = "update tbl_login ";
    $query .= "set $qval ";
    $query .= "where login_id='$uid';";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

        session_start();
        session_unset();
        session_destroy();
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p1";
        $data['logs'] = "Database Exception - part1 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }

    $data['success'] = "success";
    $data['message'] = "Successfully logout!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>