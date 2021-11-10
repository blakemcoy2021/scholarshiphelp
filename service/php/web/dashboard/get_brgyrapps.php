<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $bgy = "none";
    if (isset($_GET["bgy"]))   {   $bgy = $_GET["bgy"];      }

    $failfieldctr = 0;
    if ($bgy == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qfield = "tbl_scholar.scholar_dateadded, tbl_scholar.scholar_serial, tbl_scholar.scholar_status, tbl_user.user_fullname";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    $query .= "where tbl_scholar.scholar_barangay like '%$bgy%' ";
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
        $data['message'] = "Server Error! dbappl $query";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>