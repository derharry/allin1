-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 12:46 AM
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
  `slug` varchar(50) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gp_categories`
--

INSERT INTO `gp_categories` (`uuid`, `parent_uuid`, `name`, `slug`, `date_created`) VALUES
('1045ac10-3a14-43b8-af4c-d1fc09e9c8d9', 'd4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', 'Café/Restaurant', 'caferestaurant', '2024-05-19 16:19:02'),
('1a2a42c5-9b27-41a0-8c26-42ef031bc1f5', '34d1c2eb-dad4-4767-95ff-95023743c2a6', 'Advocaten', 'advocaten', '2024-05-19 22:28:36'),
('34d1c2eb-dad4-4767-95ff-95023743c2a6', NULL, 'Diensten', 'diensten', '2024-05-19 22:28:26'),
('52384b43-d73a-4410-a73d-c0a45fb08352', '7a1826eb-b1e8-477b-8527-bb3afba08810', 'FysioTherapeuten', 'fysiotherapeuten', '2024-05-19 22:30:04'),
('7a1826eb-b1e8-477b-8527-bb3afba08810', NULL, 'Verzorging', 'verzorging', '2024-05-19 22:29:35'),
('94d4b34f-6efd-4888-ba67-8be30a028090', '34d1c2eb-dad4-4767-95ff-95023743c2a6', 'Ambessade', 'ambessade', '2024-05-19 22:30:31'),
('a043c0e5-9f9e-4c11-bdca-58948b6c0d98', NULL, 'Onderwijs', 'onderwijs', '2024-05-19 22:00:21'),
('ad11e516-c6ff-4d60-8699-a3393469098c', 'a043c0e5-9f9e-4c11-bdca-58948b6c0d98', 'Engels', 'engels', '2024-05-19 22:24:00'),
('cfaaddf0-31db-45f2-b8ae-34ea3f79f48f', '7a1826eb-b1e8-477b-8527-bb3afba08810', 'Kappers', 'kappers', '2024-05-19 22:29:41'),
('d4d9a0f7-0307-4eae-83b7-5f4bb8b4490a', NULL, 'Gastronomie', 'gastronomie', '2024-05-19 16:15:27'),
('df0bcad3-3a1e-4848-a8ee-c4590fcccc7a', 'a043c0e5-9f9e-4c11-bdca-58948b6c0d98', 'Nederlands', 'nederlands', '2024-05-19 22:00:33');

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
('4115185b-a2f6-4592-b0e6-df2902ab0b08', 'Nederlandse School Steiermark  (Oeversee Bundesgym', 'https://www.nederlandseschool.at/wp-content/uploads/2018/06/cropped-Logo-small-transparent-white-edge-1.png', 'https://www.nederlandseschool.at/informatie/onderwijs/', '', '', '+43 / (0)6609262151', 'info@nederlandseschool.at', 'Oeverseegasse 28 ', '8020', 'Graz', '43', '', 'Nederlands taal- en cultuuronderwijs in de Steiermark, Oostenrijk', 'df0bcad3-3a1e-4848-a8ee-c4590fcccc7a', 1, '2024-05-19 22:15:25', NULL, ''),
('4cc561e8-e254-415e-88fe-faa9ad753a40', 'Mag. Evert Vastenburg – Rechtsanwalt / advocaat', 'https://images.squarespace-cdn.com/content/v1/608c1c60d925764fb961f15d/1620299326266-5AJVIUMSTZQZV4S7NYC4/logo-3.png?format=200w', 'https://www.vastenburg.at', '', '', '+43 680 4446590', 'office@vastenburg.at', 'Lederergasse 16/3', '1080 ', 'Wenen', '43', '', 'Competente en persoonlijke begeleiding in het Oostenrijkse civiel en strafrecht – opdat u begrijpt waar het om draait.\r\n<br><br>\r\nMijn specialiteit: als oorspronkelijk Nederlands jurist bied ik mijn diensten in het Nederlands aan. Uiteraard is mijn ondersteuning eveneens in het Engels en Duits mogelijk.\r\n\r\n', '1a2a42c5-9b27-41a0-8c26-42ef031bc1f5', 1, '2024-05-19 22:40:48', NULL, ''),
('52cea2a0-6f38-460d-b420-bcecdb67c74b', 'Nederlandse Taal- en Cultuurlessen (NTC) in Wenen', 'https://ntcdeprater.com/wp-content/uploads/2023/01/small-cropped-ntc_dp_png.png', 'https://ntcdeprater.com', '', '', '', 'ntcdeprater@outlook.com', '', '', 'Wenen', '43', 'les nederlands school vlaams bijles', 'Onze school geeft sinds 1996 Nederlandse Taal- en Cultuurlessen (NTC) aan Nederlandse en Vlaamse kinderen in en rondom Wenen.\r\n<br><br>\r\nNTC de Prater is aangesloten bij de Stichting Nederlands Onderwijs Buitenland (NOB) en wordt gecontroleerd door de Nederlandse Inspectie van het Onderwijs.', 'df0bcad3-3a1e-4848-a8ee-c4590fcccc7a', 1, '2024-05-19 22:12:09', NULL, ''),
('5c496251-7342-4158-b57c-b4c8410aef44', 'Café Strozzi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRzMRoi1m99uwY-IPBVg0wEANnXzbjsvHhoA&s', 'http://www.strozzi.at', 'https://g.co/kgs/RLNPsZp', '01 4063115', '', 'strozzi@chello.at', 'Strozzigasse 24', '1080', 'Wenen', '43', '', 'Het Café Restaurant van Hinno. Hij heeft altijd een zelfgebakken nederlandse Appeltaart en Genever klaar staan. \r\nDe Oostenrijkse keuken...', '1045ac10-3a14-43b8-af4c-d1fc09e9c8d9', 1, '2024-05-19 18:09:32', NULL, ''),
('d600bdfa-8810-4ea2-86a9-f89f9853a906', 'Nederlandistik an der Uni Wien', 'https://nederlandistik.univie.ac.at/fileadmin/templates/GLOBAL/IMG/uni_logo_220.jpg', 'https://nederlandistik.univie.ac.at', '', '+43-1-4277-0', '', 'nederlandistik@univie.ac.at', 'Universitätsring 1', '1010 ', 'Wenen', '43', '', 'Sie interessieren sich für die niederländische Sprache, Kultur und Literatur? Dann sind Sie bei uns richtig.', 'df0bcad3-3a1e-4848-a8ee-c4590fcccc7a', 1, '2024-05-19 22:18:00', NULL, ''),
('f7fd08c8-09e1-46d6-8d42-4f794a528c7b', 'English For Children', 'https://static.wixstatic.com/media/aeab79_b4da27af3e264d61bab9e111768d2d4d~mv2.png/v1/fill/w_208,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo_Variation_3-removebg-preview.png', 'https://www.englishforchildren.com', '', '', '+43 (0) 664 9287595', 'office@englishforchildren.com', 'Breitenseer Straße 50/5-6', '1140', 'Wenen', '43', 'engels bijles school', '', 'ad11e516-c6ff-4d60-8699-a3393469098c', 1, '2024-05-19 22:26:18', NULL, '');

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
