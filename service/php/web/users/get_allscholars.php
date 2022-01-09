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

    $qfield = "tbl_login.login_isonline, tbl_login.login_lastupdate, tbl_user.user_firstname, tbl_user.user_middlename, ";
    $qfield .= "tbl_user.user_lastname, tbl_user.user_dateadded, tbl_contact.contact_phnum, tbl_contact.contact_address ";
    $query = "select $qfield from tbl_user ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "inner join tbl_contact on tbl_user.user_contactid=tbl_contact.contact_id ";
    $query .= "where tbl_user.user_role='scholar' ";
    if ($zrt == "def") {
        $query .= "order by tbl_user.user_id desc";
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
            $data['message'] = "No scholars recorded!";
            $data['logs'] = "Scholars Not Found.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetchAll();

        $data['success'] = json_encode($results);
        $data['message'] = "Successfully acquired Scholars!";
        $data['logs'] = "List of Scholars Found.";

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschs";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }
    $conn = null;
    echo json_encode($data);
?>