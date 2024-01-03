<?php 
    include './php/database-config.php';
    include './php/functions.php';
    include './php/auth-0.php';

    if (isset($_POST['kainan-sign-in'])) {
        validateSignIn($connection);
    } else if (isset($_POST['kainan-sign-up'])){
        validateSignUp($connection);
    } 

    function validateSignIn ($connection){
        $username = sanitizeQuery(sanitize($_POST['kainan-username']),$connection);
        $password = sanitizeQuery(sanitize($_POST['kainan-password']),$connection);

        $sql = "SELECT * FROM tbl_accounts WHERE Username = '".$username."'";        
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $rows = $result->fetch_assoc();
            $storedPasswordHash = $rows['Password'];
            
            if (password_verify(trim($password), trim($storedPasswordHash))) {
                $_SESSION['SIerror'] = "<p class='success'>Success, Welcome user!</p>";
                
                generateAuthToken($username,$connection);
                Login(is_null($rows['StoreId']),$rows['AccountId'],$connection);

                $connection->close();
                header('Location: ./pages/page.php');
                exit;
            } else {
                $_SESSION['SIerror'] = "<p class='danger'>Failed, wrong password!</p>";
                $connection->close();
                return null;
            }
        } else {
            $_SESSION['SIerror'] = "<p class='danger'>Failed, invalid account!</p>";
            $connection->close();
            return null;
        }
    }
    function validateSignUp ($connection){
        $firstname = sanitizeQuery(sanitize($_POST['kainan-firstname']),$connection);
        $lastname = sanitizeQuery(sanitize($_POST['kainan-lastname']),$connection);
        $username = sanitizeQuery(sanitize($_POST['kainan-username']),$connection);
        $password = sanitizeQuery(sanitize($_POST['kainan-password']),$connection);
        $confirmpassword = sanitizeQuery(sanitize($_POST['kainan-confirm-password']),$connection);

        if (empty($firstname) || empty($lastname) || empty($username) || empty($password) || empty($confirmpassword)) {
            $_SESSION['SUerror'] = "<p class='danger'>Failed, No empty fields!</p>";
            return null;
        } else {
            if ($password != $confirmpassword) {
                $_SESSION['SUerror'] = "<p class='danger'>Failed, password does not match!</p>";
                return null;
            } else {
                $sql = "SELECT Username FROM tbl_accounts WHERE Username = '".$username."'";
                $result = $connection->query($sql);
                if ($result->num_rows > 0) {
                    $_SESSION['SUerror'] = "<p class='danger'>Failed, username already taken!</p>";
                    $connection->close();
                    return null;
                } else {
                    $password = password_hash($password, PASSWORD_DEFAULT);
                    $sql = "INSERT INTO tbl_accounts (Firstname, Lastname, Username, Password) VALUES ('$firstname', '$lastname', '$username', '$password')";
                    if ($connection->query($sql) === TRUE) {
                        $_SESSION['SUerror'] = "<p class='success'>Success, please sign in!</p>";
                        $connection->close();
                        return null;
                    } else {
                        $_SESSION['SUerror'] = "<p class='danger'>Failed, server error!</p>";
                        $connection->close();
                        return null;
                    }
                }
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./images/icon.png">
    <title>Food Court Central - The latgest undeground collections</title>

    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/index.css">

</head>
<body>
    <div class="login-container">
        <div class="container-background">
            <div id="sign-in-form-button" class="right-panel" style="visibility: hidden;">
                <p>Already have an account?</p>
                <button>Sign In</button>
            </div>
            <div id="sign-up-form-button" class="left-panel" style="visibility: visible">
                <p>Do you dont have an account?</p>
                <button>Sign Up</button>
            </div>
        </div>
        <div class="container-panel move-left">
            <form class="sign-in-container" action="" method="POST">

                <img class="logo-img" src="./images/icon.png" width="50px" height="50px">
                <h1>Sign in Form</h1>
                <div id="sign-in-result" style="display: <?php if (!empty($_SESSION['SIerror'])) {echo 'block';} else {echo 'hidden';} ?>;">
                    <?php if (!empty($_SESSION['SIerror'])) {echo $_SESSION['SIerror'];} ?>
                </div>
                <label for="kainan-username">Username:</label>
                <input class="inputtext" type="text" name="kainan-username">
                <label for="kainan-password">Password:</label>
                <input class="inputtext" type="password" name="kainan-password">
                <input class="inputbutton" type="submit" name="kainan-sign-in" value="Submit">
            </form>
    
            <form class="sign-up-container sign-up-container-hidden" action="" method="POST">
                <h1>Sign up Form</h1>
                <div id="sign-up-result" style="display: <?php if (!empty($_SESSION['SUerror'])) {echo 'block';} else {echo 'hidden';} ?>;">
                    <?php if (!empty($_SESSION['SUerror'])) {echo $_SESSION['SUerror'];} ?>
                </div>
                <label for="kainan-firstname">Firstname:</label>
                <input class="inputtext" type="text" name="kainan-firstname">
                <label for="kainan-lastname">Lastname:</label>
                <input class="inputtext" type="text" name="kainan-lastname">
                <label for="kainan-username">Username:</label>
                <input class="inputtext" type="text" name="kainan-username">
                <label for="kainan-password">Password:</label>
                <input class="inputtext" type="password" name="kainan-password">
                <label for="kainan-confirm-password">Confirm Password:</label>
                <input class="inputtext" type="password" name="kainan-confirm-password">
                <input class="inputbutton" type="submit" name="kainan-sign-up" value="Submit">
            </form>
            
        </div>
    </div>

    <script src="./scripts/index.js"></script>

    <?php
        if (!empty($_SESSION['SUerror'])) {
            echo '<script>';
            echo 'ChangePanel("sign-up");';
            echo '</script>';
        }

        $_SESSION['SUerror'] = null;
        $_SESSION['SIerror'] = null;
    ?>

</body>
</html>































