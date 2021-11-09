<?php

    include "../common/dbconfig.php";

    $fldrname = "zscholarhelp";

    $tl = "none";
    $el = "none";
    $sc = "none";
    $gy = "none";
        $br = "none";
    $id = "none";
    $nm = "none";

    $cor = "none";
    $cog = "none";
    $idg = "none";
    $idc = "none";

    $errors = [];
    $data = [];

        if (isset($_POST["schotitle"]))   {   $tl = $_POST["schotitle"];      }
    if (isset($_POST["course"]))            {   $el = $_POST["course"];      }
    if (isset($_POST["school"]))     {   $sc = $_POST["school"];        }
    if (isset($_POST["gradeyear"]))  {   $gy = $_POST["gradeyear"];     }
        if (isset($_POST["brgy"]))  {   $br = $_POST["brgy"];     }
    if (isset($_POST["uid"]))        {   $id = $_POST["uid"];           }
    if (isset($_POST["uname"]))       {   $nm = $_POST["uname"];           }

    if (isset($_FILES["cogfile"]))   {   $cor = $_FILES["cogfile"];    }
    if (isset($_FILES["corfile"]))   {   $cog = $_FILES["corfile"];    }
    if (isset($_FILES["idgfile"]))   {   $idg = $_FILES["idgfile"];    }
    if (isset($_FILES["idcfile"]))   {   $idc = $_FILES["idcfile"];    }

    $failfieldctr = 0;
        if ($tl == "none") { $failfieldctr += 1; }
    if ($el == "none") { $failfieldctr += 1; }
    if ($sc == "none") { $failfieldctr += 1; }
    if ($gy == "none") { $failfieldctr += 1; }
        if ($br == "none") { $failfieldctr += 1; }
    if ($id == "none") { $failfieldctr += 1; }
    if ($nm == "none") { $failfieldctr += 1; }

    // if ($cor == "none") { $failfieldctr += 1; }
    // if ($cog == "none") { $failfieldctr += 1; }
    // if ($idg == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }

    $query = "select tbl_scholar.scholar_id from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    $query .= "where tbl_scholar.scholar_userid='$id' and (tbl_scholar.scholar_status <> 'done' OR tbl_scholar.scholar_status <> 'awarded') ";
    $query .= "order by tbl_scholar.scholar_id desc limit 1;";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  //echo count($rowctr);
        if (count($rowctr) == 1) {
          $data['success'] = false;
          $data['message'] = "There is an existing scholarship application undergoing. Unable to create new one.";
          $data['logs'] = "One at a time scholarship application processing.";
          echo json_encode($data);
          $conn = null;
          die();
        }
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! existapp";
        $data['logs'] = "Database Exception - existapp " . $e->getMessage();;
        echo json_encode($data);
        $conn = null;
        die();
    }






    $idfile = date("YmdGis");

    // pre-file path
    $info1; $ext1 = 'none';
    if ($cor != "none") {
        $info1 = pathinfo($cor["name"]);
        $ext1 = $info1['extension'];
    }

    $info2; $ext2 = 'none';
    if ($cog != "none") {
        $info2 = pathinfo($cog["name"]);
        $ext2 = $info2['extension'];
    }

    $info3; $ext3 = 'none';
    if ($idg != "none") {
        $info3 = pathinfo($idg["name"]);
        $ext3 = $info3['extension'];
    }

    $info4; $ext4 = 'none';
    if ($idc != "none") {
        $info4 = pathinfo($idc["name"]);
        $ext4 = $info4['extension'];
    }

    $s = ucfirst($nm);
    $bar = ucwords(strtolower($s));
    $trim_name = preg_replace('/\s+/','',$bar);
    
    $tmp = "data/cor/";
    if ($ext1 == "pdf") { $tmp .= "pdf/"; } else { $tmp .= "imgs/"; }
    $loc_cor = "$tmp$trim_name$idfile";
    $fileCOR = "COR-$trim_name$idfile.$ext1";

    $tmp = "data/cog/";
    if ($ext2 == "pdf") { $tmp .= "pdf/"; } else { $tmp .= "imgs/"; }
    $loc_cog = "$tmp$trim_name$idfile";
    $fileCOG = "COG-$trim_name$idfile.$ext2";

    $loc_idg = "data/idg/imgs/$trim_name$idfile";
    $fileIDG = "IDG-$trim_name$idfile.$ext3";
    
    $loc_idc = "data/idc/imgs/$trim_name$idfile";
    $fileIDC = "IDC-$trim_name$idfile.$ext4";


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
    // path certificate of registration
    $upload_urlcor = $p . $loc_cor;
    $fcor = $upload_urlcor . "/" . $fileCOR;
    // path certificate of grades
    $upload_urlcog = $p . $loc_cog;
    $fcog = $upload_urlcog . "/" . $fileCOG;
    // path indigency
    $upload_urlidg = $p . $loc_idg;
    $fidg = $upload_urlidg . "/" . $fileIDG;
    // path photoid
    $upload_urlidc = $p . $loc_idc;
    $fidc = $upload_urlidc . "/" . $fileIDC;


    // parent directory
    $createDirectory = true;
    if (is_writable($p)) {
        if (file_exists($upload_urlcor) || file_exists($upload_urlcog) || file_exists($upload_urlidg) || file_exists($upload_urlidc)) {
            $createDirectory = false;
        }
        if (!is_dir($upload_urlcor) || !is_dir($upload_urlcog) || !is_dir($upload_urlidg) || !is_dir($upload_urlidc)) {
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
        if ($cor != "none") {         mkdir($upload_urlcor, 0777, true); }
        if ($cog != "none") {         mkdir($upload_urlcog, 0777, true); }
        if ($idg != "none") {         mkdir($upload_urlidg, 0777, true); }
        if ($idc != "none") {         mkdir($upload_urlidc, 0777, true); }
    }



    // ***Indigency
    // validate photo if photo and size
    $photomime;

    if ($idg != "none") {
        $checkphoto = getimagesize($idg["tmp_name"]);
        if ($checkphoto === false) {
            $data['success'] = false;
            $data['message'] = "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!";
            $data['logs'] = "Not valid photo.";
            echo json_encode($data);
            die();
        } else {
            $photomime = $checkphoto["mime"];
        }
        if ($idg["size"] > 4000000) {
            $data['success'] = false;
            $data['message'] = "File is to large! Less than 4MB is required.";
            $data['logs'] = "Uploading Photo is more than 4MB.";
            echo json_encode($data);
            die();
        }
        // upload photo Indigency
        try {
            move_uploaded_file($idg["tmp_name"], $fidg);
        } catch (Exception $err) {
            $data['success'] = false;
            $data['message'] = "Server Photo Save Error!";
            $data['logs'] = "Photo Save Error :: $err.";
            echo json_encode($data);
            die();
        }
    }

    // ***Photo ID
    if ($idc != "none") {
        $checkphoto = getimagesize($idc["tmp_name"]);
        if ($checkphoto === false) {
            $data['success'] = false;
            $data['message'] = "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!";
            $data['logs'] = "Not valid photo.";
            echo json_encode($data);
            die();
        } else {
            $photomime = $checkphoto["mime"];
        }
        if ($idc["size"] > 4000000) {
            $data['success'] = false;
            $data['message'] = "File is to large! Less than 4MB is required.";
            $data['logs'] = "Uploading Photo is more than 4MB.";
            echo json_encode($data);
            die();
        }
        // upload photo id
        try {
            move_uploaded_file($idc["tmp_name"], $fidc);
        } catch (Exception $err) {
            $data['success'] = false;
            $data['message'] = "Server Photo Save Error!";
            $data['logs'] = "Photo Save Error :: $err.";
            echo json_encode($data);
            die();
        }
    }


    // ***COR
    if ($cor != "none") {
        if ($ext1 != "pdf") { 
            // validate photo if photo and size
            $checkphoto = getimagesize($cor["tmp_name"]);
            if ($checkphoto === false) {
                $data['success'] = false;
                $data['message'] = "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!";
                $data['logs'] = "Not valid photo.";
                echo json_encode($data);
                die();
            } else {
                $photomime = $checkphoto["mime"];
            }
            if ($cor["size"] > 4000000) {
                $data['success'] = false;
                $data['message'] = "File is to large! Less than 4MB is required.";
                $data['logs'] = "Uploading Photo is more than 4MB.";
                echo json_encode($data);
                die();
            }
            // upload photo registration
            try {
                move_uploaded_file($cor["tmp_name"], $fcor);
            } catch (Exception $err) {
                $data['success'] = false;
                $data['message'] = "Server CORp Save Error!";
                $data['logs'] = "CORp Save Error :: $err.";
                echo json_encode($data);
                die();
            }
        } 
        else { // upload pdf
            try {
                move_uploaded_file($cor["tmp_name"], $fcor);
            } catch (Exception $err) {
                $data['success'] = false;
                $data['message'] = "Server COR Save Error!";
                $data['logs'] = "COR Save Error :: $err.";
                echo json_encode($data);
                die();
            }
        }
    }

    // ***COG
    if ($cog != "none") {
        if ($ext2 != "pdf") { 
            // validate photo if photo and size
            $checkphoto = getimagesize($cog["tmp_name"]);
            if ($checkphoto === false) {
                $data['success'] = false;
                $data['message'] = "Selected Image File is corrupted. Find less than 4MB image jpg/png also.!";
                $data['logs'] = "Not valid photo.";
                echo json_encode($data);
                die();
            } else {
                $photomime = $checkphoto["mime"];
            }
            if ($cog["size"] > 4000000) {
                $data['success'] = false;
                $data['message'] = "File is to large! Less than 4MB is required.";
                $data['logs'] = "Uploading Photo is more than 4MB.";
                echo json_encode($data);
                die();
            }
            // upload photo grades
            try {
                move_uploaded_file($cog["tmp_name"], $fcog);
            } catch (Exception $err) {
                $data['success'] = false;
                $data['message'] = "Server COGp Save Error!";
                $data['logs'] = "COGp Save Error :: $err.";
                echo json_encode($data);
                die();
            }
        } 
        else { // upload pdf
            try {
                move_uploaded_file($cog["tmp_name"], $fcog);
            } catch (Exception $err) {
                $data['success'] = false;
                $data['message'] = "Server COG Save Error!";
                $data['logs'] = "COG Save Error :: $err.";
                echo json_encode($data);
                die();
            }
        }
    }




    
    $dbpath_idg = "no_path";
    $dbpath_cor = "no_path";
    $dbpath_cog = "no_path";
    $dbpath_idc = "no_path";
    if ($idg != "none") {   $dbpath_idg = $loc_idg . '/' . $fileIDG;    }
    if ($cor != "none") {   $dbpath_cor = $loc_cor . '/' . $fileCOR;    }
    if ($cog != "none") {   $dbpath_cog = $loc_cog . '/' . $fileCOG;    }
    if ($idc != "none") {   $dbpath_idc = $loc_idc . '/' . $fileIDC;    }


    $datereg = date("Y-m-d G:i:s");
    $srl = date("YmdGis");

    $qval = "scholar_userid, scholar_title, scholar_serial, scholar_course, scholar_school, ";
    $qval .= "scholar_gradeyr, scholar_barangay, scholar_status, scholar_approved, scholar_dateadded";
    $query = "insert into tbl_scholar ($qval) ";
    $query .= "values ('$id','$tl','$srl','$el','$sc','$gy','$br','New','0','$datereg');";
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

    $scholarid = 0;
    $query = "select tbl_scholar.scholar_id from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    $query .= "where tbl_scholar.scholar_userid='$id' ";
    $query .= "order by tbl_scholar.scholar_id desc limit 1;";
    try {
        $stmt = $conn->prepare($query);
        $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative
  
        $stmt->execute();
        $rowctr = $stmt->fetchAll();  //echo count($rowctr);
        if (count($rowctr) < 1) {
          $data['success'] = false;
          $data['message'] = "Database Glitch!";
          $data['logs'] = "Database Suddenly Empty.";
          echo json_encode($data);
          $conn = null;
          die();
        }
  
        $stmt->execute();
        $row = $stmt->fetch();
        $scholarid = $row["scholar_id"];
  
    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! p2";
        $data['logs'] = "Database Exception - part2 " . $e->getMessage();;
        echo json_encode($data);
        $conn = null;
        die();
    }

    $filename = "none";
    if ($cor != "none") {   $filename = $info1["basename"];    }
    $qval = "cor_scholarid, cor_filename, cor_path, cor_filetype, cor_verified, cor_dateadded";
    $query = "insert into tbl_cor ($qval) ";
    $query .= "values ('$scholarid','$filename','$dbpath_cor','$ext1','0','$datereg');";
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

    $filename = "none";
    if ($cog != "none") {   $filename = $info2["basename"];    }
    $qval = "cog_scholarid, cog_filename, cog_path, cog_filetype, cog_verified, cog_dateadded";
    $query = "insert into tbl_cog ($qval) ";
    $query .= "values ('$scholarid','$filename','$dbpath_cog','$ext2','0','$datereg');";
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

    $filename = "none";
    if ($idg != "none") {   $filename = $info3["basename"];    }
    $qval = "idg_scholarid, idg_filename, idg_path, idg_filetype, idg_verified, idg_dateadded";
    $query = "insert into tbl_idg ($qval) ";
    $query .= "values ('$scholarid','$filename','$dbpath_idg','$ext3','0','$datereg');";
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

    $filename = "none";
    if ($idc != "none") {   $filename = $info4["basename"];    }
    $qval = "idc_scholarid, idc_filename, idc_path, idc_filetype, idc_verified, idc_dateadded";
    $query = "insert into tbl_idc ($qval) ";
    $query .= "values ('$scholarid','$filename','$dbpath_idc','$ext4','0','$datereg');";
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


    $data['success'] = "success";
    $data['message'] = "You have successfully created application $nm!";
    $data['logs'] = "Insert Query Successful.";
    echo json_encode($data);
    $conn = null;
?>