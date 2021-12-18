<?php

    include "../common/dbconfig.php";

    $fldrname = "zscholarhelp";

    $fn = "none";
        $mn = "none";
        $ln = "none";
    $pn = "none";
    $ad = "none";
    $bd = "none";
    $un = "none";
    $ps = "none";
    $gd = "none";

    $ph = "none";

    $errors = [];
    $data = [];

    if (isset($_POST["fnme"]))      {   $fn = $_POST["fnme"];    }
        if (isset($_POST["mnme"]))      {   $mn = $_POST["mnme"];    }
        if (isset($_POST["lnme"]))      {   $ln = $_POST["lnme"];    }
    if (isset($_POST["pnum"]))      {   $pn = $_POST["pnum"];    }
    if (isset($_POST["addr"]))      {   $ad = $_POST["addr"];    }
    if (isset($_POST["bday"]))      {   $bd = $_POST["bday"];    }
    if (isset($_POST["unme"]))      {   $un = $_POST["unme"];    }
    if (isset($_POST["pass"]))      {   $ps = $_POST["pass"];    }
    if (isset($_POST["gndr"]))      {   $gd = $_POST["gndr"];    }

    if (isset($_FILES["phto"]))     {   $ph = $_FILES["phto"];    }

    $failfieldctr = 0;
    if ($fn == "none") { $failfieldctr += 1; }
        if ($mn == "none") { $failfieldctr += 1; }
        if ($ln == "none") { $failfieldctr += 1; }
    if ($pn == "none") { $failfieldctr += 1; }
    if ($ad == "none") { $failfieldctr += 1; }
    if ($bd == "none") { $failfieldctr += 1; }
    if ($un == "none") { $failfieldctr += 1; }
    if ($ps == "none") { $failfieldctr += 1; }
    if ($gd == "none") { $failfieldctr += 1; }

    if ($ph == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }


    // pre-file path
    $info = pathinfo($ph["name"]);
    $ext = $info['extension'];

    $s = ucfirst($fn);
    $bar = ucwords(strtolower($s));
    $trim_name = preg_replace('/\s+/','',$bar);
    
    $loc_photo = "data/scholars/imgs/$trim_name$un";
    $fileph = "$un$trim_name.$ext";
    
    // getting parent path
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

    // post-file path
    // path photo
    $upload_urlph = $p . $loc_photo;
    $fph = $upload_urlph . "/" . $fileph;

    // parent directory
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

    // validate photo if photo and size
    $photomime;
    $checkphoto = getimagesize($ph["tmp_name"]);
    if ($checkphoto === false) {
        $data['success'] = false;
        $data['message'] = "Server File Error!";
        $data['logs'] = "Not valid photo.";
        echo json_encode($data);
        die();
    } else {
        $photomime = $checkphoto["mime"];
    }
    if ($ph["size"] > 1000000) {
        $data['success'] = false;
        $data['message'] = "File is to large! Less than 1MB is required.";
        $data['logs'] = "Uploading Photo is more than 1MB.";
        echo json_encode($data);
        die();
    }

    // upload photo
    try {
        move_uploaded_file($ph["tmp_name"], $fph);
    } catch (Exception $err) {
        $data['success'] = false;
        $data['message'] = "Server Photo Save Error!";
        $data['logs'] = "Photo Save Error :: $err.";
        echo json_encode($data);
        die();
    }
    
    $dbpath_ph = $loc_photo . '/' . $fileph;

    
    $query = "insert into tbl_contact (contact_phnum, contact_address) ";
    $query .= "values ('$pn','$ad');";
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

    $contactid = 0;
    $query = "select contact_id from tbl_contact ";
    $query .= "order by contact_id desc limit 1;";
    try {
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
  
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  //echo count($rowctr);
        if (count($rowctr) < 1) {
          $data['success'] = false;
          $data['message'] = "Database Glitch! g1";
          $data['logs'] = "Database Suddenly Empty. part1";
          echo json_encode($data);
          $conn = null;
          die();
        }
  
        $stmt->execute();
        $row = $stmt->fetch();
        $contactid = $row["contact_id"];
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p2";
        $data['logs'] = "Database Exception - part2 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }

    $gender = "1";
    if ($gd == "female") { $gender = "0"; }

    $datereg = date("Y-m-d G:i:s");
    $qflds = "user_firstname, user_middlename, user_lastname, user_photo, user_gender, user_birthdate, ";
    $qflds .= "user_contactid, user_role, user_dateadded";
    $qval = "'$fn','$mn','$ln', '$dbpath_ph', '$gender', '$bd', '$contactid', 'scholar', '$datereg'";
    $query = "insert into tbl_user ($qflds) values ($qval);";
    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $conn->prepare($query);
      $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p3";
        $data['logs'] = "Database Exception - part3 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }
      

    $userid = 0;
    $query = "select user_id from tbl_user ";
    $query .= "where user_contactid='$contactid' ";
    $query .= "order by user_id desc limit 1;";
    try {
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
  
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  //echo count($rowctr);
        if (count($rowctr) < 1) {
          $data['success'] = false;
          $data['message'] = "Database Glitch! g2";
          $data['logs'] = "Database Suddenly Empty. part2";
          echo json_encode($data);
          $conn = null;
          die();
        }
  
        $stmt->execute();
        $row = $stmt->fetch();
        $userid = $row["user_id"];
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p4";
        $data['logs'] = "Database Exception - part4 " . $e->getMessage();;
        echo json_encode($data);
        $conn = null;
        die();
    }

    $query = "insert into tbl_login (login_uname, login_password, login_userid) ";
    $query .= "values ('$un','$ps','$userid');";
    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $conn->prepare($query);
      $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p6";
        $data['logs'] = "Database Exception - part6 " . $e->getMessage();
        echo json_encode($data);
        $conn = null;
        die();
    }

    $data['success'] = "success";
    $data['message'] = "You have successfully registered $fn!";
    $data['logs'] = "Insert Query Successful.";
    echo json_encode($data);
    $conn = null;
?>