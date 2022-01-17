<?php

    include "../common/dbconfig.php";

    session_start();

            // $s_uid = $_SESSION["user_role"];
            // $s_role = $_SESSION["user_name"];
            // $s_name = $_SESSION["user_id"];
            // echo "$s_uid $s_role $s_name";

    if (isset($_SESSION["user_role"]) == "" || 
        isset($_SESSION["user_name"]) == "" ||
        isset($_SESSION["user_id"]) == "") {

            echo "exit";

    } else {
        
        echo "session_active";

    }

?>