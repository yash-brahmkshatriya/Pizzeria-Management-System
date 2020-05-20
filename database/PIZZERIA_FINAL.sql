-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2020 at 03:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sampledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `emailid`, `pwd`) VALUES
(1, 'admin', 'admin@admin.com', 'admin'),
(2, 'Admin2', 'admin2@admin.com', 'admin'),
(4, 'New Admin', 'newadmin1@admin.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `order_id` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `amt` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`order_id`, `cid`, `amt`) VALUES
(1, 3, 255),
(2, 3, 420),
(3, 3, 285),
(4, 3, 205),
(5, 3, 595),
(6, 3, 700),
(7, 1, 95),
(8, 1, 180),
(9, 1, 95),
(10, 2, 245),
(11, 3, 110),
(12, 3, 180),
(13, 3, 135);

-- --------------------------------------------------------

--
-- Table structure for table `cashier`
--

CREATE TABLE `cashier` (
  `cid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cashier`
--

INSERT INTO `cashier` (`cid`, `name`) VALUES
(1, 'RamuKaka'),
(2, 'Shyamu kaka'),
(3, 'Coupan Kaka');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL COMMENT 'customer id',
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `phoneno` varchar(10) NOT NULL,
  `email_id` varchar(50) NOT NULL,
  `pwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `fname`, `lname`, `phoneno`, `email_id`, `pwd`) VALUES
(6, 'rachael ', 'green', '69', 'r@g.com', '69'),
(10, 'Yash', 'Brahmkshatriya', '1234567890', 'y@b.com', 'yash'),
(12, 'Ross', 'Geller', '9876543210', 'ross@geller.com', '69'),
(13, 'Dilip', 'Khatri', '8521478963', 'id@id.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `item_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`item_id`, `name`, `price`, `category`) VALUES
(1, 'margherita', 40, 'pizza'),
(3, 'Coke', 5, 'Cold Drinks'),
(4, 'Garlic Bread', 30, 'starters'),
(8, 'FarmHouse', 30, 'pizza');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `order_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `cust_id`, `order_date`) VALUES
(1, 6, '0000-00-00'),
(2, 10, '2020-04-23'),
(3, 6, '2020-04-23'),
(4, 6, '2020-04-24'),
(5, 6, '2020-04-24'),
(6, 10, '2020-04-24'),
(7, 10, '2020-04-24'),
(8, 10, '2020-04-24'),
(9, 10, '2020-04-24'),
(10, 10, '2020-04-24'),
(11, 12, '2020-04-24'),
(12, 13, '2020-04-25'),
(13, 13, '2020-04-25');

-- --------------------------------------------------------

--
-- Table structure for table `sold_items`
--

CREATE TABLE `sold_items` (
  `order_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `sold_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sold_items`
--

INSERT INTO `sold_items` (`order_id`, `item_id`, `qty`, `sold_at`) VALUES
(1, 1, 2, 40),
(1, 3, 5, 5),
(1, 4, 3, 50),
(2, 1, 3, 40),
(2, 3, 10, 5),
(2, 4, 5, 50),
(3, 1, 3, 40),
(3, 3, 3, 5),
(3, 4, 3, 50),
(4, 1, 3, 40),
(4, 3, 7, 5),
(4, 4, 1, 50),
(5, 1, 8, 40),
(5, 3, 5, 5),
(5, 4, 5, 50),
(6, 1, 5, 40),
(6, 3, 50, 5),
(6, 4, 5, 50),
(7, 1, 1, 40),
(7, 3, 1, 5),
(7, 4, 1, 50),
(8, 1, 3, 40),
(8, 3, 2, 5),
(8, 4, 1, 50),
(9, 1, 1, 40),
(9, 3, 1, 5),
(9, 4, 1, 50),
(10, 1, 3, 40),
(10, 3, 5, 5),
(10, 4, 2, 50),
(11, 1, 1, 40),
(11, 3, 2, 5),
(11, 4, 2, 30),
(12, 1, 2, 40),
(12, 3, 2, 5),
(12, 4, 3, 30),
(13, 3, 3, 5),
(13, 8, 4, 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `emailid` (`emailid`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD KEY `orders_fk` (`order_id`),
  ADD KEY `cashier_fk` (`cid`);

--
-- Indexes for table `cashier`
--
ALTER TABLE `cashier`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `phoneno` (`phoneno`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cust_fk` (`cust_id`);

--
-- Indexes for table `sold_items`
--
ALTER TABLE `sold_items`
  ADD KEY `order_fk` (`order_id`),
  ADD KEY `menu_fk` (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cashier`
--
ALTER TABLE `cashier`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'customer id', AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `cashier_fk` FOREIGN KEY (`cid`) REFERENCES `cashier` (`cid`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `cust_fk` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`) ON DELETE CASCADE;

--
-- Constraints for table `sold_items`
--
ALTER TABLE `sold_items`
  ADD CONSTRAINT `menu_fk` FOREIGN KEY (`item_id`) REFERENCES `menu` (`item_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
