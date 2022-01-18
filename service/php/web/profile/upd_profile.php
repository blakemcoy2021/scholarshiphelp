<?php

    include "../common/dbconfig.php";

    $fldrname = "zscholarhelp";

    $fname = "none";
        $mname = "none";
        $lname = "none";
    $bdate = "none";
    $addr = "none";
    $phnum = "none";
    $gender = "none";
    $uid = "none";

    $ph = "none";

    $errors = [];
    $data = [];

    if (isset($_POST["fname"]))       {   $fname = $_POST["fname"];        }
        if (isset($_POST["mname"]))       {   $mname = $_POST["mname"];        }
        if (isset($_POST["lname"]))       {   $lname = $_POST["lname"];        }
    if (isset($_POST["bdate"]))       {   $bdate = $_POST["bdate"];        }
    if (isset($_POST["addr"]))        {   $addr = $_POST["addr"];          }
    if (isset($_POST["phnum"]))       {   $phnum = $_POST["phnum"];        }
    if (isset($_POST["gender"]))      {   $gender = $_POST["gender"];      }
    if (isset($_POST["uid"]))         {   $uid = $_POST["uid"];            }

    if (isset($_FILES["photo"]))      {   $ph = $_FILES["photo"];         }

    $failfieldctr = 0;
    if ($fname == "none") { $failfieldctr += 1; }
        if ($mname == "none") { $failfieldctr += 1; }
        if ($lname == "none") { $failfieldctr += 1; }
    if ($bdate == "none") { $failfieldctr += 1; }
    if ($addr == "none") { $failfieldctr += 1; }
    if ($phnum == "none") { $failfieldctr += 1; }
    if ($gender == "none") { $failfieldctr += 1; }
    if ($uid == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }

    //** select user table via driver id and get photo path name instead generating new one */
    $dbpath_ph = "no_path";
    if ($ph != "none") {
        $query = "select user_photo from tbl_user ";
        $query .= "where user_id='$uid' ";
        $query .= "order by user_id desc";
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare($query);
            $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
    
            $stmt->execute();
            $rowctr = $stmt->fetchAll();  
            if (count($rowctr) < 1) {
                $data['success'] = false;
                $data['message'] = "Suddenly, the selected profile record is gone!";
                $data['logs'] = "Profile Not Found.";
                echo json_encode($data);
                $conn = null;
                die();
            }
            $stmt->execute();
            $row = $stmt->fetch();
            $dbpath_ph = $row["user_photo"];
    
        } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
            $data['success'] = false;
            $data['message'] = "Server Error! dbusr";
            $data['logs'] = "Database Exception - " . $e->getMessage();;
            echo json_encode($data);
        }
    

        //** if photo path for the driver exist (get the existing) or not (create something) */
        $loc_photo;
        $fileph;
        if ($dbpath_ph != "no_path" && $dbpath_ph != "no_img") {                 //** exist */
            $loc_photo = dirname($dbpath_ph);
            $fileph = basename($dbpath_ph);
        }
        else {                                      //** none */
            // pre-file path
            $info = pathinfo($ph["name"]);
            $ext = $info['extension'];

            $s = ucfirst($fname);
            $bar = ucwords(strtolower($s));
            $trim_name = preg_replace('/\s+/','',$bar);
            
            $loc_photo = "data/scholars/imgs/$trim_name";
            $fileph = "$trim_name.$ext";
        }    
        
        //** getting parent path */
        $parent_path = explode("/",__DIR__);
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $parent_path = explode("\\",__DIR__);
        }
        $p = "/";
        $indexpath_max = 3;
        if ($i = array_search($fldrname, $parent_path)) {
            $indexpath_max = $i;					
            for ($i = 1; $i <= $indexpath_max; $i++) {
                $p .= $parent_path[$i] . "/";
            }
        } else {
            $p = "/".$parent_path[1].
            "/".$parent_path[2].
            "/".$parent_path[3]."/";
        }
    
        //** post-file path; path photo */
        $upload_urlph = $p . $loc_photo;
        $fph = $upload_urlph . "/" . $fileph;
    
        //** parent directory */
        $createDirectory = true;
        if (is_writable($p)) {
            if (file_exists($upload_urlph)) {
                $createDirectory = false;
            }
            if (!is_dir($upload_urlph)) {
                $createDirectory = true;
            }
        } else {
            $data['success'] = false;
            $data['message'] = "Server Path Error!";
            $data['logs'] = "Path not writable.";
            echo json_encode($data);
            die();
        }
        if ($createDirectory) {
            mkdir($upload_urlph, 0777, true);
        }
    
        if ($ph != "none") {
            //** validate photo if photo and size */
            $photomime;
            $checkphoto = getimagesize($ph["tmp_name"]);
            if ($checkphoto === false) {
                $data['success'] = false;
                $data['message'] = "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!";
                $data['logs'] = "Not valid photo.";
                echo json_encode($data);
                die();
            } else {
                $photomime = $checkphoto["mime"];
            }
            if ($ph["size"] > 4000000) {
                $data['success'] = false;
                $data['message'] = "File is to large! Less than 4MB is required.";
                $data['logs'] = "Uploading Photo is more than 4MB.";
                echo json_encode($data);
                die();
            }

            //** upload photo */
            try {
                move_uploaded_file($ph["tmp_name"], $fph);
            } catch (Exception $err) {
                $data['success'] = false;
                $data['message'] = "Server Photo Save Error!";
                $data['logs'] = "Photo Save Error :: $err.";
                echo json_encode($data);
                die();
            }        
        }
        
        $dbpath_ph = $loc_photo . '/' . $fileph;
    }

    $dateupd = date("Y-m-d G:i:s");

    $qval = "user_firstname='$fname', user_middlename='$mname', user_lastname='$lname', ";
    $qval .= "user_gender='$gender', user_birthdate='$bdate', user_lastupdate='$dateupd', user_seen='0'";
    if ($ph != "none") {
        $qval .= ", user_photo='$dbpath_ph' ";
    }
    $query = "update tbl_user ";
    $query .= "set $qval ";
    $query .= "where user_id='$uid';";
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

    $qval = "tbl_contact.contact_phnum='$phnum', tbl_contact.contact_address='$addr', ";
    $qval .= "tbl_contact.contact_lastupdate='$dateupd', tbl_contact.contact_seen='0' ";
    $query = "update tbl_contact ";
    $query .= "inner join tbl_user on tbl_contact.contact_id=tbl_user.user_contactid ";
    $query .= "set $qval ";
    $query .= "where tbl_user.user_id='$uid';";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->execute();
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p2";
        $data['logs'] = "Database Exception - part2 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }

    $data['success'] = "success";
    $data['message'] = "Successfully updated profile $fname!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>