<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $zrt = "none";
    if (isset($_GET["zrt"])) { $zrt = $_GET["zrt"]; }
    $failfieldctr = 0;
    if ($zrt == "none") { $failfieldctr += 1; }
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_school, tbl_scholar.scholar_status, tbl_scholar.scholar_barangay, tbl_scholar.scholar_id, tbl_scholar.scholar_claimed, ";
    $qfield .= "tbl_scholar.scholar_approved, tbl_scholar.scholar_dateadded, tbl_user.user_firstname, tbl_user.user_middlename, tbl_user.user_lastname, tbl_scholar.scholar_serial ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    if ($zrt == "def") {
        $query .= "order by tbl_scholar.scholar_id desc";
    } else if ($zrt == "az") {
        $query .= "order by tbl_user.user_firstname asc";
    } else if ($zrt == "za") {
        $query .= "order by tbl_user.user_firstname desc";
    }


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

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbsch";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }
    $conn = null;
    echo json_encode($data);
?>