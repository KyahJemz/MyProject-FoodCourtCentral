<?php 

    session_start();

    if (isset($_SESSION['AccountId']) && isset($_SESSION['AuthToken'])) {
        if (validateUserSession($_SESSION['AccountId'],$_SESSION['AuthToken'],$connection)){
            header('Location: ./pages/page.php');
            exit;
        } else {
            $_SESSION['AccountId'] = null;
            $_SESSION['AuthToken'] = null;
        }
    }





