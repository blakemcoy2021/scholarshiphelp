<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $ctrArr = new stdClass();


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Agustin (Sumpung)' ";
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
        $ctrArr->agustin = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Bartolome (Patayum)' ";
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
        $ctrArr->bartolome = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Isidro (Quenabuan)' ";
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
        $ctrArr->isidro = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Joaquin (Poblacion, Canukil)' ";
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
        $ctrArr->joaquin = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }

    
    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Jose (Catmun)' ";
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
        $ctrArr->jose = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Juan (Tinajeru)' ";
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
        $ctrArr->juan = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Nicolas (Sepung Ilug)' ";
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
        $ctrArr->nicolas = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Pablo (Darabulbul)' ";
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
        $ctrArr->pablo = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Pedro (Calumpang)' ";
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
        $ctrArr->pedro = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }

    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='San Roque (Tuclung)' ";
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
        $ctrArr->roque = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='Santa Lucia (Calinan)' ";
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
        $ctrArr->lucia = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='Santa Maria (Balen Bayu)' ";
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
        $ctrArr->maria = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='Santiago (Barrio Libutad)' ";
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
        $ctrArr->santiago = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }


    $query = "select count(*) as ctr from tbl_scholar ";
    $query .= "where scholar_barangay='Santo Rosario (Pagbatuan)' ";
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
        $ctrArr->rosario = $ctr;

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbschappctr";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }

    $data['success'] = json_encode($ctrArr);
    $data['message'] = "Acquired sum value of applicants per barangay!";
    $data['logs'] = "Applicants totals per barangay.";
    echo json_encode($data);
    $conn = null;

?>