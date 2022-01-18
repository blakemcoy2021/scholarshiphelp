<?php

    include "../common/dbconfig.php";

    $errors = [];
    $data = array();

    $sid = "none";
    if (isset($_GET["sid"])) { $sid = $_GET["sid"]; }
    $failfieldctr = 0;
    if ($sid == "none") { $failfieldctr += 1; }
    if ($failfieldctr > 0) {
        $data['success'] = false;
        $data['message'] = "Invalid access!";
        $data['logs'] = "Invalid GET Attempt.";
        echo json_encode($data);
        die();
    }

    $emailaddr = "none";
    $scholarserial = "none";
    $fullname = "none";
    $qflds = "tbl_login.login_uname, tbl_scholar.scholar_serial, ";
    $qflds .= "tbl_user.user_firstname, tbl_user.user_lastname";
    $query = "select $qflds from tbl_scholar ";
    $query .= "inner join tbl_user on tbl_scholar.scholar_userid=tbl_user.user_id ";
    $query .= "inner join tbl_login on tbl_user.user_id=tbl_login.login_userid ";
    $query .= "where tbl_scholar.scholar_id='$sid' ";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare($query);

        $stmt->setFetchMode(PDO::FETCH_ASSOC); 

        $stmt->execute();
        $rowctr = $stmt->fetchAll();  //echo count($rowctr);
        if (count($rowctr) < 1) {
          $data['success'] = false;
          $data['message'] = "There is no email address found to send the claiming receipt.";
          $data['logs'] = "Database Suddenly Empty. p01";
          echo json_encode($data);
          $conn = null;
          die();
        }
  
        $stmt->execute();
        $row = $stmt->fetch();
        $emailaddr = $row["login_uname"];
        $scholarserial = $row["scholar_serial"];
        $fullname = "Mr./Ms. " . $row["user_firstname"] . " " . $row["user_lastname"];

        if (!filter_var($emailaddr, FILTER_VALIDATE_EMAIL)) {
            $data['success'] = false;
            $data['message'] = "Invalid Email Address to claim scholarship receipt. Ask admin to change it.";
            $data['logs'] = "Database Suddenly Empty. p02";
            echo json_encode($data);
            $conn = null;
            die();
        }

        $msg = "Here is your scholarship serial number: #$scholarserial. Print this page then present serial number here to the scholarship claiming office of Sta.Ana Municipal Building. You may see also this receipt again in your email @ $emailaddr. Thank you.";

        $message = '
            <!DOCTYPE html>
                <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title></title>
                <style>
                    table, td, div, h1, p {font-family: Arial, sans-serif;}
                </style>
                </head>
                <body style="margin:0;padding:0;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                    <tr>
                    <td align="center" style="padding:0;">
                        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                        <tr>
                            <td align="center" style="padding:0px;background:#70bbd9;">
                            <img src="http://45.77.42.41/images/headercover.jpg" alt="" style="height:auto;display:block;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:36px 30px 42px 30px;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                <td style="padding:0 0 36px 0;color:#153643;">
                                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Congratulations! You have received your scholarship.</h1>
                                    <p id="htmMsgAssessResult" style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">' . $msg . '</p>
                                    <!-- <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p> -->
                                </td>
                                </tr>
                                <!-- <tr>
                                <td style="padding:0;">
                                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                    <tr>
                                        <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                        <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/left.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, est nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>
                                        <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">Blandit ipsum volutpat sed</a></p>
                                        </td>
                                        <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                        <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                        <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="https://assets.codepen.io/210284/right.gif" alt="" width="260" style="height:auto;display:block;" /></p>
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Morbi porttitor, eget est accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed.</p>
                                        <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http://www.example.com" style="color:#ee4c50;text-decoration:underline;">In tempus felis blandit</a></p>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr> -->
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:30px;background:#ee4c50;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                <tr>
                                <td style="padding:0;width:50%;" align="left">
                                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                    &reg; Scholarhelp @ 2021<br/>
                                    <!-- <a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Unsubscribe</a> -->
                                    </p>
                                </td>
                                <!-- <td style="padding:0;width:50%;" align="right">
                                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                    <tr>
                                        <td style="padding:0 0 0 10px;width:38px;">
                                        <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                        </td>
                                        <td style="padding:0 0 0 10px;width:38px;">
                                        <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                        </td>
                                    </tr>
                                    </table>
                                </td> -->
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>
        ';

        $subject = "Congratulations! Here is your scholarship receipt!";
        $headers = array(
            'Authorization: Bearer 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',
            'Content-Type: application/json'
        );
        $sendgrid_data = array(
            "personalizations" => array(
                array(
                    "to" => array(
                        array(
                            "email" => $emailaddr,
                            "name" => $fullname
                        )
                    )
                )
            ),
            "from" => array(
                "email" => "jejedethdeth312@gmail.com"
            ),
            "subject" => $subject,
            "content" => array(
                array(
                    "type" => "text/html",
                    "value" => $message
                )
            )
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.sendgrid.com/v3/mail/send");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sendgrid_data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);


        $query = "update tbl_scholar ";
        $query .= "set scholar_status='done'";
        $query .= "where scholar_id='$sid' ";
        $stmt = $conn->prepare($query);
        $stmt->execute();

    } catch(PDOException $e) {  //echo "Error: " . $e->getMessage();
        $data['success'] = false;
        $data['message'] = "Server Error! dbdone";
        $data['logs'] = "Database Exception - " . $e->getMessage();;
    }

    $data['success'] = "$msg";
    $data['message'] = "Successfully claimed scholarship!";
    $data['logs'] = "Update Query Successful.";
    echo json_encode($data);
    $conn = null;
?>