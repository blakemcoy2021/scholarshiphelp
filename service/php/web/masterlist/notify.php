<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    // $sid = "none";
    // if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    // $failfieldctr = 0;
    // if ($sid == "none") { $failfieldctr += 1; }
    // if ($failfieldctr > 0) {
    //     $data['success'] = false;
    //     $data['message'] = "Invalid access!";
    //     $data['logs'] = "Invalid GET Attempt.";
    //     echo json_encode($data);
    //     die();
    // }


    $tbl_arr = ["contact", "user", "scholar", "cor", "cog", "idg", "idc", "bio"];

    $tbl = "tbl_" . $tbl_arr[0];
    $seen = $tbl_arr[0] . "_seen";      

    $query = "update $tbl ";
    $query .= "set $seen='1' ";
    $query .= "where $seen='0' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

        for ($i = 1; $i < sizeof($tbl_arr); $i++) {
            $tbl = "tbl_" . $tbl_arr[$i];
            $seen = $tbl_arr[$i] . "_seen";      
        
            $query = "update $tbl ";
            $query .= "set $seen='1' ";
            $query .= "where $seen='0' ";
            $stmt = $conn->prepare($query);
            $stmt->execute();
        }

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbstr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "success";
    $data['message'] = "Successfully seen everything! $query";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;



?>