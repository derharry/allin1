-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2024 at 06:21 PM
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
('1045ac10-3a14-43b8-af4c-d1fc09e9c8d9', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Café/Restaurant', '2024-05-19 16:19:02'),
('32d294dc-5e47-42b2-bcf7-7d1d009fdfef', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Café', '2024-05-19 16:19:31'),
('955c12f9-359b-4e68-bcdb-5a5a537deb2d', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Bar/Pub', '2024-05-19 16:19:44'),
('9ad7724c-b82f-4d25-b9fc-39706635d414', NULL, 'zit er niet bij', '2024-05-19 16:16:36'),
('b503e595-76f4-4376-9e85-d2e7bf54816d', '9ad7724c-b82f-4d25-b9fc-39706635d414', 'zit er niet bij', '2024-05-19 16:16:38'),
('d4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', NULL, 'Gastronomie', '2024-05-19 16:15:27'),
('e1cea94d-9339-4071-af0d-ecb17f67ee2d', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Catering', '2024-05-19 16:19:52'),
('ed0f5d97-1a65-4a4d-af1e-5395d466b67f', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Restaurant', '2024-05-19 16:19:38');

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
  `date_updated` datetime DEFAULT NULL,
  `category_wish` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gp_companies`
--

INSERT INTO `gp_companies` (`uuid`, `name`, `logo`, `urlwww`, `urlgoogle`, `phone`, `mobile`, `email`, `street`, `postalcode`, `city`, `country_id`, `tags`, `infotext`, `category_uuid`, `is_public`, `date_created`, `date_updated`, `category_wish`) VALUES
('ca7a23ee-2083-4ebc-8b4f-0063d900270e', 'Café Strozzi', '', '', '', '', '', '', '', '', '', '43', '', '', '1045ac10-3a14-43b8-af4c-d1fc09e9c8d9', 0, '2024-05-19 16:19:25', NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gp_categories`
--
ALTER TABLE `gp_categories`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `Unique_name_parent_uuid` (`parent_uuid`,`name`) USING BTREE;

--
-- Indexes for table `gp_companies`
--
ALTER TABLE `gp_companies`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `fk_category_uuid` (`category_uuid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gp_categories`
--
ALTER TABLE `gp_categories`
  ADD CONSTRAINT `fk_parent_uuid` FOREIGN KEY (`parent_uuid`) REFERENCES `gp_categories` (`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `gp_companies`
--
ALTER TABLE `gp_companies`
  ADD CONSTRAINT `fk_category_uuid` FOREIGN KEY (`category_uuid`) REFERENCES `gp_categories` (`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
