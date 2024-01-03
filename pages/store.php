<?php 
    include '../php/database-config.php';
    include '../php/functions.php';
    include '../php/auth-1.php';
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="../images/icon.png">
    <title>Food Court Central - The latgest undeground collections</title>

    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/store.css">
</head>
<body>
    <?php require './header.php' ?> 
    <div class="container">
        <div class="stores-grid-container">
            <p class="stores-title title">Stores</p>
            <div class="scroll-container">
                <div class="grid-container">
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../scripts/store.js"></script>
</body>
</html>

