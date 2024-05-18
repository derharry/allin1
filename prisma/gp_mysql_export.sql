-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2024 at 10:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `allin1`
--

-- --------------------------------------------------------

--
-- Table structure for table `gp_categories`
--

CREATE TABLE `gp_categories` (
  `uuid` varchar(36) NOT NULL,
  `parent_uuid` varchar(36) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gp_categories`
--

INSERT INTO `gp_categories` (`uuid`, `parent_uuid`, `name`, `date_created`) VALUES
('33d7ee21-1552-11ef-a477-1063c8694ebe', NULL, 'test', '2024-05-18 22:07:07'),
('4aadb4bf-1552-11ef-a477-1063c8694ebe', '33d7ee21-1552-11ef-a477-1063c8694ebe', 'test2', '2024-05-18 22:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `gp_companies`
--

CREATE TABLE `gp_companies` (
  `uuid` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `logo` varchar(300) DEFAULT NULL,
  `urlwww` varchar(300) DEFAULT NULL,
  `urlgoogle` varchar(300) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `street` varchar(50) DEFAULT NULL,
  `postalcode` varchar(10) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `country_id` varchar(30) DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `infotext` text DEFAULT NULL,
  `category_uuid` varchar(36) NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gp_companies`
--

INSERT INTO `gp_companies` (`uuid`, `name`, `logo`, `urlwww`, `urlgoogle`, `phone`, `mobile`, `email`, `street`, `postalcode`, `city`, `country_id`, `tags`, `infotext`, `category_uuid`, `is_public`, `date_created`, `date_updated`) VALUES
('ac4bb848-1552-11ef-a477-1063c8694ebe', 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4aadb4bf-1552-11ef-a477-1063c8694ebe', 0, '2024-05-18 22:10:29', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gp_categories`
--
ALTER TABLE `gp_categories`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `Unique_name_and_parentUuid` (`parent_uuid`,`name`),
  ADD KEY `Index_parent_uuid` (`parent_uuid`);

--
-- Indexes for table `gp_companies`
--
ALTER TABLE `gp_companies`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `Index_category_uuid` (`category_uuid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gp_categories`
--
ALTER TABLE `gp_categories`
  ADD CONSTRAINT `gp_categories_ibfk_1` FOREIGN KEY (`parent_uuid`) REFERENCES `gp_categories` (`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `gp_companies`
--
ALTER TABLE `gp_companies`
  ADD CONSTRAINT `gp_companies_ibfk_1` FOREIGN KEY (`category_uuid`) REFERENCES `gp_categories` (`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
