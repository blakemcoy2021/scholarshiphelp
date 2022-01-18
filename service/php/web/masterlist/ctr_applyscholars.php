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

            $upds = "";
            $old = "0";
            $new = "0";
                $snid = "0";

            $tbl_arr = ["contact", "user", "scholar", "cor", "cog", "idg", "idc", "bio"];
            for ($i = 0; $i < sizeof($tbl_arr); $i++) {
                $ids = $tbl_arr[$i] . "_id";
                $tbl = "tbl_" . $tbl_arr[$i];
                $dtx = $tbl_arr[$i] . "_lastupdate";            
                $seen = $tbl_arr[$i] . "_seen";         

                // $query = "select $ids from $tbl ";
                // $query .= "order by $ids desc limit 1";
                // $stmt = $conn->prepare($query);
                // $stmt->execute();
                // $rowres = $stmt->fetch();
                // $old = $rowres["$ids"];
                // $query = "select $ids, UNIX_TIMESTAMP($dtx) as dt from $tbl ";
                // $query .= "order by dt desc limit 1";
                // $stmt = $conn->prepare($query);
                // $stmt->execute();
                // $rowres = $stmt->fetch();
                // $new = $rowres["$ids"];
                // if ($old != $new) { $upds .= $tbl_arr[$i] . "=$new,"; }

                $query = "select $ids, $seen from $tbl ";
                $query .= "where $seen='0' ";
                $query .= "order by $ids desc limit 1";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $rowres = $stmt->fetch();
                $snid = $rowres["$seen"];
                $new = $rowres["$ids"];
                if ($snid == "0") { $upds .= $tbl_arr[$i] . "=$new,"; }

                //echo "$ids $tbl $dtx $seen $query<br><br>";
            }
            $is_comma_end = substr($upds, strlen($upds)-1);
            if ($is_comma_end == ",") { $upds = substr($upds, 0, strlen($upds)-1); }
            //echo "$upds"; die();

            $upds = "$ctr,$upds";
            $is_comma_end = substr($upds, strlen($upds)-1);
            if ($is_comma_end == ",") { $upds = substr($upds, 0, strlen($upds)-1); }

        $data['success'] = "$upds";
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