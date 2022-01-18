<?php

    include "../common/dbconfig.php";

    $fldrname = "zscholarhelp";


    $sid = "none";
    $clas = "none";

    $ph = "none";

    $errors = [];
    $data = [];

    if (isset($_POST["sid"]))       {   $sid = $_POST["sid"];        }
    if (isset($_POST["clas"]))      {   $clas = $_POST["clas"];      }
    if (isset($_FILES["fil"]))     {   $ph = $_FILES["fil"];     }


    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($clas == "none") { $failfieldctr += 1; }
    if ($ph == "none") { $failfieldctr += 1; }

    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }

        //** select user table via driver id and get photo path name instead generating new one */
        $isUpdate = false;
        $dateadd = "none";
        $fltype = "none";
    $dbpath_ph = "no_path";
    
        $fldr = "cor";
        $qfld1 = "cor_path";
        $qfld2 = "cor_dateadded";
        $qfld3 = "cor_filetype";
        $qstbl = "$qfld1,$qfld2,$qfld3 from tbl_cor where cor_scholarid='$sid' order by cor_id";

        if ($clas == "cog") {
            $fldr = "cog";
            $qfld1 = "cog_path";
            $qfld2 = "cog_dateadded";
            $qfld3 = "cog_filetype";
            $qstbl = "$qfld1,$qfld2,$qfld3 from tbl_cog where cog_scholarid='$sid' order by cog_id";

        } else if ($clas == "idg") {
            $fldr = "idg";
            $qfld1 = "idg_path";
            $qfld2 = "idg_dateadded";
            $qfld3 = "idg_filetype";
            $qstbl = "$qfld1,$qfld2,$qfld3 from tbl_idg where idg_scholarid='$sid' order by idg_id";

        } else if ($clas == "idc") {
            $fldr = "idc";
            $qfld1 = "idc_path";
            $qfld2 = "idc_dateadded";
            $qfld3 = "idc_filetype";
            $qstbl = "$qfld1,$qfld2,$qfld3 from tbl_idc where idc_scholarid='$sid' order by idc_id";

        } else if ($clas == "bio") {
            $fldr = "bio";
            $qfld1 = "bio_path";
            $qfld2 = "bio_dateadded";
            $qfld3 = "bio_filetype";
            $qstbl = "$qfld1,$qfld2,$qfld3 from tbl_bio where bio_scholarid='$sid' order by bio_id";

        }

        $query = "select $qstbl ";
        $query .= "desc limit 1";
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare($query);
            $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

            $isZero = 0;
            $stmt->execute();
            $row = $stmt->fetchAll();  
            if (count($row) != 0) {
                $isZero = 1;
            }

            $stmt->execute();
            $row = $stmt->fetch();
            $dbpath_ph = $row[$qfld1];
            if ($isZero > 0) {
                $fltype = $row[$qfld3];
                $date = date_create($row[$qfld2]);
                $dateadd = date_format($date, "YmdGis");
                $isUpdate = true;
            } else {
                $dateadd = date("YmdGis");
            }

        } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
            $data['success'] = false;
            $data['message'] = "Server Error! dbreq";
            $data['logs'] = "Database Exception - " . $e->getMessage();
            echo json_encode($data);
        }

        // pre-file path
        $info = pathinfo($ph["name"]);
        $ext = $info['extension'];

        if ($ext != "pdf") {    //** validate photo if photo and size */
            $photomime;
            $checkphoto = getimagesize($ph["tmp_name"]);
            if ($checkphoto === false) {
                $data['success'] = false;
                $data['message'] = "File has unreliable meta. Resize or edit it, size less than 20MB to be valid!";
                $data['logs'] = "Not valid photo.";
                echo json_encode($data);
                die();
            } else {
                $photomime = $checkphoto["mime"];
            }
            if ($ph["size"] > 21000000) {
                $data['success'] = false;
                $data['message'] = "File is to large! Less than 20MB is required.";
                $data['logs'] = "Uploading Photo is more than 20MB.";
                echo json_encode($data);
                die();
            }
        }

        //** if photo path for the driver exist (get the existing) or not (create something) */
        $loc_photo;
        $fileph;
        if ($dbpath_ph != "no_path" && $dbpath_ph != "no_img") { //** exist */
            if ($fltype == $ext) {
                $loc_photo = dirname($dbpath_ph);
                $fileph = basename($dbpath_ph);
            } else {
                $s = ucfirst($info['basename']);
                $bar = ucwords(strtolower($s));
                $trim_name = preg_replace('/\s+|[._-]/','',$bar);
                
                $loc_photo = "data/$fldr/$ext"."s/$trim_name$dateadd";
                $fileph = "$trim_name$dateadd.$ext";
            }
        }
        if ($dbpath_ph == "no_path" || $dbpath_ph == "no_img") {                                      //** none */
            $s = ucfirst($info['basename']);
            $bar = ucwords(strtolower($s));
            $trim_name = preg_replace('/\s+|[._-]/','',$bar);
            
            $loc_photo = "data/$fldr/$ext"."s/$trim_name$dateadd";
            $fileph = "$trim_name$dateadd.$ext";
        }
        
                        // $data['success'] = false;
                        // $data['message'] = "$clas $fldr $loc_photo";
                        // $data['logs'] = "Test Test Test";
                        // echo json_encode($data);
                        // die();
        
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
            $data['message'] = "Server Path Error! Not Writable";
            $data['logs'] = "Path not writable.";
            echo json_encode($data);
            die();
        }
        if ($createDirectory) {
            mkdir($upload_urlph, 0777, true);
        }

        if ($ph != "none") {

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
    


    if ($isUpdate == false) {
        $path = $dbpath_ph;
        $qstbl = "tbl_cor (cor_scholarid, cor_filename, cor_path, cor_filetype, cor_verified, cor_seen) ";
        if ($clas == "cog") {
            $qstbl = "tbl_cog (cog_scholarid, cog_filename, cog_path, cog_filetype, cog_verified, cog_seen) ";
        } else if ($clas == "idg") {
            $qstbl = "tbl_idg (idg_scholarid, idg_filename, idg_path, idg_filetype, idg_verified, idg_seen) ";
        } else if ($clas == "idc") {
            $qstbl = "tbl_idc (idc_scholarid, idc_filename, idc_path, idc_filetype, idc_verified, idc_seen) ";
        } else if ($clas == "bio") {
            $qstbl = "tbl_bio (bio_scholarid, bio_filename, bio_path, bio_filetype, bio_verified, bio_seen) ";
        }

        $query = "insert into $qstbl ";
        $query .= "values ('$sid','$fileph','$dbpath_ph','$ext','0','0');";
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

        $data['success'] = "$dbpath_ph";
        $data['message'] = "Successfully uploaded application document!";
        $data['logs'] = "Insert Query Successful.";
        echo json_encode($data);
        $conn = null;
        die();
    }

    $dateupd = date("Y-m-d G:i:s");
    $qstbl = "tbl_cor";
    $qval = "cor_filename='$fileph', cor_path='$dbpath_ph', cor_filetype='$ext', cor_lastupdate='$dateupd', cor_verified='0', cor_seen='0'";
    $qwhr = "cor_scholarid='$sid'";
    if ($clas == "cog") {
        $qstbl = "tbl_cog";
        $qval = "cog_filename='$fileph', cog_path='$dbpath_ph', cog_filetype='$ext', cog_lastupdate='$dateupd', cog_verified='0', cog_seen='0'";
        $qwhr = "cog_scholarid='$sid'";

    } else if ($clas == "idg") {
        $qstbl = "tbl_idg";
        $qval = "idg_filename='$fileph', idg_path='$dbpath_ph', idg_filetype='$ext', idg_lastupdate='$dateupd', idg_verified='0', idg_seen='0'";
        $qwhr = "idg_scholarid='$sid'";

    } else if ($clas == "idc") {
        $qstbl = "tbl_idc";
        $qval = "idc_filename='$fileph', idc_path='$dbpath_ph', idc_filetype='$ext', idc_lastupdate='$dateupd', idc_verified='0', idc_seen='0'";
        $qwhr = "idc_scholarid='$sid'";

    } else if ($clas == "bio") {
        $qstbl = "tbl_bio";
        $qval = "bio_filename='$fileph', bio_path='$dbpath_ph', bio_filetype='$ext', bio_lastupdate='$dateupd', bio_verified='0', bio_seen='0'";
        $qwhr = "bio_scholarid='$sid'";

    }

    $query = "update $qstbl ";
    $query .= "set $qval ";
    $query .= "where $qwhr;";
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

    $data['success'] = "$dbpath_ph";
    $data['message'] = "Successfully updated application document!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>