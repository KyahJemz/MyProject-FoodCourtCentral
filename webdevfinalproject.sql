-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 10:36 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdevfinalproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `AccountId` int(11) NOT NULL,
  `Firstname` varchar(50) NOT NULL,
  `Lastname` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `AuthToken` varchar(100) DEFAULT NULL,
  `StoreId` int(11) DEFAULT NULL,
  `JoinedDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `SuccessOrders` int(11) NOT NULL DEFAULT 0,
  `AccountPicture` varchar(255) NOT NULL DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`AccountId`, `Firstname`, `Lastname`, `Username`, `Password`, `Email`, `PhoneNumber`, `Address`, `AuthToken`, `StoreId`, `JoinedDate`, `SuccessOrders`, `AccountPicture`) VALUES
(1, 'Stephen regan James', 'Layson', 'KyahJemz', '$2y$10$.xr/UFVSPQ6UOxOnFko54uN6cM.tvDysoOfrR4.piXWYcucDlYCSG', 's.stpehen.layson@sscr.edu', '09168777580', 'Trece Martires City, Cavite', 'gGelJPNwTh', NULL, '2023-09-10 12:02:43', 0, 'PROFILE-1.jpg'),
(9, 'Admin1', 'Admin1', 'Admin1', '$2y$10$CLlXt7O8tcB6jB8RHqHR2O5nf9/Mu12cu103QKDOKpuUYXYgi62sG', NULL, NULL, NULL, 'k5OYcD2INK', 6, '2023-09-13 16:31:21', 0, 'default.jpg'),
(10, 'Admin2', 'Admin2', 'Admin2', '$2y$10$W5P5GqmaDiI0XFl7lZUAle2NGOZ./X50PAKapINCFtI3ltTPoeYpq', NULL, NULL, NULL, '529o8wZ6CP', 7, '2023-09-13 16:32:10', 0, 'default.jpg'),
(11, 'Admin3', 'Admin3', 'Admin3', '$2y$10$RvsFO.GLqHrk4w4XeOO3L.JhDZoOgdqkQIInjLAvGJlv0Zoow./ki', NULL, NULL, NULL, '0FMnu3pUIy', 8, '2023-09-13 16:32:34', 0, 'default.jpg'),
(12, 'Admin4', 'Admin4', 'Admin4', '$2y$10$7K9TVk2NZqtGcTD/4uF8kO6xhunC.iR.RuQwBW/P8a6h3lV1Tn3Da', NULL, NULL, NULL, 'vz3bVHZRJF', 9, '2023-09-13 16:33:13', 0, 'default.jpg'),
(13, 'Admin5', 'Admin5', 'Admin5', '$2y$10$CyX7JQksdqhXFGfjV6OCs.J0xTSrzkDA/K9SXk5ixzfiv/HtLmcwW', NULL, NULL, NULL, 'RmBod5Ycr3', 10, '2023-09-13 16:33:51', 0, 'default.jpg'),
(14, 'Admin6', 'Admin6', 'Admin6', '$2y$10$K3fG.UDg7CUr/w4T2Fq4Dueim2nGQotG4imy5hGPSvM3BgjXln7k.', NULL, NULL, NULL, 'srSy9iUh8P', 11, '2023-09-13 16:34:17', 0, 'default.jpg'),
(15, 'Admin7', 'Admin7', 'Admin7', '$2y$10$wE9G.ninHzJbztCx9WOsnOuw2lSBRGsob6sM.juESELuHyoMyBWLG', NULL, NULL, NULL, 'ijmdq9AIwv', 12, '2023-09-13 16:35:09', 0, 'default.jpg'),
(16, '1', '1', '1', '$2y$10$6apTD1WNURGxfArehH6M0.HYUq.JV5a1HMpnizj/rQ5bzPs6oR4Lu', NULL, NULL, NULL, '73eAuqwKNg', NULL, '2023-09-13 16:44:47', 0, 'default.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_items`
--

