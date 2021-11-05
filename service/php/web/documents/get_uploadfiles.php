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

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_cor.cor_filename, tbl_cor.cor_path, tbl_cor.cor_verified, tbl_cor.cor_lastupdate ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_cor on tbl_scholar.scholar_id=tbl_cor.cor_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_cor.cor_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();   

        /** injecting file type on result */
        $counter = 0;                   // $newarr = [];
        foreach ($results as $idx) {
            $idx['type'] = 'cor';       // print ("<pre>"); print_r($idx); print "</pre>";
            $results[$counter] = $idx;  // array_push($newarr, $idx);
            $counter++;
            
        }
        // print ("<pre>"); print_r($results); print "</pre>";
        // $results[0]['type'] = 'cor';
        // print ("<pre>"); print_r($newarr); print "</pre>";
        // print ("<pre>"); print_r($results); print "</pre>";
        // print ("<pre>"); print_r($results[0]['scholar_title']); print "</pre>";
        // print sizeof($results);

        /** collating modified result to a single array set */
        foreach ($results as $idx) { array_push($set, $idx); }     //print ("<pre>"); print_r($set); print "</pre>";

    } catch(PDOException $e) {  echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbupfile1";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_cog.cog_filename, tbl_cog.cog_path, tbl_cog.cog_verified, tbl_cog.cog_lastupdate ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_cog on tbl_scholar.scholar_id=tbl_cog.cog_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_cog.cog_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();   

        $counter = 0;
        foreach ($results as $idx) {    /** injecting file type on result */
            $idx['type'] = 'cog';
            $results[$counter] = $idx;
            $counter++;    
        }
        foreach ($results as $idx) {    /** collating modified result to a single array set */
            array_push($set, $idx); 
        }  

    } catch(PDOException $e) {  echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbupfile2";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_idg.idg_filename, tbl_idg.idg_path, tbl_idg.idg_verified, tbl_idg.idg_lastupdate ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_idg on tbl_scholar.scholar_id=tbl_idg.idg_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_idg.idg_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();   

        $counter = 0;
        foreach ($results as $idx) {    /** injecting file type on result */
            $idx['type'] = 'idg';
            $results[$counter] = $idx;
            $counter++;    
        }
        foreach ($results as $idx) {    /** collating modified result to a single array set */
            array_push($set, $idx); 
        }  

    } catch(PDOException $e) {  echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbupfile3";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }

    $qfield = "tbl_scholar.scholar_title, tbl_scholar.scholar_status, ";
    $qfield .= "tbl_idc.idc_filename, tbl_idc.idc_path, tbl_idc.idc_verified, tbl_idc.idc_lastupdate ";
    $query = "select $qfield from tbl_scholar ";
    $query .= "inner join tbl_idc on tbl_scholar.scholar_id=tbl_idc.idc_scholarid ";
    $query .= "where tbl_scholar.scholar_userid='$suid' and tbl_idc.idc_filename <> 'none' ";
    $query .= "order by tbl_scholar.scholar_id desc";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $results = $stmt->fetchAll();   

        $counter = 0;
        foreach ($results as $idx) {    /** injecting file type on result */
            $idx['type'] = 'idc';
            $results[$counter] = $idx;
            $counter++;    
        }
        foreach ($results as $idx) {    /** collating modified result to a single array set */
            array_push($set, $idx); 
        }  

    } catch(PDOException $e) {  echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbupfile3";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
        die();
    }
    // print ("<pre>"); print_r($set); print "</pre>";
    
    usort($set, function($a, $b) {
        $g = $a['type'];        $h = $b['type'];
        $x = 'cor_lastupdate';  $y = 'cor_lastupdate';

        if ($g == 'cog') {          
            $x = 'cog_lastupdate';
        } else if ($g == 'idg') {   
            $x = 'idg_lastupdate';  
        } else if ($g == 'idc') {
            $x = 'idc_lastupdate';
        }
        
        if ($h === 'cog') {         
            $y = 'cog_lastupdate';
        } else if ($h == 'idg') {   
            $y = 'idg_lastupdate';  
        } else if ($h == 'idc') {
            $y = 'idc_lastupdate';
        }
        
        // echo $g . " " . $h . "<br>";    echo $x . " " . $y . "<br>";

        return strtotime($a[$x]) - strtotime($b[$y]);
    }); 
    // print ("<pre>"); print_r($set); print "</pre>";

    $set = array_reverse($set);     // print ("<pre>"); print_r($set); print "</pre>";

    if (sizeof($set) < 1) {
        $data['success'] = "zero";
        $data['message'] = "No uploaded files recorded!";
        $data['logs'] = "Uploaded Files Not Found.";

    } else {
        $data['success'] = json_encode($set);
        $data['message'] = "Successfully acquired Uploaded Files!";
        $data['logs'] = "List of Uploaded Files Found.";

    }
    echo json_encode($data);
    $conn = null;

?>