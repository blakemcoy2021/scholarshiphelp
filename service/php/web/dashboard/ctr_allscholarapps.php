<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $ctrArr = new stdClass();


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_status='New' ";
    $query .= "order by scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            $data['success'] = "zero";
            $data['message'] = "No Row Results Scholarship Applications!";
            $data['logs'] = "Query Result Error.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];
        $ctrArr->new = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_status <> 'New' and scholar_status <> 'done' ";
    $query .= "order by scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            $data['success'] = "zero";
            $data['message'] = "No Row Results Scholarship Applications!";
            $data['logs'] = "Query Result Error.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];
        $ctrArr->curr = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_status='done' ";
    $query .= "order by scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
        
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  
        if (count($rowctr) < 1) {
            $data['success'] = "zero";
            $data['message'] = "No Row Results Scholarship Applications!";
            $data['logs'] = "Query Result Error.";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $stmt->execute();
        $results = $stmt->fetch();
        $ctr = $results["ctr"];
        $ctrArr->done = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $data['success'] = json_encode($ctrArr);
    $data['message'] = "Acquired sum value of Scholarship Application based on their states!";
    $data['logs'] = "Scholarship Applications totals based on states.";
    echo json_encode($data);
    $conn = null;

?>