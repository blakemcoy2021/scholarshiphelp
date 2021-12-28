<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_approved='0' and scholar_status <> 'done' and scholar_status <> 'Awarded' ";
    $query .= "and scholar_status <> 'Overall' ";
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

        $data['success'] = $ctr;
        $data['message'] = "Acquired sum value of Scholarship Application!";
        $data['logs'] = "Scholarship Applications total is $ctr.";
        echo json_encode($data);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>