CREATE TABLE `tbl_items` (
  `ItemId` int(11) NOT NULL,
  `StoreId` int(11) NOT NULL,
  `ItemName` varchar(50) NOT NULL,
  `ItemCategory` varchar(50) NOT NULL,
  `ItemPrice` float NOT NULL,
  `ItemImage` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_items`
--

INSERT INTO `tbl_items` (`ItemId`, `StoreId`, `ItemName`, `ItemCategory`, `ItemPrice`, `ItemImage`) VALUES
(41, 6, 'Shakey\'s Special Pizza', 'Pizza', 399, 'ITEM-6-Shakey\'s Special Pizza-6501e9ad8630d.jpg'),
(42, 6, 'Classic Spaghetti ', 'Pasta', 189, 'ITEM-6-Classic Spaghetti -6501ea2f553a7.jpg'),
(43, 6, 'Chicken \'n\' Mojos ', 'Chicken', 369, 'ITEM-6-Chicken \'n\' Mojos -6501ea67c0853.jpg'),
(44, 6, 'Manager\'s Choice Pizza', 'Pizza', 429, 'ITEM-6-Manager\'s Choice Pizza-6501eac534074.jpg'),
(45, 6, 'Shakey\'s House Salad', 'Salad', 199, 'ITEM-6-Shakey\'s House Salad-6501eb14969b4.jpg'),
(46, 7, 'Hawaiian Supreme Pizza', 'Pizza', 479, 'ITEM-7-Hawaiian Supreme Pizza-6501eb7513a21.jpg'),
(47, 7, 'Spaghetti Bolognese', 'Pasta', 199, 'ITEM-7-Spaghetti Bolognese-6501eb90b7a0f.jpg'),
(48, 7, '8-Piece Garlic Parmesan Wings', 'Chicken', 319, 'ITEM-7-8-Piece Garlic Parmesan Wings-6501ebb615b87.jpg'),
(49, 8, 'McSpaghetti ', 'Pasta', 55, 'ITEM-8-McSpaghetti -6501ed360df4e.jpg'),
(50, 8, 'Chicken McDo', 'Chicken', 75, 'ITEM-8-Chicken McDo-6501ed50ded9d.jpg'),
(51, 8, 'Burger McDo', 'Burger', 55, 'ITEM-8-Burger McDo-6501ed71cb814.jpg'),
(52, 8, 'Cheeseburger Deluxe', 'Burger', 62, 'ITEM-8-Cheeseburger Deluxe-6501ed93b3ce7.jpg'),
(53, 8, 'Fries (Medium)', 'Sides', 60, 'ITEM-8-Fries (Medium)-6501edb2b3e48.jpg'),
(54, 9, 'Original Recipe Chicken ', 'Chicken', 95, 'ITEM-9-Original Recipe Chicken -650201711da18.jpg'),
(55, 9, 'Zinger Burger', 'Burger', 99, 'ITEM-9-Zinger Burger-6502018f2fdc8.jpg'),
(56, 9, 'Spaghetti ', 'Pasta', 89, 'ITEM-9-Spaghetti -650201d299fd0.jpg'),
(57, 9, 'Mashed Potato with Gravy', 'Sides', 35, 'ITEM-9-Mashed Potato with Gravy-650202011cf53.jpg'),
(58, 10, 'Jolly Spaghetti ', 'Pasta', 50, 'ITEM-10-Jolly Spaghetti -65020231a8f4d.jpg'),
(59, 10, 'Chickenjoy ', 'Chicken', 75, 'ITEM-10-Chickenjoy -6502026062f12.jpg'),
(60, 10, 'Burger Steak', 'Meal', 50, 'ITEM-10-Burger Steak-6502027d85af7.jpg'),
(61, 10, 'Yumburger ', 'Burger', 35, 'ITEM-10-Yumburger -6502029889e16.jpg'),
(62, 10, 'Jolly Hotdog', 'Hotdog', 50, 'ITEM-10-Jolly Hotdog-650202b433990.jpg'),
(63, 11, 'Hawaiian Overload Pizza', 'Pizza', 219, 'ITEM-11-Hawaiian Overload Pizza-650202f059882.jpg'),
(64, 11, 'Lasagna Supreme', 'Pasta', 79, 'ITEM-11-Lasagna Supreme-65020313dbd57.jpg'),
(65, 11, 'Greenwich Special Overload Pizza', 'Pizza', 219, 'ITEM-11-Greenwich Special Overload Pizza-650203324f491.jpg'),
(66, 11, 'Ultimate Overload Pizza', 'Pizza', 499, 'ITEM-11-Ultimate Overload Pizza-65020351074a7.jpg'),
(67, 11, 'Garlic Sticks', 'Sides', 59, 'ITEM-11-Garlic Sticks-6502036ed5d85.jpg'),
(68, 12, 'Chao Fan', 'Fried Rice', 65, 'ITEM-12-Chao Fan-650203bf16afd.jpg'),
(69, 12, 'Lauriat ', 'Meal', 120, 'ITEM-12-Lauriat -650203d6806aa.jpg'),
(70, 12, 'Siopao Asado ', 'Siopao', 35, 'ITEM-12-Siopao Asado -650203f03c572.jpg'),
(71, 12, 'Buchi ', 'Dessert', 28, 'ITEM-12-Buchi -6502040d3bcb5.jpg'),
(72, 12, 'Bopis ', 'Appetizer', 57, 'ITEM-12-Bopis -6502042c02d1f.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stores`
--

CREATE TABLE `tbl_stores` (
  `StoreId` int(11) NOT NULL,
  `AccountId` int(11) NOT NULL,
  `StoreName` varchar(50) NOT NULL,
  `StoreImage` varchar(255) NOT NULL,
  `StoreOrders` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stores`
--

INSERT INTO `tbl_stores` (`StoreId`, `AccountId`, `StoreName`, `StoreImage`, `StoreOrders`) VALUES
(6, 9, 'Shakey\'s', 'STORE-Shakey\'s.jpg', 0),
(7, 10, 'Pizza Hut', 'STORE-PizzaHut.jpg', 0),
(8, 11, 'Mcdonald\'s', 'STORE-Mcdonald\'s.jpg', 0),
(9, 12, 'KFC', 'STORE-KFC.jpg', 0),
(10, 13, 'Jollibee', 'STORE-Jollibee.jpg', 0),
(11, 14, 'Greenwich', 'STORE-Greenwich.jpg', 0),
(12, 15, 'Chowking', 'STORE-Chowking.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transactions`
--

CREATE TABLE `tbl_transactions` (
  `TransactionId` int(11) NOT NULL,
  `TransactionSeller` text NOT NULL,
  `TransactionBuyer` int(11) NOT NULL,
  `TransactionTimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `TransactionOrders` text NOT NULL,
  `TransactionStatus` varchar(50) DEFAULT NULL,
  `TransactionAmount` varchar(50) NOT NULL,
  `TransactionBuyerAddress` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`AccountId`);

--
-- Indexes for table `tbl_items`
--
ALTER TABLE `tbl_items`
  ADD PRIMARY KEY (`ItemId`);

--
-- Indexes for table `tbl_stores`
--
ALTER TABLE `tbl_stores`
  ADD PRIMARY KEY (`StoreId`);

--
-- Indexes for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  ADD PRIMARY KEY (`TransactionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `AccountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_items`
--
ALTER TABLE `tbl_items`
  MODIFY `ItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `tbl_stores`
--
ALTER TABLE `tbl_stores`
  MODIFY `StoreId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_transactions`
--
ALTER TABLE `tbl_transactions`
  MODIFY `TransactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
