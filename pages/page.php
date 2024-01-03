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
    
    <link rel="stylesheet" href="../styles/page.css">
    <link rel="stylesheet" href="../styles/style.css">
</head>
<body>
    <?php include './header.php' ?>
    <div class="content">

        <div id="home" class="banner">
            <div class="banner-title">Welcome to Food Court Central</div>
            <div class="banner-subtitle">The best food in town, all in one place.</div>
        </div>

        <div id="about" class="about">
            <div class="about-title">About us</div>
            <div class="about-subtitle">
                Food Court Central is a one-stop shop for all your dining needs. With a wide variety of cuisines to choose from, you're sure to find something to your taste, we have you covered. We also have a great selection of desserts and drinks, so you can end your meal on a sweet note.
                <br><br>
                We're also committed to providing our customers with the best possible service. Our staff is friendly and attentive, and they're always happy to help you find what you're looking for.
                <br><br>
                So what are you waiting for? Come on down to Food Court Central today and experience the best food in town, all in one place!
            </div>
        
        </div>

        <div class="suggested">
            <div class="suggested-row suggested-items">
                <div class="title">Suggested Items</div>
                <div id="suggested-items-container" class="card-container">
                    <!-- ITEMS --><!-- ITEMS --><!-- ITEMS -->
                </div>
            </div>
            <div class="suggested-row suggested-stores">
                <div class="title">Suggested Stores</div>
                <div id="suggested-stores-container" class="card-container">
                    <!-- STORES --><!-- STORES --><!-- STORES -->
                </div>
            </div>
        </div>

        <div class="footer">
            <p>&copy; Food Court Central - The latgest undeground collections</p> 
        </div>

    </div>

    <script type="module" src="../scripts/page.js"></script>
</body>

</html>