<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    $vfy = "none";
    $doc = "none";
    
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    if (isset($_GET["vfy"])) { $vfy = $_GET["vfy"]; }
    if (isset($_GET["doc"])) { $doc = $_GET["doc"]; }

    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($vfy == "none") { $failfieldctr += 1; }
    if ($doc == "none") { $failfieldctr += 1; }
    
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $qval = "1";
    if ($vfy == "0") {
        $qval = "0";
    } else if ($vfy == "2") {
        $qval = "2";
    }

    $qtbl = "tbl_cor";
    $stbl = "cor_verified";
    $ftbl = "cor_scholarid";
    if ($doc == "cog") {
        $qtbl = "tbl_cog";
        $stbl = "cog_verified";
        $ftbl = "cog_scholarid";
    } else if ($doc == "idg") {
        $qtbl = "tbl_idg";
        $stbl = "idg_verified";
        $ftbl = "idg_scholarid";
    } else if ($doc == "idc") {
        $qtbl = "tbl_idc";
        $stbl = "idc_verified";
        $ftbl = "idc_scholarid";
    } else if ($doc == "bio") {
        $qtbl = "tbl_bio";
        $stbl = "bio_verified";
        $ftbl = "bio_scholarid";
    }
    
    $query = "update $qtbl ";
    $query .= "set $stbl='$qval' ";
    $query .= "where $ftbl='$sid' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();

            $verify1st = 0;
            $verify2nd = 0;
            $verify3rd = 0;
            $verify4th = 0;
            $verify5th = 0;
            $verify6th = 0;

            $query = "select scholar_status from tbl_scholar ";
            $query .= "where scholar_id='$sid' ";
            $stmt = $conn->prepare($query);
            $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row["scholar_status"] == "Review Docs") {
                $verify1st = 1;
            }

            if ($verify1st == 1) {
                $query = "select cor_verified from tbl_cor ";
                $query .= "where cor_scholarid='$sid' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();
                if ($row["cor_verified"] == "1") {
                    $verify2nd = 1;
                }
                $query = "select cog_verified from tbl_cog ";
                $query .= "where cog_scholarid='$sid' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();
                if ($row["cog_verified"] == "1") {
                    $verify3rd = 1;
                }
                $query = "select idg_verified from tbl_idg ";
                $query .= "where idg_scholarid='$sid' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();
                if ($row["idg_verified"] == "1") {
                    $verify4th = 1;
                }
                $query = "select idc_verified from tbl_idc ";
                $query .= "where idc_scholarid='$sid' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();
                if ($row["idc_verified"] == "1") {
                    $verify5th = 1;
                }
                $query = "select bio_verified from tbl_bio ";
                $query .= "where bio_scholarid='$sid' ";
                $stmt = $conn->prepare($query);
                $stmt->execute();
                $row = $stmt->fetch();
                if ($row["bio_verified"] == "1") {
                    $verify6th = 1;
                }
                if ($verify2nd == 1 && $verify3rd == 1 && $verify4th == 1 && $verify5th == 1 && $verify6th = 1) {
                    $query = "update tbl_scholar ";
                    $query .= "set scholar_status='Overall' ";
                    $query .= "where scholar_id='$sid' ";
                    $stmt = $conn->prepare($query);
                    $stmt->execute();
                } 
                else {
                    $query = "update tbl_scholar ";
                    $query .= "set scholar_status='Review Docs' ";
                    $query .= "where scholar_id='$sid' ";
                    $stmt = $conn->prepare($query);
                    $stmt->execute();
                }
            }

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbstrvwl";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "success";
    $data['message'] = "Successfully updated status of $doc from scholar application #$sid!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>