<?php

    include "../common/dbconfig.php";

    $u = "none";
    $p = "none";

    $errors = [];
    $data = [];

    if (isset($_POST["uname"])) {
        $u = $_POST["uname"];
    }
    if (isset($_POST["passw"])) {
        $p = $_POST["passw"];
    }

    if ($u == "none" || $p == "none") {
        $data['success'] = false;
        $data['message'] = "Access Failure!";
        $data['logs'] = "Invalid POST Attempt.";
        echo json_encode($data);
        die();
    }
    
    $login_uname = "tbl_login.login_uname";
    $login_password = "tbl_login.login_password";
    $login_id = "tbl_login.login_id";

    $user_role = "tbl_user.user_role";
    $user_fname = "tbl_user.user_firstname, tbl_user.user_lastname";

    $query = "select $login_id, $user_role, $user_fname from tbl_user ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "where $login_uname='$u' and $login_password='$p'";

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $stmt = $conn->prepare($query);
      $stmt->setFetchMode(PDO::FETCH_ASSOC); // set the resulting array to associative

      $stmt->execute();
      $rowctr = $stmt->fetchAll();  //echo count($rowctr);

      if (count($rowctr) < 1) {
        $data['success'] = false;
        $data['message'] = "Wrong Username/Password!";
        $data['logs'] = "Username/Password Not Found.";
        echo json_encode($data);
        $conn = null;
        die();
      }

        $stmt->execute();
        $row = $stmt->fetch();        //echo $row["user_role"]; //superadmin

        $role = $row["user_role"];
        $uid = $row["login_id"];
        $fname = $row["user_firstname"] . " " . $row["user_lastname"];
        session_start();
        $_SESSION["user_role"] = $role;
        $_SESSION["user_name"] = $u;
        $_SESSION["user_id"] = $uid;

        $u = str_replace(",", "-", $u);
        $u = str_replace(" ", "_", $u);
        $data['success'] = $role . "," . $uid . "," . $fname;
        $data['message'] = "Welcome! " . $fname;
        $data['logs'] = "Username/Password Found.";
        echo json_encode($data);

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error!";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
        echo json_encode($data);
    }
    $conn = null;

?>