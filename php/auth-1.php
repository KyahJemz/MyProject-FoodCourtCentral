<?php 

    session_start();

    if (isset($_POST['Logout'])){
        Logout();
    }

    if (isset($_SESSION['AccountId']) && isset($_SESSION['AuthToken'])) {
        $result = validateUserSession($_SESSION['AccountId'],$_SESSION['AuthToken'],$connection);
        if ($result[0]){

            echo '<script>';
            echo '  var Username = "' . $result[1]['Username'] . '";';
            echo '  var AuthToken = "' . $result[1]['AuthToken'] . '";';
            echo '  var AccountId = "' . $result[1]['AccountId'] . '";';
            echo '  var StoreId = "' . $result[1]['StoreId'] . '";';
            echo '  var Firstname = "' . $result[1]['Firstname'] . '";';
            echo '  var Lastname = "' . $result[1]['Lastname'] . '";';
            echo '  var Email = "' . $result[1]['Email'] . '";';
            echo '  var Address = "' . $result[1]['Address'] . '";';
            echo '  var PhoneNumber = "' . $result[1]['PhoneNumber'] . '";';
            echo '</script>';
        } else {
            Logout();
        }
    } else {
        Logout();
    }

