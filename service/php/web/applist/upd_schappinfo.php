<?php

    include "../common/dbconfig.php";

    $fldrname = "zscholarhelp";

    $lbl = "none";
    $crs = "none";
    $sch = "none";
    $grd = "none";
        $bgy = "none";
    $uid = "none";
    $sid = "none";

    $ph = "none";

    $errors = [];
    $data = [];

    if (isset($_POST["lbl"]))       {   $lbl = $_POST["lbl"];        }
    if (isset($_POST["crs"]))       {   $crs = $_POST["crs"];        }
    if (isset($_POST["sch"]))       {   $sch = $_POST["sch"];        }
    if (isset($_POST["grd"]))       {   $grd = $_POST["grd"];        }
        if (isset($_POST["bgy"]))       {   $bgy = $_POST["bgy"];        }
    if (isset($_POST["uid"]))       {   $uid = $_POST["uid"];        }
    if (isset($_POST["sid"]))       {   $sid = $_POST["sid"];        }


    $failfieldctr = 0;
    if ($lbl == "none") { $failfieldctr += 1; }
    if ($crs == "none") { $failfieldctr += 1; }
    if ($sch == "none") { $failfieldctr += 1; }
    if ($grd == "none") { $failfieldctr += 1; }
        if ($bgy == "none") { $failfieldctr += 1; }
    if ($uid == "none") { $failfieldctr += 1; }
    if ($sid == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }

    $dateupd = date("Y-m-d G:i:s");

    $qval = "scholar_title='$lbl', scholar_barangay='$bgy', scholar_course='$crs', scholar_school='$sch', scholar_gradeyr='$grd', scholar_lastupdate='$dateupd', ";
    $qval .= "scholar_status='For Review'";
    $query = "update tbl_scholar ";
    $query .= "set $qval ";
    $query .= "where scholar_id='$sid';";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p1";
        $data['logs'] = "Database Exception - part1 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }

    $data['success'] = "success";
    $data['message'] = "Successfully updated scholar application information: $lbl!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>