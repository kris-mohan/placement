-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: placement
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batch`
--

DROP TABLE IF EXISTS `batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batch` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch`
--

LOCK TABLES `batch` WRITE;
/*!40000 ALTER TABLE `batch` DISABLE KEYS */;
INSERT INTO `batch` VALUES (1,'2019'),(2,'2020'),(3,'2021'),(4,'2022'),(5,'2023'),(6,'2024'),(7,'2025'),(8,'2026'),(9,'2027');
/*!40000 ALTER TABLE `batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendarevents`
--

DROP TABLE IF EXISTS `calendarevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendarevents` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `EventStartDateTime` datetime DEFAULT NULL,
  `EventEndDateTime` datetime DEFAULT NULL,
  `EventType` varchar(50) DEFAULT NULL,
  `EventDescription` varchar(150) DEFAULT NULL,
  `OrgId` bigint DEFAULT NULL,
  `CompanyId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendarevents`
--

LOCK TABLES `calendarevents` WRITE;
/*!40000 ALTER TABLE `calendarevents` DISABLE KEYS */;
INSERT INTO `calendarevents` VALUES (1,'2024-10-10 00:00:00','2024-10-10 00:00:00',NULL,NULL,NULL,NULL,_binary '\0');
/*!40000 ALTER TABLE `calendarevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_company`
--

DROP TABLE IF EXISTS `campus_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus_company` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CampusId` bigint DEFAULT NULL,
  `CompanyId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Campus_CampusRegistartion_idx` (`CampusId`),
  KEY `FK_Company_Companydatum_idx` (`CompanyId`),
  CONSTRAINT `FK_Campus_CampusRegistartion` FOREIGN KEY (`CampusId`) REFERENCES `campusregistration` (`Id`),
  CONSTRAINT `FK_Company_Companydatum` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_company`
--

LOCK TABLES `campus_company` WRITE;
/*!40000 ALTER TABLE `campus_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `campus_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campusregistration`
--

DROP TABLE IF EXISTS `campusregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campusregistration` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CollegeName` varchar(100) DEFAULT NULL,
  `CollegeEmail` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `PlacementOfficerName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `ContactNumber` bigint DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `ZipCode` varchar(100) DEFAULT NULL,
  `DateOfRegistration` datetime DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `IsActive` bit(1) NOT NULL DEFAULT b'0',
  `UserRoleId` bigint DEFAULT NULL,
  `UniversityId` bigint DEFAULT NULL,
  `ParentCampusId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Campus_University_idx` (`UniversityId`),
  KEY `FK_Campus_Campus_idx` (`ParentCampusId`),
  CONSTRAINT `FK_Campus_Campus` FOREIGN KEY (`ParentCampusId`) REFERENCES `campusregistration` (`Id`),
  CONSTRAINT `FK_Campus_University` FOREIGN KEY (`UniversityId`) REFERENCES `university` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campusregistration`
--

LOCK TABLES `campusregistration` WRITE;
/*!40000 ALTER TABLE `campusregistration` DISABLE KEYS */;
INSERT INTO `campusregistration` VALUES (1,'jnnce','jnnce@gmail.com','1234','','',NULL,'','','','','2024-10-18 19:13:29',_binary '\0',_binary '\0',1,2,NULL),(2,'East West Institute of Technology','ewit@gmail.com','1234','suresh','ewit@gmail.com',987654320,'Bangalore','Karnataka','India','577224','2024-10-18 19:13:29',_binary '\0',_binary '\0',1,1,NULL),(3,'East West College of Engineering','ewce@gmail.com','1234','manjayya','ewce@gmail.com',876435789,'Bangalore','Karnataka','Indida','898888','2024-10-18 19:13:29',_binary '\0',_binary '\0',NULL,2,NULL),(4,'East West School of Architecture','ewsa@gmail.com','1234','Ragayya','ewsa@gmail.com',987654258,'Bangalore','Karnataka','India','989898','2024-10-18 19:13:29',_binary '\0',_binary '\0',NULL,1,NULL),(5,'East West College of Management','ewcm@gmai.com','1234','Somayya','ewcm@gmai.com',875643157,'Bangalore','Karnataka','India','566778','2024-10-18 19:13:29',_binary '\0',_binary '\0',NULL,3,NULL);
/*!40000 ALTER TABLE `campusregistration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collegejobposting`
--

DROP TABLE IF EXISTS `collegejobposting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collegejobposting` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `JobPostingId` bigint DEFAULT NULL,
  `CollegeId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CollegePosting_College_idx` (`CollegeId`),
  KEY `FK_CollegePosting_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_CollegePosting_College` FOREIGN KEY (`CollegeId`) REFERENCES `campusregistration` (`Id`),
  CONSTRAINT `FK_CollegePosting_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegejobposting`
--

LOCK TABLES `collegejobposting` WRITE;
/*!40000 ALTER TABLE `collegejobposting` DISABLE KEYS */;
INSERT INTO `collegejobposting` VALUES (1,2,1),(2,1,1),(3,4,1),(4,5,1),(5,6,1),(6,8,1),(7,11,2),(8,11,3),(9,12,1),(10,12,2),(11,12,3),(12,13,5),(13,14,1),(14,15,4),(15,15,4),(16,15,4),(17,15,4),(18,15,4),(19,15,4),(20,15,4),(21,15,4),(22,15,4),(23,15,4),(24,15,4),(25,15,4),(26,15,4),(27,15,4),(28,15,4),(29,15,4),(30,16,3);
/*!40000 ALTER TABLE `collegejobposting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collegejobposting_scheduledetails`
--

DROP TABLE IF EXISTS `collegejobposting_scheduledetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collegejobposting_scheduledetails` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Category` varchar(45) DEFAULT NULL,
  `Key` varchar(45) DEFAULT NULL,
  `Value` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegejobposting_scheduledetails`
--

LOCK TABLES `collegejobposting_scheduledetails` WRITE;
/*!40000 ALTER TABLE `collegejobposting_scheduledetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `collegejobposting_scheduledetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collegejobpostingschedule`
--

DROP TABLE IF EXISTS `collegejobpostingschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collegejobpostingschedule` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CollegeId` bigint DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  `ScheduledDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CollegeSchedule_College_idx` (`CollegeId`),
  KEY `FK_CollegeSchedule_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_CollegeSchedule_College` FOREIGN KEY (`CollegeId`) REFERENCES `campusregistration` (`Id`),
  CONSTRAINT `FK_CollegeSchedule_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegejobpostingschedule`
--

LOCK TABLES `collegejobpostingschedule` WRITE;
/*!40000 ALTER TABLE `collegejobpostingschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `collegejobpostingschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_job_batch`
--

DROP TABLE IF EXISTS `company_job_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_job_batch` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `JobPostingId` bigint DEFAULT NULL,
  `BatchId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyJobBatch_JobPosting_idx` (`JobPostingId`),
  KEY `FK_CompanyJobBatch_Batch_idx` (`BatchId`),
  CONSTRAINT `FK_CompanyJobBatch_Batch` FOREIGN KEY (`BatchId`) REFERENCES `batch` (`Id`),
  CONSTRAINT `FK_CompanyJobBatch_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_job_batch`
--

LOCK TABLES `company_job_batch` WRITE;
/*!40000 ALTER TABLE `company_job_batch` DISABLE KEYS */;
INSERT INTO `company_job_batch` VALUES (1,10,2),(2,10,3),(3,11,3),(4,11,4),(5,11,5),(6,11,6),(7,12,5),(8,12,6),(9,13,6),(10,13,7),(11,14,6),(12,14,7),(13,15,7),(14,15,8),(15,15,7),(16,15,8),(17,15,7),(18,15,8),(19,15,7),(20,15,8),(21,15,7),(22,15,8),(23,15,7),(24,15,8),(25,15,7),(26,15,8),(27,15,7),(28,15,8),(29,15,7),(30,15,8),(31,15,7),(32,15,8),(33,15,7),(34,15,8),(35,15,7),(36,15,8),(37,15,7),(38,15,8),(39,15,7),(40,15,8),(41,15,7),(42,15,8),(43,15,7),(44,15,8),(45,16,9);
/*!40000 ALTER TABLE `company_job_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_job_course`
--

DROP TABLE IF EXISTS `company_job_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_job_course` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `JobPostingId` bigint DEFAULT NULL,
  `CourseId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyJobCourse_JobPost_idx` (`JobPostingId`),
  KEY `FK_CompanyJobCourse_Course` (`CourseId`),
  CONSTRAINT `FK_CompanyJobCourse_Course` FOREIGN KEY (`CourseId`) REFERENCES `course` (`Id`),
  CONSTRAINT `FK_CompanyJobCourse_JobPost` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_job_course`
--

LOCK TABLES `company_job_course` WRITE;
/*!40000 ALTER TABLE `company_job_course` DISABLE KEYS */;
INSERT INTO `company_job_course` VALUES (1,11,1),(2,11,5),(3,12,1),(4,12,5),(5,13,16),(6,13,17),(7,14,5),(8,15,22),(9,15,23),(10,15,22),(11,15,23),(12,15,22),(13,15,23),(14,15,22),(15,15,23),(16,15,22),(17,15,23),(18,15,22),(19,15,23),(20,15,22),(21,15,23),(22,15,22),(23,15,23),(24,15,22),(25,15,23),(26,15,22),(27,15,23),(28,15,22),(29,15,23),(30,15,22),(31,15,23),(32,15,22),(33,15,23),(34,15,22),(35,15,23),(36,15,22),(37,15,23),(38,15,22),(39,15,23),(40,16,1),(41,16,2);
/*!40000 ALTER TABLE `company_job_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_job_stream`
--

DROP TABLE IF EXISTS `company_job_stream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_job_stream` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StreamId` bigint DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyJobStream_Stream_idx` (`StreamId`),
  KEY `FK_CompanyJobStream_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_CompanyJobStream_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_CompanyJobStream_Stream` FOREIGN KEY (`StreamId`) REFERENCES `stream` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_job_stream`
--

LOCK TABLES `company_job_stream` WRITE;
/*!40000 ALTER TABLE `company_job_stream` DISABLE KEYS */;
INSERT INTO `company_job_stream` VALUES (1,1,13),(2,2,13),(3,3,13),(4,3,14),(5,7,15),(6,1,16);
/*!40000 ALTER TABLE `company_job_stream` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companydata`
--

DROP TABLE IF EXISTS `companydata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companydata` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Url` varchar(250) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Address` varchar(150) DEFAULT NULL,
  `PhoneNumber` varchar(50) DEFAULT NULL,
  `GSTNumber` varchar(50) DEFAULT NULL,
  `ContactPerson` varchar(50) DEFAULT NULL,
  `AddressLine1` varchar(50) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZipCode` varchar(50) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `ParentCompanyId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `IsActive` bit(1) NOT NULL DEFAULT b'0',
  `DateOfRegistration` datetime DEFAULT NULL,
  `UserRoleId` int NOT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `CompanySize` bigint DEFAULT NULL,
  `LogoPath` varchar(255) DEFAULT NULL,
  `About` varchar(10000) DEFAULT NULL,
  `HeadQuarters` varchar(255) DEFAULT NULL,
  `VideoPath` varchar(255) DEFAULT NULL,
  `PresentationPath` varchar(255) DEFAULT NULL,
  `DocumentPath` varchar(255) DEFAULT NULL,
  `AudioPath` varchar(255) DEFAULT NULL,
  `CompanyType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companydata`
--

LOCK TABLES `companydata` WRITE;
/*!40000 ALTER TABLE `companydata` DISABLE KEYS */;
INSERT INTO `companydata` VALUES (1,NULL,'SSG',NULL,'',NULL,'',NULL,'',NULL,NULL,NULL,NULL,_binary '\0',_binary '\0','2024-10-18 19:13:03',2,'1234','ssg@gmail.com',NULL,'https://softserveglobal.co.in/assets/images/sslogoglobal.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'tcs.com','TCS','Whitefield','9876543210','GSTIN98753146','Usha','Bangalore','Bangalore','Karnataka','577054','India',1,_binary '\0',_binary '\0','2024-10-21 09:59:37',2,'tcs@123','tcs@gmail.com',NULL,'https://www.tcs.com/content/dam/global-tcs/en/images/home/tcs-logo-1.svg',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'','Dhruv','MSR Nagar','34234','432423','Akram','','Bangalore','Karnataka','560079','India',0,_binary '\0',_binary '\0','2002-07-04 00:00:00',0,'','info@dhruvts.com',250,'https://dhruvts.com/wp-content/uploads/2024/04/Footer-2.svg','we are passionate about building innovative software solutions that empower businesses to thrive in the digital age. Since our founding in [Year], we have been committed to providing high-quality, scalable, and secure software that meets the evolving needs of our clients across various industries.\n\nWe specialize in developing web and mobile applications, custom software development, and cloud-based solutions that drive business efficiency and improve customer experiences. Our team of experienced developers, designers, and IT professionals work collaboratively to deliver technology solutions that are not only functional but also future-ready.','India, US','','','','',NULL),(4,'ssg.com','SSG','MSR Nagar','432423','4234324','Akram','','Bangalore','Karnataka','560054','India',0,_binary '\0',_binary '\0','2016-01-14 00:00:00',0,'','ssg@gmail.com',45,'https://softserveglobal.co.in/assets/images/sslogoglobal.png','Softserve Global','MSR Nagar','','','','',NULL);
/*!40000 ALTER TABLE `companydata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companydesignation`
--

DROP TABLE IF EXISTS `companydesignation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companydesignation` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Company_Designation_idx` (`CompanyId`),
  CONSTRAINT `FK_Company_Designation` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companydesignation`
--

LOCK TABLES `companydesignation` WRITE;
/*!40000 ALTER TABLE `companydesignation` DISABLE KEYS */;
/*!40000 ALTER TABLE `companydesignation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyindustries`
--

DROP TABLE IF EXISTS `companyindustries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyindustries` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `IndustryId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyIndustries_CompanyData` (`CompanyId`),
  KEY `FK_CompanyIndustries_Industries` (`IndustryId`),
  CONSTRAINT `FK_CompanyIndustries_CompanyData` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_CompanyIndustries_Industries` FOREIGN KEY (`IndustryId`) REFERENCES `industries` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyindustries`
--

LOCK TABLES `companyindustries` WRITE;
/*!40000 ALTER TABLE `companyindustries` DISABLE KEYS */;
INSERT INTO `companyindustries` VALUES (1,1,1,_binary '\0'),(2,1,2,_binary '\0'),(3,1,3,_binary '\0'),(4,2,4,_binary '\0'),(5,2,5,_binary '\0'),(6,4,1,_binary '\0'),(7,4,2,_binary '\0'),(8,4,1,_binary '\0'),(9,4,2,_binary '\0'),(10,4,3,_binary '\0'),(11,4,1,_binary '\0'),(12,4,2,_binary '\0'),(13,4,3,_binary '\0'),(14,4,4,_binary '\0');
/*!40000 ALTER TABLE `companyindustries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyregistration`
--

DROP TABLE IF EXISTS `companyregistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyregistration` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `ContactPerson` varchar(50) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(50) DEFAULT NULL,
  `IsActive` bit(1) NOT NULL DEFAULT b'0',
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `UserRoleId` bigint DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `DateOfRegistration` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyregistration`
--

LOCK TABLES `companyregistration` WRITE;
/*!40000 ALTER TABLE `companyregistration` DISABLE KEYS */;
INSERT INTO `companyregistration` VALUES (1,'ssg','ssg@gmail.com','','','',_binary '\0',_binary '\0',2,'1234',NULL),(2,'capgemini','capgemini@gmail.com','doom','bangalore','1234567689',_binary '\0',_binary '\0',2,'1234','2024-10-04 09:41:59'),(3,'SSG','student@gmail.com','Krishna Mohan','Bangalore','9898989898',_binary '\0',_binary '\0',2,'123','2024-10-18 09:33:01');
/*!40000 ALTER TABLE `companyregistration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companytechnologies`
--

DROP TABLE IF EXISTS `companytechnologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companytechnologies` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `TechnologyId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyTechnologies_CompanyData` (`CompanyId`),
  KEY `FK_CompanyTechnologies_Technologies` (`TechnologyId`),
  CONSTRAINT `FK_CompanyTechnologies_CompanyData` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_CompanyTechnologies_Technologies` FOREIGN KEY (`TechnologyId`) REFERENCES `technologies` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companytechnologies`
--

LOCK TABLES `companytechnologies` WRITE;
/*!40000 ALTER TABLE `companytechnologies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companytechnologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `FullForm` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CSE','Computer Science and Engineering'),(2,'ME','Mechanical Engineering'),(3,'CE','Civil Engineering'),(4,'EEE','Electrical and Electronics Engineering'),(5,'ECE','Electronics and Communication Engineering'),(6,'MBBS','MBBS'),(7,'BDS','BDS'),(8,'BAMS','BAMS'),(9,'BHMS','BHMS'),(10,'BPT','BPT'),(11,'B.Sc Nursing','B.Sc Nursing'),(12,'Post Basic B.Sc Nursing','Post Basic B.Sc Nursing'),(13,'M.Sc Nursing','M.Sc Nursing'),(14,'B.Com','B.Com'),(15,'M.Com','M.Com'),(16,'BBA','Bachelor of Business Administration (BBA)'),(17,'MBA','Master of Business Administration (MBA)'),(18,'BA','Bachelor of Arts (BA)'),(19,'MA','Master of Arts (MA)'),(20,'LLB','LLB'),(21,'LLM','LLM'),(22,'B.Arch','B.Arch'),(23,'M.Arch','M.Arch'),(24,'B.Pharm','Bachelor of Pharmacy (B.Pharm)'),(25,'M.Pharm','Master of Pharmacy (M.Pharm)'),(28,'B.Ed','Bachelor of Education (B.Ed)'),(29,'M.Ed','Master of Education (M.Ed)');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `FileName` varchar(45) DEFAULT NULL,
  `FilePath` varchar(45) DEFAULT NULL,
  `FileType` varchar(45) DEFAULT NULL,
  `ParentType` varchar(45) DEFAULT NULL,
  `ParentId` bigint DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `CreatedBy` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `To` varchar(45) DEFAULT NULL,
  `CC` varchar(45) DEFAULT NULL,
  `BCC` varchar(45) DEFAULT NULL,
  `Subject` varchar(45) DEFAULT NULL,
  `IsSent` tinyint(1) DEFAULT '0',
  `Body` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` VALUES (1,'Ranju.ssg9902@gmail.com',NULL,NULL,'Hello test Placements',1,'TestPlacements Body');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indent_form`
--

DROP TABLE IF EXISTS `indent_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indent_form` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) DEFAULT NULL,
  `ContactPersonName` varchar(255) DEFAULT NULL,
  `ContactPersonDesignation` varchar(255) DEFAULT NULL,
  `Email` varchar(55) DEFAULT NULL,
  `PhoneNumber` varchar(45) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indent_form`
--

LOCK TABLES `indent_form` WRITE;
/*!40000 ALTER TABLE `indent_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `indent_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indent_form_dynamic_field`
--

DROP TABLE IF EXISTS `indent_form_dynamic_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indent_form_dynamic_field` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `IndentFormId` bigint DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_IndentField_IndentForm_idx` (`IndentFormId`),
  CONSTRAINT `FK_IndentField_IndentForm` FOREIGN KEY (`IndentFormId`) REFERENCES `indent_form` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indent_form_dynamic_field`
--

LOCK TABLES `indent_form_dynamic_field` WRITE;
/*!40000 ALTER TABLE `indent_form_dynamic_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `indent_form_dynamic_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industries` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'Information Technology','Industry focused on software development',_binary '\0'),(2,'Education','Industry focused on Education',_binary '\0'),(3,'Finance','Industry focused on Finance',_binary '\0'),(4,'Banking','Industry focused on Banking',_binary '\0'),(5,'Health care','Industry focused on HealthCare',_binary '\0');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitations` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `InvitationTemplateId` bigint DEFAULT NULL,
  `Recipients` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Cc` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Bcc` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `From` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `IsAccepted` bit(1) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitations`
--

LOCK TABLES `invitations` WRITE;
/*!40000 ALTER TABLE `invitations` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobinterviewpanels`
--

DROP TABLE IF EXISTS `jobinterviewpanels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobinterviewpanels` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `PanelName` varchar(100) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Designation` varchar(100) DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobinterviewpanels`
--

LOCK TABLES `jobinterviewpanels` WRITE;
/*!40000 ALTER TABLE `jobinterviewpanels` DISABLE KEYS */;
INSERT INTO `jobinterviewpanels` VALUES (1,'usha','string','software developer',1);
/*!40000 ALTER TABLE `jobinterviewpanels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobinterviewrounds`
--

DROP TABLE IF EXISTS `jobinterviewrounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobinterviewrounds` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `JobPostingId` bigint DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Priority` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Round_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_Round_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobinterviewrounds`
--

LOCK TABLES `jobinterviewrounds` WRITE;
/*!40000 ALTER TABLE `jobinterviewrounds` DISABLE KEYS */;
INSERT INTO `jobinterviewrounds` VALUES (1,2,'test assesment-1','online test',1),(2,2,'test assesment-1','online test-1',1),(3,2,'test assessment-2','Online test-2',2),(4,2,'Technical Round-1','Virtual Interview',3),(5,2,'Technical Round-2','Virtual Interview',4),(6,2,'HR-Interview','Coding Test',5),(7,5,'test assessment-1','CBT-1',1),(8,5,'Technical Round-1','CBT-2',2),(9,5,'HR-Interview','Virtual Interview',3);
/*!40000 ALTER TABLE `jobinterviewrounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpost_studentround`
--

DROP TABLE IF EXISTS `jobpost_studentround`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpost_studentround` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StudentId` bigint DEFAULT NULL,
  `JobPostingRoundId` bigint DEFAULT NULL,
  `Feedback` varchar(16000) DEFAULT NULL,
  `HasPassed` bit(1) DEFAULT NULL,
  `Score` int DEFAULT NULL,
  `EventId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPost_Student_idx` (`StudentId`),
  KEY `FK_JobPostStudentRound_JobPostRound_idx` (`JobPostingRoundId`),
  KEY `FK_JobRound_Event_idx` (`EventId`),
  CONSTRAINT `FK_JobPost_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`),
  CONSTRAINT `FK_JobPostStudentRound_JobPostRound` FOREIGN KEY (`JobPostingRoundId`) REFERENCES `jobinterviewrounds` (`Id`),
  CONSTRAINT `FK_JobRound_Event` FOREIGN KEY (`EventId`) REFERENCES `calendarevents` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpost_studentround`
--

LOCK TABLES `jobpost_studentround` WRITE;
/*!40000 ALTER TABLE `jobpost_studentround` DISABLE KEYS */;
INSERT INTO `jobpost_studentround` VALUES (3,1,1,'wow a lovely student',_binary '',90,NULL),(4,1,2,'Wow a great performance',_binary '\0',0,NULL),(5,2,1,'Good effort, but room for improvement.',_binary '\0',65,NULL),(6,3,1,'Excellent skills shown during the round.',_binary '',92,NULL),(7,3,2,'Need to work on time management.',_binary '\0',60,NULL),(8,2,2,'Fantastic work, nailed the technical part.',_binary '',95,NULL),(10,2,3,'The presentation was lacking detail.',_binary '\0',55,NULL),(11,3,3,'Good approach to problem solving.',_binary '',80,NULL),(12,1,3,'Good approach to problem solving.',_binary '',80,NULL),(13,1,4,'Could improve on communication skills.',_binary '\0',70,NULL),(14,2,4,'Amazing performance overall, very confident.',_binary '',98,NULL),(15,1,5,'Missed some critical details, needs improvement.',_binary '\0',50,NULL);
/*!40000 ALTER TABLE `jobpost_studentround` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobposting`
--

DROP TABLE IF EXISTS `jobposting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobposting` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `JobRole` varchar(50) DEFAULT NULL,
  `JobDescription` varchar(15000) DEFAULT NULL,
  `ValidFrom` datetime DEFAULT NULL,
  `ValidTill` datetime DEFAULT NULL,
  `Positions` int DEFAULT NULL,
  `QuantityFilled` int DEFAULT NULL,
  `IsClosed` bit(1) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `TechnologyId` bigint DEFAULT NULL,
  `Salary` decimal(10,0) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Vacancies` bigint DEFAULT NULL,
  `JobType` varchar(50) DEFAULT NULL,
  `Shift` varchar(45) DEFAULT NULL,
  `ModeOfWork` varchar(45) DEFAULT NULL,
  `DriveDate` datetime DEFAULT NULL,
  `MinSSLCPercentage` decimal(10,0) DEFAULT NULL,
  `MinPUCPercentage` decimal(10,0) DEFAULT NULL,
  `MinCGPA` decimal(10,0) DEFAULT NULL,
  `BacklogsAllowed` int DEFAULT NULL,
  `PostedDate` datetime DEFAULT NULL,
  `MinimumYearExperience` int DEFAULT NULL,
  `MaximumYearExperience` int DEFAULT NULL,
  `MinimumMonthExperience` int DEFAULT NULL,
  `MaximumMonthExperience` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPosting_Company_idx` (`CompanyId`),
  KEY `FK_JobPosting_Technology_idx` (`TechnologyId`),
  CONSTRAINT `FK_JobPosting_Company` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_JobPosting_Technology` FOREIGN KEY (`TechnologyId`) REFERENCES `technologies` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobposting`
--

LOCK TABLES `jobposting` WRITE;
/*!40000 ALTER TABLE `jobposting` DISABLE KEYS */;
INSERT INTO `jobposting` VALUES (1,2,'Python developer','web application','2024-10-21 15:07:48','2024-10-21 15:07:48',30,9,_binary '\0',_binary '\0',2,900000,'bangalore',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,4,'pyhton testing ','automation testing','2024-10-21 15:07:48','2024-10-21 15:07:48',18,2,_binary '\0',_binary '\0',2,1800000,'bangalore',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,'Software Engineer','Develop and maintain web applications.',NULL,'2025-01-01 05:29:59',5,2,_binary '\0',_binary '\0',1,60000,'New York, USA',3,'Full-Time','Day','Onsite','2024-11-05 15:30:00',0,0,0,0,NULL,0,0,0,0),(5,4,'Data Analyst','Analyze and interpret complex','2024-10-20 13:30:00','2024-12-21 05:29:59',3,1,_binary '\0',_binary '\0',2,50000,'San Francisco, USA',2,'Contract','Day','Remote','2024-10-25 14:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,2,'DevOps Engineer','Ensure smooth software','2024-09-15 13:30:00','2024-11-16 05:29:59',4,0,_binary '\0',_binary '\0',1,75000,'London, UK',4,'Full-Time','Night','Hybrid','2024-09-20 16:30:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,4,'UX Designer','Design user interfaces and .','2024-12-01 13:30:00','2025-02-01 05:29:59',2,0,_binary '\0',_binary '\0',1,55000,'Berlin, Germany',2,'Full-Time','Day','Onsite','2024-12-10 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,4,'','',NULL,NULL,0,0,_binary '\0',_binary '\0',NULL,0,'',0,'','','',NULL,0,0,0,0,NULL,NULL,NULL,NULL,NULL),(11,4,'Software Developer','We are looking for a Software Developer to build and implement functional programs. You will work with other Developers and Product Managers throughout the software development life cycle.\n\nIn this role, you should be a team player with a keen eye for detail and problem-solving skills. If you also have experience in Agile frameworks and popular coding languages (e.g. JavaScript), we’d like to meet you.\n\nYour goal will be to build efficient programs and systems that serve user needs.',NULL,NULL,0,0,_binary '\0',_binary '\0',NULL,600000,'Bangalore',10,'Full-time','Day','Hybrid',NULL,65,75,7,0,NULL,NULL,NULL,NULL,NULL),(12,4,'Testing','Test lead/manager: A test lead is responsible for:\n\nDefining the testing activities for subordinates – testers or test engineers.\nAll responsibilities of test planning.\nTo check if the team has all the necessary resources to execute the testing activities.\nTo check if testing is going hand in hand with the software development in all phases.\nPrepare the status report of testing activities.\nRequired Interactions with customers.\nUpdating project manager regularly about the progress of testing activities.\nTest engineers/QA testers/QC testers are responsible for:\nTo read all the documents and understand what needs to be tested.\nBased on the information procured in the above step decide how it is to be tested.\nInform the test lead about what all resources will be required for software testing.\nDevelop test cases and prioritize testing activities.\nExecute all the test case and report defects, define severity and priority for each defect.\nCarry out regression testing every time when changes are made to the code to fix defects.',NULL,'2024-10-31 00:00:00',0,0,_binary '\0',_binary '\0',NULL,500000,'Bangalore',20,'Contract','Day','Offline','2024-11-07 00:00:00',75,85,8,0,NULL,NULL,NULL,NULL,NULL),(13,4,'Management','Accomplishes department objectives by managing staff.\nPlans and evaluates department policies, processes, priorities, and performance goals.\nMaintains staff by recruiting, onboarding, training, assessing, and promoting employees.\nEnsures that their department is on track to meet performance goals and makes adjustments based on performance data as needed.\nMotivates direct reports by providing positive feedback and skills development.\nAccomplishes staff results by communicating job expectations and planning, monitoring, and appraising job results.\nDevelops, coordinates, and enforces systems, policies, procedures, and productivity standards.\nEstablishes strategic goals by gathering pertinent business, financial, service, and operations information.\nDefines objectives, identifies and evaluates trends and options, chooses courses of action, and evaluates outcomes.\nAccomplishes financial objectives by forecasting requirements, preparing an annual budget, scheduling expenditures, analyzing variances, and initiating corrective action.\nPrepares reports for senior level management to help track their team’s progress.\nEnsures that staff have the resources they need to complete their work in an optimal manner.\nActs as a liaison with senior level management and other department managers by developing productive, collaborative relationships and utilizing clear and effective communication.\nUpdates sector and management expertise through professional development, participating in professional educational opportunities, reading industry-specific and management publications, and taking part in professional organizations.',NULL,'2024-11-30 00:00:00',0,0,_binary '\0',_binary '\0',NULL,900000,'Chennai',8,'Full-Time','Night Shift','Work from home','2024-12-20 00:00:00',80,90,9,0,'2024-10-30 15:32:55',2,4,0,0),(14,4,'AI & ML','The primary task of a Machine Learning Engineer is to create AI capable of mimicking human thought processes as closely as possible so that they can function reliably and effectively. Doing so involves the following Machine Learning Engineer job duties:\n\nWorking with project managers to establish objectives for AI systems\nCreating AI algorithm prototypes based on project specifications\nRunning tests to assess AI performance\nAnalyzing data gathered during tests to identify strengths and weaknesses of AI\nImplementing changes to algorithms to improve AI performance\nTroubleshooting and addressing problems with deployed AI to improve user experience\nDocumenting all steps in the development process\nRemaining up to date on the latest innovations in machine learning',NULL,'2024-10-17 00:00:00',0,0,_binary '\0',_binary '\0',NULL,8000000,'Bangalore',9,'Internship','Day Shift','Travel-Based','2024-10-10 00:00:00',65,70,9,0,'2024-10-30 18:15:55',1,4,0,0),(15,4,'Architecture Role','Job Summary:\nWe are looking for a skilled and experienced Solution Architect to lead the design, development, and implementation of software solutions. The ideal candidate will have a strong background in software architecture, cloud computing, and full-stack development, and be able to provide technical leadership and strategic direction for large-scale systems. As a Solution Architect, you will collaborate with cross-functional teams to ensure the architecture is scalable, secure, and meets business and technical requirements.\n\nKey Responsibilities:\nArchitectural Design:\n\nLead the design and architecture of software solutions, ensuring alignment with business objectives and technical requirements.\nDesign scalable, secure, and high-performance solutions using modern technologies, frameworks, and cloud platforms.\nProvide leadership in defining technical direction and best practices for both backend and frontend technologies.\nStakeholder Collaboration:\n\nCollaborate with business analysts, product managers, and developers to understand system requirements and design solutions that address both functional and non-functional needs (e.g., scalability, performance, security).\nServe as a technical liaison between different teams (development, operations, security, etc.) to ensure smooth communication and integration.\nTechnical Leadership:\n\nProvide mentorship and guidance to development teams on architectural decisions, coding standards, and best practices.\nConduct code reviews to ensure that solutions adhere to architectural guidelines, best practices, and coding standards.\nLead the evaluation and selection of appropriate technology stacks and tools.\nSystem Integration:\n\nOversee the integration of multiple systems, ensuring compatibility and consistency across applications and platforms.\nEnsure that the architecture supports system scalability, performance, and high availability, with a focus on the long-term success of the platform.\nPerformance and Optimization:\n\nContinuously assess and optimize application performance, security, and scalability.\nImplement strategies for performance tuning, load balancing, and caching to ensure the application is responsive and reliable.\nDocumentation:\n\nCreate and maintain comprehensive technical documentation for architecture, design patterns, and best practices.\nDevelop architectural blueprints, roadmaps, and solution diagrams to support both development teams and stakeholders.\nContinuous Improvement:\n\nStay up-to-date with the latest trends and technologies in software development, cloud computing, and architecture patterns.\nPropose and implement new technologies, tools, or processes that improve efficiency, reduce technical debt, or increase system performance.\nRequired Skills and Qualifications:\nSoftware Architecture Expertise:\n\nProven experience in designing and architecting large-scale, distributed software systems.\nIn-depth knowledge of software design principles, patterns (e.g., microservices, event-driven architecture), and frameworks.\nCloud and DevOps Experience:\n\nStrong experience with cloud platforms (e.g., AWS, Azure, Google Cloud) and knowledge of cloud-native architectures.\nFamiliarity with DevOps principles, CI/CD pipelines, and containerization (e.g., Docker, Kubernetes).\nBackend & Frontend Development:\n\nProficiency in backend technologies such as Java, .NET, Node.js, Python, or similar languages.\nSolid understanding of frontend technologies like Angular, React, Vue.js, or similar.\nDatabases & Data Management:\n\nStrong experience with relational databases (e.g., MySQL, SQL Server) and NoSQL databases (e.g., MongoDB, Cassandra).\nExperience in database design, querying, and optimization for large-scale applications.\nSecurity and Compliance:\n\nExpertise in securing software solutions by implementing encryption, access controls, and other security measures.\nFamiliarity with industry compliance standards (e.g., GDPR, HIPAA, SOC2).\nLeadership & Communication:\n\nStrong leadership skills, with the ability to lead and influence cross-functional teams.\nExcellent communication skills, both verbal and written, with the ability to present complex technical concepts to non-technical stakeholders.\nPreferred Skills:\nExperience with enterprise-level architecture frameworks like TOGAF or Zachman.\nFamiliarity with Service-Oriented Architecture (SOA) and RESTful services.\nExperience in designing and building microservices-based architectures.\nKnowledge of serverless computing and event-driven architectures.\nEducation & Experience:\nBachelor’s degree in Computer Science, Engineering, or a related field (Master’s preferred).\n7+ years of experience in software development, with at least 3-5 years in an architectural role.\nProven experience designing and building complex systems for large-scale applications.',NULL,'2024-11-30 00:00:00',0,0,_binary '\0',_binary '\0',NULL,2500000,'Chennai',9,'Full-Time','Day Shift','Work from home','2024-12-03 00:00:00',90,90,8,0,'2024-11-06 17:28:04',2,7,0,0),(16,4,'Database solution architech','Databases & Data Management:\n\nStrong experience with relational databases (e.g., MySQL, SQL Server) and NoSQL databases (e.g., MongoDB, Cassandra).\nExperience in database design, querying, and optimization for large-scale applications.',NULL,'2024-11-22 00:00:00',0,0,_binary '\0',_binary '\0',NULL,800000,'Noida',4,'Contract','Night Shift','Hybrid','2024-11-28 00:00:00',80,75,8,0,'2024-11-06 18:45:06',2,7,0,0);
/*!40000 ALTER TABLE `jobposting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobposting_selectedstudents`
--

DROP TABLE IF EXISTS `jobposting_selectedstudents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobposting_selectedstudents` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `JobPostingId` bigint DEFAULT NULL,
  `StudentId` bigint DEFAULT NULL,
  `HasAcceptedOffer` int DEFAULT NULL,
  `DateOfJoining` datetime DEFAULT NULL,
  `OfferLetterSentDate` datetime DEFAULT NULL,
  `OfferLetterExpiryDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_jobposting_selectedstudents_JobPosting_idx` (`JobPostingId`),
  KEY `FK_jobposting_selectedstudents_Student_idx` (`StudentId`),
  CONSTRAINT `FK_jobposting_selectedstudents_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_jobposting_selectedstudents_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobposting_selectedstudents`
--

LOCK TABLES `jobposting_selectedstudents` WRITE;
/*!40000 ALTER TABLE `jobposting_selectedstudents` DISABLE KEYS */;
INSERT INTO `jobposting_selectedstudents` VALUES (1,1,1,1,'2024-10-23 17:33:00',NULL,NULL),(2,2,2,1,'2024-10-23 17:33:00',NULL,NULL),(3,2,2,1,'2024-10-23 17:33:00',NULL,NULL),(4,4,1,1,'2024-10-23 17:33:00',NULL,NULL),(5,5,2,1,'2024-10-23 17:33:00',NULL,NULL),(6,1,1,0,'2024-10-24 22:59:00',NULL,NULL);
/*!40000 ALTER TABLE `jobposting_selectedstudents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobposting_skill`
--

DROP TABLE IF EXISTS `jobposting_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobposting_skill` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `SkillId` bigint DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPostingSkill_Skill_idx` (`SkillId`),
  KEY `FK_JobPostingSkill_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_JobPostingSkill_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_JobPostingSkill_Skill` FOREIGN KEY (`SkillId`) REFERENCES `skill` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobposting_skill`
--

LOCK TABLES `jobposting_skill` WRITE;
/*!40000 ALTER TABLE `jobposting_skill` DISABLE KEYS */;
INSERT INTO `jobposting_skill` VALUES (1,1,11),(2,2,11),(3,3,11),(4,4,11),(5,13,11),(6,28,11),(7,33,11),(8,37,11),(9,38,11),(10,39,11),(11,40,11),(12,42,11),(13,43,11),(14,44,11),(15,45,11),(16,47,11),(17,48,11),(18,123,12),(19,124,12),(20,125,12),(21,126,12),(22,128,12),(23,136,12),(24,138,12),(25,140,12),(26,144,12),(27,145,12),(28,148,12),(29,1,13),(30,4,13),(31,5,13),(32,72,14),(33,73,14),(34,75,14),(35,78,14),(36,80,14),(37,82,14),(38,1,4),(39,2,4),(40,3,4),(41,4,4),(42,6,15),(43,10,15),(44,6,15),(45,10,15),(46,6,15),(47,10,15),(48,6,15),(49,10,15),(50,6,15),(51,10,15),(52,6,15),(53,10,15),(54,6,15),(55,10,15),(56,6,15),(57,10,15),(58,6,15),(59,10,15),(60,6,15),(61,10,15),(62,6,15),(63,10,15),(64,6,15),(65,10,15),(66,6,15),(67,10,15),(68,6,15),(69,10,15),(70,6,15),(71,10,15),(72,6,15),(73,10,15),(74,25,16),(75,26,16),(76,27,16);
/*!40000 ALTER TABLE `jobposting_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpostingdetails`
--

DROP TABLE IF EXISTS `jobpostingdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpostingdetails` (
  `Id` bigint NOT NULL,
  `Streams` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostingdetails`
--

LOCK TABLES `jobpostingdetails` WRITE;
/*!40000 ALTER TABLE `jobpostingdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobpostingdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpostings_eligiblestudents`
--

DROP TABLE IF EXISTS `jobpostings_eligiblestudents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpostings_eligiblestudents` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StudentId` bigint DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  `StatusId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_jobpostings_eligiblestudents_Student_idx` (`StudentId`),
  KEY `FK_jobpostings_eligiblestudents_JobPosting_idx` (`JobPostingId`),
  KEY `FK_JobPostingEligible_Status_idx` (`StatusId`),
  CONSTRAINT `FK_JobPostingEligible_Status` FOREIGN KEY (`StatusId`) REFERENCES `jobstudentstatus` (`Id`),
  CONSTRAINT `FK_jobpostings_eligiblestudents_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_jobpostings_eligiblestudents_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostings_eligiblestudents`
--

LOCK TABLES `jobpostings_eligiblestudents` WRITE;
/*!40000 ALTER TABLE `jobpostings_eligiblestudents` DISABLE KEYS */;
INSERT INTO `jobpostings_eligiblestudents` VALUES (21,1,1,1),(22,1,2,2),(23,1,4,3),(24,1,6,3),(25,1,5,1),(26,2,1,1),(27,2,2,1),(28,2,5,2),(29,2,8,3),(30,2,6,3),(31,3,4,1),(32,3,5,2),(33,3,8,3);
/*!40000 ALTER TABLE `jobpostings_eligiblestudents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpostingtechnology`
--

DROP TABLE IF EXISTS `jobpostingtechnology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpostingtechnology` (
  `JobpostingId` bigint NOT NULL,
  `TechnologyId` bigint NOT NULL,
  PRIMARY KEY (`JobpostingId`,`TechnologyId`),
  KEY `TechnologyId` (`TechnologyId`),
  CONSTRAINT `jobpostingtechnology_ibfk_1` FOREIGN KEY (`JobpostingId`) REFERENCES `jobposting` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `jobpostingtechnology_ibfk_2` FOREIGN KEY (`TechnologyId`) REFERENCES `technologies` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostingtechnology`
--

LOCK TABLES `jobpostingtechnology` WRITE;
/*!40000 ALTER TABLE `jobpostingtechnology` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobpostingtechnology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobstudentstatus`
--

DROP TABLE IF EXISTS `jobstudentstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobstudentstatus` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobstudentstatus`
--

LOCK TABLES `jobstudentstatus` WRITE;
/*!40000 ALTER TABLE `jobstudentstatus` DISABLE KEYS */;
INSERT INTO `jobstudentstatus` VALUES (1,'Rejected'),(2,'Selected'),(3,'In-Progress');
/*!40000 ALTER TABLE `jobstudentstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `UserName` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `DateOfRegistration` datetime DEFAULT NULL,
  `CampusId` bigint DEFAULT NULL,
  `RoleId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `IsActive` bit(1) NOT NULL DEFAULT b'0',
  `StudentId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Login_CompanyData` (`CompanyId`),
  KEY `FK_Login_Role` (`RoleId`),
  KEY `FK_Login_Campus_idx` (`CampusId`),
  KEY `FK_Login_Student_idx` (`StudentId`),
  CONSTRAINT `FK_Login_Campus` FOREIGN KEY (`CampusId`) REFERENCES `campusregistration` (`Id`),
  CONSTRAINT `FK_Login_CompanyData` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_Login_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`),
  CONSTRAINT `FK_Login_UserRole` FOREIGN KEY (`RoleId`) REFERENCES `userrole` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,1,'ssg1@gmail.com','1234','2024-10-18 19:13:03',NULL,2,_binary '\0',_binary '\0',NULL),(2,NULL,'jnnce@gmail.com','1234','2024-10-18 19:13:29',1,1,_binary '\0',_binary '\0',NULL),(3,NULL,'usha@gmail.com','1234','2024-10-18 19:14:02',NULL,3,_binary '\0',_binary '\0',1),(4,2,'tcs@gmail.com','tcs@123','2024-10-21 09:59:37',NULL,2,_binary '\0',_binary '\0',NULL),(5,3,'info@dhruvts.com','','2002-07-04 00:00:00',NULL,2,_binary '\0',_binary '\0',NULL),(6,4,'ssg@gmail.com','1234','2016-01-14 00:00:00',NULL,2,_binary '\0',_binary '\0',NULL);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paatashalaregistrations`
--

DROP TABLE IF EXISTS `paatashalaregistrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paatashalaregistrations` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `OrgId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_PaatashalaRegistrations_CompanyData` (`CompanyId`),
  CONSTRAINT `FK_PaatashalaRegistrations_CompanyData` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paatashalaregistrations`
--

LOCK TABLES `paatashalaregistrations` WRITE;
/*!40000 ALTER TABLE `paatashalaregistrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `paatashalaregistrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(145) DEFAULT NULL,
  `SkillTypeId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Skill_SkillType_idx` (`SkillTypeId`),
  CONSTRAINT `FK_Skill_SkillType` FOREIGN KEY (`SkillTypeId`) REFERENCES `skill_type` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'Data Structures',1),(2,'Algorithms',1),(3,'Problem Solving',1),(4,'Object-Oriented Programming (OOP)',1),(5,'Version Control (Git)',1),(6,'Debugging and Testing',1),(7,'Software Development Lifecycle (SDLC)',1),(8,'Agile Methodology',1),(9,'RESTful Services',1),(10,'Continuous Integration/Continuous Deployment (CI/CD)',1),(11,'Java',2),(12,'Python',2),(13,'C++',2),(14,'JavaScript',2),(15,'C#',2),(16,'Ruby',2),(17,'Swift',2),(18,'PHP',2),(19,'Go',2),(20,'Kotlin',2),(21,'R',2),(22,'TypeScript',2),(23,'MATLAB',2),(24,'SQL',3),(25,'MySQL',3),(26,'PostgreSQL',3),(27,'MongoDB',3),(28,'Oracle Database',3),(29,'Microsoft SQL Server',3),(30,'SQLite',3),(31,'Redis',3),(32,'Cassandra',3),(33,'MariaDB',3),(34,'Firebase Realtime Database',3),(35,'HTML5',4),(36,'CSS3',4),(37,'JavaScript',4),(38,'TypeScript',4),(39,'React.js',4),(40,'Angular',4),(41,'Vue.js',4),(42,'Node.js',4),(43,'Express.js',4),(44,'Bootstrap',4),(45,'jQuery',4),(46,'GraphQL',4),(47,'Next.js',4),(48,'SASS/SCSS',4),(49,'Java (Android)',5),(50,'Kotlin (Android)',5),(51,'Swift (iOS)',5),(52,'Objective-C (iOS)',5),(53,'React Native',5),(54,'Flutter',5),(55,'Xamarin',5),(56,'Ionic',5),(57,'Cordova',5),(58,'Unity (for game development)',5),(59,'Apache Cordova',5),(60,'Amazon Web Services (AWS)',6),(61,'Microsoft Azure',6),(62,'Google Cloud Platform (GCP)',6),(63,'IBM Cloud',6),(64,'Oracle Cloud',6),(65,'Salesforce',6),(66,'Kubernetes',6),(67,'Docker',6),(68,'OpenStack',6),(69,'Heroku',6),(70,'DigitalOcean',6),(71,'Firebase',6),(72,'Machine Learning',9),(73,'Deep Learning',9),(74,'Natural Language Processing (NLP)',9),(75,'Computer Vision',9),(76,'Neural Networks',9),(77,'TensorFlow',9),(78,'PyTorch',9),(79,'Keras',9),(80,'OpenCV',9),(81,'Scikit-Learn',9),(82,'Reinforcement Learning',9),(83,'Data Analysis',10),(84,'Data Visualization',10),(85,'Statistical Analysis',10),(86,'Python for Data Science',10),(87,'R Programming',10),(88,'Pandas',10),(89,'NumPy',10),(90,'MATLAB',10),(91,'Power BI',10),(92,'Tableau',10),(93,'Apache Spark',10),(94,'Big Data',10),(95,'Hadoop',10),(96,'SQL for Data Science',10),(97,'Continuous Integration (CI)',7),(98,'Continuous Deployment (CD)',7),(99,'Jenkins',7),(100,'Ansible',7),(101,'Chef',7),(102,'Puppet',7),(103,'Terraform',7),(104,'Nagios',7),(105,'Prometheus',7),(106,'Docker',7),(107,'Kubernetes',7),(108,'Git',7),(109,'GitLab CI/CD',7),(110,'Continuous Integration (CI)',7),(111,'Continuous Deployment (CD)',7),(112,'Jenkins',7),(113,'Ansible',7),(114,'Chef',7),(115,'Puppet',7),(116,'Terraform',7),(117,'Nagios',7),(118,'Prometheus',7),(119,'Docker',7),(120,'Kubernetes',7),(121,'Git',7),(122,'GitLab CI/CD',7),(123,'Manual Testing',11),(124,'Automation Testing',11),(125,'Selenium',11),(126,'JMeter',11),(127,'LoadRunner',11),(128,'TestNG',11),(129,'JUnit',11),(130,'Postman',11),(131,'Cucumber',11),(132,'Quality Assurance (QA)',11),(133,'Performance Testing',11),(134,'Security Testing',11),(135,'API Testing',11),(136,'Manual Testing',11),(137,'Automation Testing',11),(138,'Selenium',11),(139,'JMeter',11),(140,'LoadRunner',11),(141,'TestNG',11),(142,'JUnit',11),(143,'Postman',11),(144,'Cucumber',11),(145,'Quality Assurance (QA)',11),(146,'Performance Testing',11),(147,'Security Testing',11),(148,'API Testing',11);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_type`
--

DROP TABLE IF EXISTS `skill_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_type` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_type`
--

LOCK TABLES `skill_type` WRITE;
/*!40000 ALTER TABLE `skill_type` DISABLE KEYS */;
INSERT INTO `skill_type` VALUES (1,'Technical Skills'),(2,'Programming Languages\n'),(3,'Database Management\n'),(4,'Web Development\n'),(5,'Mobile App Development\n'),(6,'Cloud Computing\n'),(7,'DevOps & Infrastructure\n'),(8,'Networking & Security\n'),(9,'Artificial Intelligence & Machine Learning\n'),(10,'Data Science & Analytics\n'),(11,'Software Testing & QA\n'),(12,'Project Management\n'),(13,'Design & UI/UX\n'),(14,'Soft Skills\n'),(15,'Communication Skills\n'),(16,'Leadership & Management\n'),(17,'Problem-Solving & Critical Thinking\n'),(18,'Team Collaboration\n'),(19,'Time Management\n'),(20,'Sales & Marketing\n'),(21,'Digital Marketing\n'),(22,'Content Creation\n'),(23,'Finance & Accounting\n'),(24,'Business Analysis\n'),(25,'Customer Service & Support\n'),(26,'Other');
/*!40000 ALTER TABLE `skill_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stream`
--

DROP TABLE IF EXISTS `stream`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stream` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stream`
--

LOCK TABLES `stream` WRITE;
/*!40000 ALTER TABLE `stream` DISABLE KEYS */;
INSERT INTO `stream` VALUES (1,'Engineering'),(2,'Medical'),(3,'Nursing'),(4,'Commerce'),(5,'Arts'),(6,'Law'),(7,'Architecture'),(8,'Pharmacy'),(9,'Management'),(10,'Education');
/*!40000 ALTER TABLE `stream` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_semester_mark`
--

DROP TABLE IF EXISTS `student_semester_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_semester_mark` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StudentAcademicId` bigint DEFAULT NULL,
  `Semester` int DEFAULT NULL,
  `Sgpa` decimal(10,0) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_StudentSemMarks_StudentAcademic_idx` (`StudentAcademicId`),
  CONSTRAINT `FK_StudentSemMarks_StudentAcademic` FOREIGN KEY (`StudentAcademicId`) REFERENCES `studentacademics` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_semester_mark`
--

LOCK TABLES `student_semester_mark` WRITE;
/*!40000 ALTER TABLE `student_semester_mark` DISABLE KEYS */;
INSERT INTO `student_semester_mark` VALUES (1,1,1,7,NULL),(2,1,2,8,NULL),(3,1,3,8,NULL),(4,2,1,6,NULL),(5,2,2,8,NULL),(6,2,3,9,NULL),(7,3,1,8,NULL),(8,3,2,7,NULL),(9,3,3,8,NULL);
/*!40000 ALTER TABLE `student_semester_mark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_skill`
--

DROP TABLE IF EXISTS `student_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_skill` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StudentId` bigint DEFAULT NULL,
  `SkillId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Skill_Student_idx` (`StudentId`),
  KEY `FK_StudentSkill_Skill_idx` (`SkillId`),
  CONSTRAINT `FK_Skill_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`),
  CONSTRAINT `FK_StudentSkill_Skill` FOREIGN KEY (`SkillId`) REFERENCES `skill` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_skill`
--

LOCK TABLES `student_skill` WRITE;
/*!40000 ALTER TABLE `student_skill` DISABLE KEYS */;
INSERT INTO `student_skill` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,10),(8,1,14),(9,1,18),(10,1,22),(11,1,24),(12,1,16),(13,1,28),(14,1,30),(15,1,44),(16,1,50),(17,1,54),(18,1,78),(19,1,67),(20,2,2),(21,2,10),(22,2,15),(23,2,25),(24,2,28),(25,2,30),(26,2,34),(27,2,38),(28,2,45),(29,2,47),(30,2,76),(31,2,54),(32,2,86),(33,2,100),(34,2,132),(35,2,108),(36,2,105),(37,2,120),(38,2,111),(39,3,12),(40,3,23),(41,3,120),(42,3,34),(43,3,11),(44,3,13),(45,3,14),(46,3,140),(47,3,134),(48,3,57),(49,3,24),(50,3,78),(51,3,98),(52,3,67);
/*!40000 ALTER TABLE `student_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentacademics`
--

DROP TABLE IF EXISTS `studentacademics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentacademics` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `StudentId` bigint DEFAULT NULL,
  `CourseId` bigint DEFAULT NULL,
  `StreamId` bigint DEFAULT NULL,
  `CGPA` decimal(10,2) DEFAULT NULL,
  `TenthMarks` decimal(10,2) DEFAULT NULL,
  `TwelthMarks` decimal(10,2) DEFAULT NULL,
  `TenthBoard` varchar(145) DEFAULT NULL,
  `TwelthBoard` varchar(145) DEFAULT NULL,
  `TenthPassedOutYear` int DEFAULT NULL,
  `TwelthPassedOutYear` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_StudentAcademy_Student_idx` (`StudentId`),
  KEY `FK_Student_Course_idx` (`CourseId`),
  KEY `FK_Student_Stream_idx` (`StreamId`),
  CONSTRAINT `FK_Student_Course` FOREIGN KEY (`CourseId`) REFERENCES `course` (`Id`),
  CONSTRAINT `FK_Student_Stream` FOREIGN KEY (`StreamId`) REFERENCES `stream` (`Id`),
  CONSTRAINT `FK_StudentAcademy_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentacademics`
--

LOCK TABLES `studentacademics` WRITE;
/*!40000 ALTER TABLE `studentacademics` DISABLE KEYS */;
INSERT INTO `studentacademics` VALUES (1,1,1,1,8.00,NULL,NULL,NULL,NULL,NULL,NULL),(2,2,5,1,7.00,NULL,NULL,NULL,NULL,NULL,NULL),(3,3,2,1,7.00,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `studentacademics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentplaced`
--

DROP TABLE IF EXISTS `studentplaced`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentplaced` (
  `Id` bigint NOT NULL,
  `StudentId` bigint DEFAULT NULL,
  `OrgId` bigint DEFAULT NULL,
  `JobPostingId` bigint DEFAULT NULL,
  `BatchId` bigint DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentplaced`
--

LOCK TABLES `studentplaced` WRITE;
/*!40000 ALTER TABLE `studentplaced` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentplaced` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentregistartion`
--

DROP TABLE IF EXISTS `studentregistartion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentregistartion` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `RollNumber` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(50) DEFAULT NULL,
  `SchoolId` bigint DEFAULT NULL,
  `Batch` varchar(50) DEFAULT NULL,
  `Branch` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `IsActive` bit(1) NOT NULL DEFAULT b'0',
  `UserRoleId` bigint DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `DateOfRegistration` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentregistartion`
--

LOCK TABLES `studentregistartion` WRITE;
/*!40000 ALTER TABLE `studentregistartion` DISABLE KEYS */;
INSERT INTO `studentregistartion` VALUES (1,'usha','123','usha@gmail.com','12',1,'2021-2025','Electronics',_binary '\0',_binary '\0',3,'1234','2024-10-18 19:14:02');
/*!40000 ALTER TABLE `studentregistartion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstudent`
--

DROP TABLE IF EXISTS `tblstudent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblstudent` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `OrgId` bigint DEFAULT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `BatchId` bigint DEFAULT NULL,
  `AadharCardNumber` varchar(45) DEFAULT NULL,
  `PermanentAddress` varchar(500) DEFAULT NULL,
  `CurrentAddress` varchar(500) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(45) DEFAULT NULL,
  `ParentName` varchar(45) DEFAULT NULL,
  `ParentPhoneNumber` varchar(45) DEFAULT NULL,
  `DateOfBirth` datetime DEFAULT NULL,
  `RollNo` varchar(45) DEFAULT NULL,
  `BloodGroup` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Student_Campus_idx` (`OrgId`),
  KEY `FK_Student_Batch_idx` (`BatchId`),
  CONSTRAINT `FK_Student_Batch` FOREIGN KEY (`BatchId`) REFERENCES `batch` (`Id`),
  CONSTRAINT `FK_Student_Campus` FOREIGN KEY (`OrgId`) REFERENCES `campusregistration` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstudent`
--

LOCK TABLES `tblstudent` WRITE;
/*!40000 ALTER TABLE `tblstudent` DISABLE KEYS */;
INSERT INTO `tblstudent` VALUES (1,1,'Akram','Pasha',3,'160090004566','Mulbagala, Kolar, Karnataka - 563131','MSR Nagar, Bangalore, Karnataka','akrampashah1275@gmail.com','8147243278','Hyder Valy','9848022338','1999-06-06 00:00:00','MVJCE00001',NULL),(2,1,'Ranjitha','GN',3,'123456789012','Chintamani, Chikka Ballapura, Karnataka - 563134','MSR Nagar, Bangalore, Karnataka','ranju.ssg9902@gmail.com','9845098768','Narayana Swamy','8978675645','1999-10-04 00:00:00','MVJCE00002',NULL),(3,1,'Usha','Nuchin',2,'123456789','Shivamogga','Bengaluru','usha@gmail.com','9008563285','Geeta','123456789','2024-10-25 10:17:00','MVJCE00032',NULL);
/*!40000 ALTER TABLE `tblstudent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technologies` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

LOCK TABLES `technologies` WRITE;
/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
INSERT INTO `technologies` VALUES (1,'java','programming language',_binary '\0'),(2,'python','programming language',_binary '\0'),(3,'c#','programming language',_binary '\0'),(6,'SQL','Database',_binary '\0'),(7,'Angular','Front end Language',_binary '\0'),(8,'Reactjs','Front end language',_binary '\0');
/*!40000 ALTER TABLE `technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainers` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `TrainerType` varchar(50) DEFAULT NULL,
  `CompanyName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (1,'Usha Nuchin','ushanuchin@gmail.com','9090909090','abc@123',_binary '\0','Free Training','Q Spider'),(2,'abc','abc@g','123','wer',_binary '','paid','abc'),(3,'Anjali','ajnali@gmail.com','9876543210','',_binary '\0','Free Training','ssg');
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainerschedule`
--

DROP TABLE IF EXISTS `trainerschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainerschedule` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `SchoolId` bigint DEFAULT NULL,
  `CourseId` bigint DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `TrainerId` bigint DEFAULT NULL,
  `ScheduleType` varchar(50) DEFAULT NULL,
  `StudentId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`),
  KEY `FK_TrainerSchedule_Trainers` (`TrainerId`),
  KEY `FK_TrainerSchedule_TrainingCourse` (`CourseId`),
  CONSTRAINT `FK_TrainerSchedule_Trainers` FOREIGN KEY (`TrainerId`) REFERENCES `trainers` (`Id`),
  CONSTRAINT `FK_TrainerSchedule_TrainingCourse` FOREIGN KEY (`CourseId`) REFERENCES `trainingcourse` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainerschedule`
--

LOCK TABLES `trainerschedule` WRITE;
/*!40000 ALTER TABLE `trainerschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainerschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainingcourse`
--

DROP TABLE IF EXISTS `trainingcourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainingcourse` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `ValidFrom` datetime DEFAULT NULL,
  `ValidTill` datetime DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainingcourse`
--

LOCK TABLES `trainingcourse` WRITE;
/*!40000 ALTER TABLE `trainingcourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainingcourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainingmodule`
--

DROP TABLE IF EXISTS `trainingmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainingmodule` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `TrainingCourseId` bigint DEFAULT NULL,
  `TrainingMode` varchar(50) DEFAULT NULL,
  `TrainingAssetFolder` varchar(50) DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`),
  KEY `FK_TrainingModule_TrainingCourse` (`TrainingCourseId`),
  CONSTRAINT `FK_TrainingModule_TrainingCourse` FOREIGN KEY (`TrainingCourseId`) REFERENCES `trainingcourse` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainingmodule`
--

LOCK TABLES `trainingmodule` WRITE;
/*!40000 ALTER TABLE `trainingmodule` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainingmodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,'Karnataka State University'),(2,'Autonomous College'),(3,'VTU'),(4,'Deemed University'),(5,'Private University');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,'TPC'),(2,'HR'),(3,'Student');
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 10:01:29
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hangfire
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hangfireaggregatedcounter`
--

DROP TABLE IF EXISTS `hangfireaggregatedcounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfireaggregatedcounter` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` int NOT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_HangfireCounterAggregated_Key` (`Key`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfireaggregatedcounter`
--

LOCK TABLES `hangfireaggregatedcounter` WRITE;
/*!40000 ALTER TABLE `hangfireaggregatedcounter` DISABLE KEYS */;
INSERT INTO `hangfireaggregatedcounter` VALUES (1,'stats:succeeded:2024-11-09',29,'2024-12-09 04:29:24'),(2,'stats:succeeded:2024-11-09-03',6,'2024-11-10 03:51:22'),(3,'stats:succeeded',29,NULL),(5,'stats:succeeded:2024-11-09-04',23,'2024-11-10 04:29:24');
/*!40000 ALTER TABLE `hangfireaggregatedcounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirecounter`
--

DROP TABLE IF EXISTS `hangfirecounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirecounter` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` int NOT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_HangfireCounter_Key` (`Key`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirecounter`
--

LOCK TABLES `hangfirecounter` WRITE;
/*!40000 ALTER TABLE `hangfirecounter` DISABLE KEYS */;
INSERT INTO `hangfirecounter` VALUES (88,'stats:succeeded:2024-11-09',1,'2024-12-09 04:31:09'),(89,'stats:succeeded:2024-11-09-04',1,'2024-11-10 04:31:09'),(90,'stats:succeeded',1,NULL);
/*!40000 ALTER TABLE `hangfirecounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfiredistributedlock`
--

DROP TABLE IF EXISTS `hangfiredistributedlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfiredistributedlock` (
  `Resource` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfiredistributedlock`
--

LOCK TABLES `hangfiredistributedlock` WRITE;
/*!40000 ALTER TABLE `hangfiredistributedlock` DISABLE KEYS */;
/*!40000 ALTER TABLE `hangfiredistributedlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirehash`
--

DROP TABLE IF EXISTS `hangfirehash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirehash` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Field` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` longtext,
  `ExpireAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_HangfireHash_Key_Field` (`Key`,`Field`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirehash`
--

LOCK TABLES `hangfirehash` WRITE;
/*!40000 ALTER TABLE `hangfirehash` DISABLE KEYS */;
INSERT INTO `hangfirehash` VALUES (1,'recurring-job:process-emails-job','Queue','default',NULL),(2,'recurring-job:process-emails-job','Cron','* * * * *',NULL),(3,'recurring-job:process-emails-job','TimeZoneId','UTC',NULL),(4,'recurring-job:process-emails-job','Job','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}',NULL),(5,'recurring-job:process-emails-job','CreatedAt','2024-11-09T03:45:04.9751763Z',NULL),(6,'recurring-job:process-emails-job','NextExecution','2024-11-09T04:32:00.0000000Z',NULL),(7,'recurring-job:process-emails-job','V','2',NULL),(8,'recurring-job:process-emails-job','LastExecution','2024-11-09T04:31:01.9955815Z',NULL),(10,'recurring-job:process-emails-job','LastJobId','30',NULL);
/*!40000 ALTER TABLE `hangfirehash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirejob`
--

DROP TABLE IF EXISTS `hangfirejob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirejob` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `StateId` int DEFAULT NULL,
  `StateName` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `InvocationData` longtext NOT NULL,
  `Arguments` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `ExpireAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_HangfireJob_StateName` (`StateName`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirejob`
--

LOCK TABLES `hangfirejob` WRITE;
/*!40000 ALTER TABLE `hangfirejob` DISABLE KEYS */;
INSERT INTO `hangfirejob` VALUES (1,3,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:46:21.812030','2024-11-10 03:46:25.335398'),(2,6,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:47:03.787699','2024-11-10 03:47:06.466113'),(3,9,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:48:19.029369','2024-11-10 03:48:21.534319'),(4,12,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:49:03.887459','2024-11-10 03:49:06.511565'),(5,15,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:50:34.204960','2024-11-10 03:50:36.706193'),(6,18,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 03:51:20.347127','2024-11-10 03:51:21.672097'),(7,21,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:05:05.480481','2024-11-10 04:05:22.995603'),(8,24,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:06:05.447685','2024-11-10 04:06:08.147611'),(9,27,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:07:35.704262','2024-11-10 04:07:38.434784'),(10,30,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:08:16.679259','2024-11-10 04:08:20.468254'),(11,33,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:09:47.454220','2024-11-10 04:09:50.803218'),(12,36,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:10:12.873410','2024-11-10 04:10:20.634414'),(13,39,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:11:44.686436','2024-11-10 04:11:55.252375'),(14,42,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:13:19.477444','2024-11-10 04:13:22.726218'),(15,45,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:14:06.101918','2024-11-10 04:14:07.708371'),(16,48,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:16:06.751553','2024-11-10 04:16:08.100028'),(17,51,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:17:13.339916','2024-11-10 04:17:23.303849'),(18,54,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:18:13.508757','2024-11-10 04:18:23.148545'),(19,57,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:19:11.866516','2024-11-10 04:19:23.199662'),(20,60,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:20:27.024663','2024-11-10 04:20:38.276426'),(21,63,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:21:08.656490','2024-11-10 04:21:10.586080'),(22,66,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:22:38.860656','2024-11-10 04:22:40.559482'),(23,69,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:23:16.126010','2024-11-10 04:23:23.459791'),(24,72,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:24:46.309326','2024-11-10 04:24:53.507744'),(25,75,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:25:01.685570','2024-11-10 04:25:08.555702'),(26,78,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:26:46.914525','2024-11-10 04:26:53.634052'),(27,81,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:27:07.025354','2024-11-10 04:27:08.641084'),(28,84,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:28:52.272718','2024-11-10 04:28:54.978457'),(29,87,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:29:16.771632','2024-11-10 04:29:24.062085'),(30,90,'Succeeded','{\"Type\":\"Placements.WebApi.Helper.EmailJob, Placements.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null\",\"Method\":\"ProcessEmailsAsync\",\"ParameterTypes\":\"[]\",\"Arguments\":\"[]\"}','[]','2024-11-09 04:31:02.001737','2024-11-10 04:31:09.079642');
/*!40000 ALTER TABLE `hangfirejob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirejobparameter`
--

DROP TABLE IF EXISTS `hangfirejobparameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirejobparameter` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `JobId` int NOT NULL,
  `Name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_HangfireJobParameter_JobId_Name` (`JobId`,`Name`),
  KEY `FK_HangfireJobParameter_Job` (`JobId`),
  CONSTRAINT `FK_HangfireJobParameter_Job` FOREIGN KEY (`JobId`) REFERENCES `hangfirejob` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirejobparameter`
--

LOCK TABLES `hangfirejobparameter` WRITE;
/*!40000 ALTER TABLE `hangfirejobparameter` DISABLE KEYS */;
INSERT INTO `hangfirejobparameter` VALUES (1,1,'RecurringJobId','\"process-emails-job\"'),(2,1,'Time','1731123981'),(3,1,'CurrentCulture','\"en-IN\"'),(4,1,'CurrentUICulture','\"en-US\"'),(5,2,'RecurringJobId','\"process-emails-job\"'),(6,2,'Time','1731124023'),(7,2,'CurrentCulture','\"en-IN\"'),(8,2,'CurrentUICulture','\"en-US\"'),(9,3,'RecurringJobId','\"process-emails-job\"'),(10,3,'Time','1731124099'),(11,3,'CurrentCulture','\"en-IN\"'),(12,3,'CurrentUICulture','\"en-US\"'),(13,4,'RecurringJobId','\"process-emails-job\"'),(14,4,'Time','1731124143'),(15,4,'CurrentCulture','\"en-IN\"'),(16,4,'CurrentUICulture','\"en-US\"'),(17,5,'RecurringJobId','\"process-emails-job\"'),(18,5,'Time','1731124234'),(19,5,'CurrentCulture','\"en-IN\"'),(20,5,'CurrentUICulture','\"en-US\"'),(21,6,'RecurringJobId','\"process-emails-job\"'),(22,6,'Time','1731124280'),(23,6,'CurrentCulture','\"en-IN\"'),(24,6,'CurrentUICulture','\"en-US\"'),(25,7,'RecurringJobId','\"process-emails-job\"'),(26,7,'Time','1731125105'),(27,7,'CurrentCulture','\"en-IN\"'),(28,7,'CurrentUICulture','\"en-US\"'),(29,8,'RecurringJobId','\"process-emails-job\"'),(30,8,'Time','1731125165'),(31,8,'CurrentCulture','\"en-IN\"'),(32,8,'CurrentUICulture','\"en-US\"'),(33,9,'RecurringJobId','\"process-emails-job\"'),(34,9,'Time','1731125255'),(35,9,'CurrentCulture','\"en-IN\"'),(36,9,'CurrentUICulture','\"en-US\"'),(37,10,'RecurringJobId','\"process-emails-job\"'),(38,10,'Time','1731125296'),(39,10,'CurrentCulture','\"en-IN\"'),(40,10,'CurrentUICulture','\"en-US\"'),(41,11,'RecurringJobId','\"process-emails-job\"'),(42,11,'Time','1731125387'),(43,11,'CurrentCulture','\"en-IN\"'),(44,11,'CurrentUICulture','\"en-US\"'),(45,12,'RecurringJobId','\"process-emails-job\"'),(46,12,'Time','1731125412'),(47,12,'CurrentCulture','\"en-IN\"'),(48,12,'CurrentUICulture','\"en-US\"'),(49,13,'RecurringJobId','\"process-emails-job\"'),(50,13,'Time','1731125504'),(51,13,'CurrentCulture','\"en-IN\"'),(52,13,'CurrentUICulture','\"en-US\"'),(53,14,'RecurringJobId','\"process-emails-job\"'),(54,14,'Time','1731125599'),(55,14,'CurrentCulture','\"en-IN\"'),(56,14,'CurrentUICulture','\"en-US\"'),(57,15,'RecurringJobId','\"process-emails-job\"'),(58,15,'Time','1731125646'),(59,15,'CurrentCulture','\"en-IN\"'),(60,15,'CurrentUICulture','\"en-US\"'),(61,16,'RecurringJobId','\"process-emails-job\"'),(62,16,'Time','1731125766'),(63,16,'CurrentCulture','\"en-IN\"'),(64,16,'CurrentUICulture','\"en-US\"'),(65,17,'RecurringJobId','\"process-emails-job\"'),(66,17,'Time','1731125833'),(67,17,'CurrentCulture','\"en-IN\"'),(68,17,'CurrentUICulture','\"en-US\"'),(69,18,'RecurringJobId','\"process-emails-job\"'),(70,18,'Time','1731125893'),(71,18,'CurrentCulture','\"en-IN\"'),(72,18,'CurrentUICulture','\"en-US\"'),(73,19,'RecurringJobId','\"process-emails-job\"'),(74,19,'Time','1731125951'),(75,19,'CurrentCulture','\"en-IN\"'),(76,19,'CurrentUICulture','\"en-US\"'),(77,20,'RecurringJobId','\"process-emails-job\"'),(78,20,'Time','1731126027'),(79,20,'CurrentCulture','\"en-IN\"'),(80,20,'CurrentUICulture','\"en-US\"'),(81,21,'RecurringJobId','\"process-emails-job\"'),(82,21,'Time','1731126068'),(83,21,'CurrentCulture','\"en-IN\"'),(84,21,'CurrentUICulture','\"en-US\"'),(85,22,'RecurringJobId','\"process-emails-job\"'),(86,22,'Time','1731126158'),(87,22,'CurrentCulture','\"en-IN\"'),(88,22,'CurrentUICulture','\"en-US\"'),(89,23,'RecurringJobId','\"process-emails-job\"'),(90,23,'Time','1731126196'),(91,23,'CurrentCulture','\"en-IN\"'),(92,23,'CurrentUICulture','\"en-US\"'),(93,24,'RecurringJobId','\"process-emails-job\"'),(94,24,'Time','1731126286'),(95,24,'CurrentCulture','\"en-IN\"'),(96,24,'CurrentUICulture','\"en-US\"'),(97,25,'RecurringJobId','\"process-emails-job\"'),(98,25,'Time','1731126301'),(99,25,'CurrentCulture','\"en-IN\"'),(100,25,'CurrentUICulture','\"en-US\"'),(101,26,'RecurringJobId','\"process-emails-job\"'),(102,26,'Time','1731126406'),(103,26,'CurrentCulture','\"en-IN\"'),(104,26,'CurrentUICulture','\"en-US\"'),(105,27,'RecurringJobId','\"process-emails-job\"'),(106,27,'Time','1731126427'),(107,27,'CurrentCulture','\"en-IN\"'),(108,27,'CurrentUICulture','\"en-US\"'),(109,28,'RecurringJobId','\"process-emails-job\"'),(110,28,'Time','1731126532'),(111,28,'CurrentCulture','\"en-IN\"'),(112,28,'CurrentUICulture','\"en-US\"'),(113,29,'RecurringJobId','\"process-emails-job\"'),(114,29,'Time','1731126556'),(115,29,'CurrentCulture','\"en-IN\"'),(116,29,'CurrentUICulture','\"en-US\"'),(117,30,'RecurringJobId','\"process-emails-job\"'),(118,30,'Time','1731126661'),(119,30,'CurrentCulture','\"en-IN\"'),(120,30,'CurrentUICulture','\"en-US\"');
/*!40000 ALTER TABLE `hangfirejobparameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirejobqueue`
--

DROP TABLE IF EXISTS `hangfirejobqueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirejobqueue` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `JobId` int NOT NULL,
  `FetchedAt` datetime(6) DEFAULT NULL,
  `Queue` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `FetchToken` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_HangfireJobQueue_QueueAndFetchedAt` (`Queue`,`FetchedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirejobqueue`
--

LOCK TABLES `hangfirejobqueue` WRITE;
/*!40000 ALTER TABLE `hangfirejobqueue` DISABLE KEYS */;
/*!40000 ALTER TABLE `hangfirejobqueue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirejobstate`
--

DROP TABLE IF EXISTS `hangfirejobstate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirejobstate` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `JobId` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `Name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Reason` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Data` longtext,
  PRIMARY KEY (`Id`),
  KEY `FK_HangfireJobState_Job` (`JobId`),
  CONSTRAINT `FK_HangfireJobState_Job` FOREIGN KEY (`JobId`) REFERENCES `hangfirejob` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirejobstate`
--

LOCK TABLES `hangfirejobstate` WRITE;
/*!40000 ALTER TABLE `hangfirejobstate` DISABLE KEYS */;
/*!40000 ALTER TABLE `hangfirejobstate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirelist`
--

DROP TABLE IF EXISTS `hangfirelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirelist` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` longtext,
  `ExpireAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirelist`
--

LOCK TABLES `hangfirelist` WRITE;
/*!40000 ALTER TABLE `hangfirelist` DISABLE KEYS */;
/*!40000 ALTER TABLE `hangfirelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfireserver`
--

DROP TABLE IF EXISTS `hangfireserver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfireserver` (
  `Id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Data` longtext NOT NULL,
  `LastHeartbeat` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfireserver`
--

LOCK TABLES `hangfireserver` WRITE;
/*!40000 ALTER TABLE `hangfireserver` DISABLE KEYS */;
INSERT INTO `hangfireserver` VALUES ('dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e','{\"WorkerCount\":20,\"Queues\":[\"default\"],\"StartedAt\":\"2024-11-09T04:05:05.0206951Z\"}','2024-11-09 04:31:08.229856');
/*!40000 ALTER TABLE `hangfireserver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfireset`
--

DROP TABLE IF EXISTS `hangfireset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfireset` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Key` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Value` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Score` float NOT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IX_HangfireSet_Key_Value` (`Key`,`Value`)
) ENGINE=InnoDB AUTO_INCREMENT=25019 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfireset`
--

LOCK TABLES `hangfireset` WRITE;
/*!40000 ALTER TABLE `hangfireset` DISABLE KEYS */;
INSERT INTO `hangfireset` VALUES (1,'recurring-jobs','process-emails-job',1731130000,NULL);
/*!40000 ALTER TABLE `hangfireset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hangfirestate`
--

DROP TABLE IF EXISTS `hangfirestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hangfirestate` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `JobId` int NOT NULL,
  `Name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Reason` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `Data` longtext,
  PRIMARY KEY (`Id`),
  KEY `FK_HangfireHangFire_State_Job` (`JobId`),
  CONSTRAINT `FK_HangfireHangFire_State_Job` FOREIGN KEY (`JobId`) REFERENCES `hangfirejob` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hangfirestate`
--

LOCK TABLES `hangfirestate` WRITE;
/*!40000 ALTER TABLE `hangfirestate` DISABLE KEYS */;
INSERT INTO `hangfirestate` VALUES (1,1,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:46:21.875585','{\"EnqueuedAt\":\"2024-11-09T03:46:21.8643577Z\",\"Queue\":\"default\"}'),(2,1,'Processing',NULL,'2024-11-09 03:46:22.135387','{\"StartedAt\":\"2024-11-09T03:46:22.1137550Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"0062f924-c2dd-441f-98d7-faad4e41befd\"}'),(3,1,'Succeeded',NULL,'2024-11-09 03:46:25.331764','{\"SucceededAt\":\"2024-11-09T03:46:25.3155087Z\",\"PerformanceDuration\":\"3142\",\"Latency\":\"361\"}'),(4,2,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:47:03.816996','{\"EnqueuedAt\":\"2024-11-09T03:47:03.8161173Z\",\"Queue\":\"default\"}'),(5,2,'Processing',NULL,'2024-11-09 03:47:06.345681','{\"StartedAt\":\"2024-11-09T03:47:06.3384305Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"b6dc8efe-852a-4c84-84dd-d3035d4841e6\"}'),(6,2,'Succeeded',NULL,'2024-11-09 03:47:06.464031','{\"SucceededAt\":\"2024-11-09T03:47:06.4221195Z\",\"PerformanceDuration\":\"56\",\"Latency\":\"2578\"}'),(7,3,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:48:19.070248','{\"EnqueuedAt\":\"2024-11-09T03:48:19.0694942Z\",\"Queue\":\"default\"}'),(8,3,'Processing',NULL,'2024-11-09 03:48:21.435515','{\"StartedAt\":\"2024-11-09T03:48:21.4238392Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"1728cb6f-9d50-4fbb-abfb-50a7a6891d94\"}'),(9,3,'Succeeded',NULL,'2024-11-09 03:48:21.533345','{\"SucceededAt\":\"2024-11-09T03:48:21.5242008Z\",\"PerformanceDuration\":\"66\",\"Latency\":\"2428\"}'),(10,4,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:49:03.924890','{\"EnqueuedAt\":\"2024-11-09T03:49:03.9242151Z\",\"Queue\":\"default\"}'),(11,4,'Processing',NULL,'2024-11-09 03:49:06.474393','{\"StartedAt\":\"2024-11-09T03:49:06.4641554Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"da6e216e-f05d-4a68-bafc-96ccaca91fcb\"}'),(12,4,'Succeeded',NULL,'2024-11-09 03:49:06.510774','{\"SucceededAt\":\"2024-11-09T03:49:06.4995986Z\",\"PerformanceDuration\":\"8\",\"Latency\":\"2603\"}'),(13,5,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:50:34.235880','{\"EnqueuedAt\":\"2024-11-09T03:50:34.2350775Z\",\"Queue\":\"default\"}'),(14,5,'Processing',NULL,'2024-11-09 03:50:36.536891','{\"StartedAt\":\"2024-11-09T03:50:36.5250333Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"1d0e778d-d868-4e70-b376-94109146e469\"}'),(15,5,'Succeeded',NULL,'2024-11-09 03:50:36.704805','{\"SucceededAt\":\"2024-11-09T03:50:36.6892544Z\",\"PerformanceDuration\":\"13\",\"Latency\":\"2471\"}'),(16,6,'Enqueued','Triggered by recurring job scheduler','2024-11-09 03:51:20.499775','{\"EnqueuedAt\":\"2024-11-09T03:51:20.4977878Z\",\"Queue\":\"default\"}'),(17,6,'Processing',NULL,'2024-11-09 03:51:21.637252','{\"StartedAt\":\"2024-11-09T03:51:21.6274688Z\",\"ServerId\":\"dccpltr004:28288:67aaeddc-c97a-454e-8181-a0d7f529b07d\",\"WorkerId\":\"2e810c1a-aa18-4d65-9bd9-92a26d7affe5\"}'),(18,6,'Succeeded',NULL,'2024-11-09 03:51:21.671484','{\"SucceededAt\":\"2024-11-09T03:51:21.6642025Z\",\"PerformanceDuration\":\"6\",\"Latency\":\"1310\"}'),(19,7,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:05:05.552660','{\"EnqueuedAt\":\"2024-11-09T04:05:05.5233755Z\",\"Queue\":\"default\"}'),(20,7,'Processing',NULL,'2024-11-09 04:05:20.256271','{\"StartedAt\":\"2024-11-09T04:05:20.2402868Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"8c26f790-0552-4606-83d9-cd0c278c9076\"}'),(21,7,'Succeeded',NULL,'2024-11-09 04:05:22.991398','{\"SucceededAt\":\"2024-11-09T04:05:22.9696581Z\",\"PerformanceDuration\":\"2694\",\"Latency\":\"14794\"}'),(22,8,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:06:05.471768','{\"EnqueuedAt\":\"2024-11-09T04:06:05.4710824Z\",\"Queue\":\"default\"}'),(23,8,'Processing',NULL,'2024-11-09 04:06:08.078010','{\"StartedAt\":\"2024-11-09T04:06:08.0698096Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"8c26f790-0552-4606-83d9-cd0c278c9076\"}'),(24,8,'Succeeded',NULL,'2024-11-09 04:06:08.146341','{\"SucceededAt\":\"2024-11-09T04:06:08.1302642Z\",\"PerformanceDuration\":\"35\",\"Latency\":\"2646\"}'),(25,9,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:07:35.734967','{\"EnqueuedAt\":\"2024-11-09T04:07:35.7336070Z\",\"Queue\":\"default\"}'),(26,9,'Processing',NULL,'2024-11-09 04:07:38.271187','{\"StartedAt\":\"2024-11-09T04:07:38.2627524Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"8c26f790-0552-4606-83d9-cd0c278c9076\"}'),(27,9,'Succeeded',NULL,'2024-11-09 04:07:38.432425','{\"SucceededAt\":\"2024-11-09T04:07:38.4162130Z\",\"PerformanceDuration\":\"113\",\"Latency\":\"2598\"}'),(28,10,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:08:16.705555','{\"EnqueuedAt\":\"2024-11-09T04:08:16.7047635Z\",\"Queue\":\"default\"}'),(29,10,'Processing',NULL,'2024-11-09 04:08:20.430693','{\"StartedAt\":\"2024-11-09T04:08:20.4246052Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"27d72218-86ea-427a-b4be-71c94fcfba82\"}'),(30,10,'Succeeded',NULL,'2024-11-09 04:08:20.467163','{\"SucceededAt\":\"2024-11-09T04:08:20.4566883Z\",\"PerformanceDuration\":\"9\",\"Latency\":\"3767\"}'),(31,11,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:09:47.477642','{\"EnqueuedAt\":\"2024-11-09T04:09:47.4768600Z\",\"Queue\":\"default\"}'),(32,11,'Processing',NULL,'2024-11-09 04:09:50.565444','{\"StartedAt\":\"2024-11-09T04:09:50.5573601Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"687948cc-bc3b-40dc-be18-c85d87341364\"}'),(33,11,'Succeeded',NULL,'2024-11-09 04:09:50.802261','{\"SucceededAt\":\"2024-11-09T04:09:50.6121871Z\",\"PerformanceDuration\":\"20\",\"Latency\":\"3137\"}'),(34,12,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:10:13.005773','{\"EnqueuedAt\":\"2024-11-09T04:10:13.0050361Z\",\"Queue\":\"default\"}'),(35,12,'Processing',NULL,'2024-11-09 04:10:20.586916','{\"StartedAt\":\"2024-11-09T04:10:20.5814268Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"10418cdf-1431-4e4e-9ce1-e2f65e202046\"}'),(36,12,'Succeeded',NULL,'2024-11-09 04:10:20.633132','{\"SucceededAt\":\"2024-11-09T04:10:20.6243630Z\",\"PerformanceDuration\":\"17\",\"Latency\":\"7733\"}'),(37,13,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:11:45.009607','{\"EnqueuedAt\":\"2024-11-09T04:11:45.0084626Z\",\"Queue\":\"default\"}'),(38,13,'Processing',NULL,'2024-11-09 04:11:52.904330','{\"StartedAt\":\"2024-11-09T04:11:52.2270962Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"3570e709-e934-43ae-9d48-fbad82636df7\"}'),(39,13,'Succeeded',NULL,'2024-11-09 04:11:55.245154','{\"SucceededAt\":\"2024-11-09T04:11:54.8544664Z\",\"PerformanceDuration\":\"19\",\"Latency\":\"10148\"}'),(40,14,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:13:19.509225','{\"EnqueuedAt\":\"2024-11-09T04:13:19.5085465Z\",\"Queue\":\"default\"}'),(41,14,'Processing',NULL,'2024-11-09 04:13:22.614652','{\"StartedAt\":\"2024-11-09T04:13:22.5915544Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"10418cdf-1431-4e4e-9ce1-e2f65e202046\"}'),(42,14,'Succeeded',NULL,'2024-11-09 04:13:22.725178','{\"SucceededAt\":\"2024-11-09T04:13:22.7123850Z\",\"PerformanceDuration\":\"10\",\"Latency\":\"3224\"}'),(43,15,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:14:06.167888','{\"EnqueuedAt\":\"2024-11-09T04:14:06.1670669Z\",\"Queue\":\"default\"}'),(44,15,'Processing',NULL,'2024-11-09 04:14:07.670736','{\"StartedAt\":\"2024-11-09T04:14:07.6615170Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"3e84169c-c521-4b37-8ead-69f2c6264724\"}'),(45,15,'Succeeded',NULL,'2024-11-09 04:14:07.707462','{\"SucceededAt\":\"2024-11-09T04:14:07.6992339Z\",\"PerformanceDuration\":\"6\",\"Latency\":\"1590\"}'),(46,16,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:16:06.780541','{\"EnqueuedAt\":\"2024-11-09T04:16:06.7792990Z\",\"Queue\":\"default\"}'),(47,16,'Processing',NULL,'2024-11-09 04:16:08.018720','{\"StartedAt\":\"2024-11-09T04:16:08.0119559Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"20c8ff3d-d957-4e68-85ac-4247e17b3e5a\"}'),(48,16,'Succeeded',NULL,'2024-11-09 04:16:08.099135','{\"SucceededAt\":\"2024-11-09T04:16:08.0627856Z\",\"PerformanceDuration\":\"16\",\"Latency\":\"1294\"}'),(49,17,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:17:13.363493','{\"EnqueuedAt\":\"2024-11-09T04:17:13.3626197Z\",\"Queue\":\"default\"}'),(50,17,'Processing',NULL,'2024-11-09 04:17:23.262753','{\"StartedAt\":\"2024-11-09T04:17:23.0691625Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"4f3703b2-c9c4-4a00-bcd1-5afc5f8153a0\"}'),(51,17,'Succeeded',NULL,'2024-11-09 04:17:23.302899','{\"SucceededAt\":\"2024-11-09T04:17:23.2928593Z\",\"PerformanceDuration\":\"11\",\"Latency\":\"9941\"}'),(52,18,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:18:13.541051','{\"EnqueuedAt\":\"2024-11-09T04:18:13.5402822Z\",\"Queue\":\"default\"}'),(53,18,'Processing',NULL,'2024-11-09 04:18:23.107126','{\"StartedAt\":\"2024-11-09T04:18:23.0951381Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"68e38891-51d7-431f-b2a9-8d39020fa75c\"}'),(54,18,'Succeeded',NULL,'2024-11-09 04:18:23.147512','{\"SucceededAt\":\"2024-11-09T04:18:23.1400544Z\",\"PerformanceDuration\":\"7\",\"Latency\":\"9623\"}'),(55,19,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:19:11.889212','{\"EnqueuedAt\":\"2024-11-09T04:19:11.8885008Z\",\"Queue\":\"default\"}'),(56,19,'Processing',NULL,'2024-11-09 04:19:23.150334','{\"StartedAt\":\"2024-11-09T04:19:23.1434456Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"687948cc-bc3b-40dc-be18-c85d87341364\"}'),(57,19,'Succeeded',NULL,'2024-11-09 04:19:23.198695','{\"SucceededAt\":\"2024-11-09T04:19:23.1870357Z\",\"PerformanceDuration\":\"14\",\"Latency\":\"11305\"}'),(58,20,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:20:27.050793','{\"EnqueuedAt\":\"2024-11-09T04:20:27.0501766Z\",\"Queue\":\"default\"}'),(59,20,'Processing',NULL,'2024-11-09 04:20:38.217575','{\"StartedAt\":\"2024-11-09T04:20:38.2118980Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"c7d8a1a2-eea0-401e-bb5a-be2cb5c4dfd4\"}'),(60,20,'Succeeded',NULL,'2024-11-09 04:20:38.275419','{\"SucceededAt\":\"2024-11-09T04:20:38.2684787Z\",\"PerformanceDuration\":\"28\",\"Latency\":\"11214\"}'),(61,21,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:21:08.679133','{\"EnqueuedAt\":\"2024-11-09T04:21:08.6785386Z\",\"Queue\":\"default\"}'),(62,21,'Processing',NULL,'2024-11-09 04:21:10.430532','{\"StartedAt\":\"2024-11-09T04:21:10.4163616Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"59a55e18-d402-42fd-b22c-3ba7e689aa4b\"}'),(63,21,'Succeeded',NULL,'2024-11-09 04:21:10.583860','{\"SucceededAt\":\"2024-11-09T04:21:10.5693263Z\",\"PerformanceDuration\":\"104\",\"Latency\":\"1808\"}'),(64,22,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:22:38.884523','{\"EnqueuedAt\":\"2024-11-09T04:22:38.8838517Z\",\"Queue\":\"default\"}'),(65,22,'Processing',NULL,'2024-11-09 04:22:40.511232','{\"StartedAt\":\"2024-11-09T04:22:40.5027587Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"d315d28a-c021-4a2e-a3c3-80f93abc269e\"}'),(66,22,'Succeeded',NULL,'2024-11-09 04:22:40.557714','{\"SucceededAt\":\"2024-11-09T04:22:40.5450953Z\",\"PerformanceDuration\":\"12\",\"Latency\":\"1671\"}'),(67,23,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:23:16.147352','{\"EnqueuedAt\":\"2024-11-09T04:23:16.1468750Z\",\"Queue\":\"default\"}'),(68,23,'Processing',NULL,'2024-11-09 04:23:23.403262','{\"StartedAt\":\"2024-11-09T04:23:23.3963975Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"deb03ae5-9bb4-4eca-baab-8af5f0aa0bd0\"}'),(69,23,'Succeeded',NULL,'2024-11-09 04:23:23.458680','{\"SucceededAt\":\"2024-11-09T04:23:23.4507679Z\",\"PerformanceDuration\":\"6\",\"Latency\":\"7318\"}'),(70,24,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:24:46.330844','{\"EnqueuedAt\":\"2024-11-09T04:24:46.3301580Z\",\"Queue\":\"default\"}'),(71,24,'Processing',NULL,'2024-11-09 04:24:53.464273','{\"StartedAt\":\"2024-11-09T04:24:53.4554863Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"68e38891-51d7-431f-b2a9-8d39020fa75c\"}'),(72,24,'Succeeded',NULL,'2024-11-09 04:24:53.507006','{\"SucceededAt\":\"2024-11-09T04:24:53.5004378Z\",\"PerformanceDuration\":\"15\",\"Latency\":\"7176\"}'),(73,25,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:25:01.710806','{\"EnqueuedAt\":\"2024-11-09T04:25:01.7101253Z\",\"Queue\":\"default\"}'),(74,25,'Processing',NULL,'2024-11-09 04:25:08.483840','{\"StartedAt\":\"2024-11-09T04:25:08.4676758Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"7627fa6d-eb02-4470-a04c-724f6fb13c6c\"}'),(75,25,'Succeeded',NULL,'2024-11-09 04:25:08.554863','{\"SucceededAt\":\"2024-11-09T04:25:08.5382491Z\",\"PerformanceDuration\":\"13\",\"Latency\":\"6838\"}'),(76,26,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:26:46.937212','{\"EnqueuedAt\":\"2024-11-09T04:26:46.9366904Z\",\"Queue\":\"default\"}'),(77,26,'Processing',NULL,'2024-11-09 04:26:53.586062','{\"StartedAt\":\"2024-11-09T04:26:53.5783754Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"687948cc-bc3b-40dc-be18-c85d87341364\"}'),(78,26,'Succeeded',NULL,'2024-11-09 04:26:53.633349','{\"SucceededAt\":\"2024-11-09T04:26:53.6228880Z\",\"PerformanceDuration\":\"14\",\"Latency\":\"6694\"}'),(79,27,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:27:07.049685','{\"EnqueuedAt\":\"2024-11-09T04:27:07.0490874Z\",\"Queue\":\"default\"}'),(80,27,'Processing',NULL,'2024-11-09 04:27:08.605820','{\"StartedAt\":\"2024-11-09T04:27:08.5985896Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"c7d8a1a2-eea0-401e-bb5a-be2cb5c4dfd4\"}'),(81,27,'Succeeded',NULL,'2024-11-09 04:27:08.640262','{\"SucceededAt\":\"2024-11-09T04:27:08.6290159Z\",\"PerformanceDuration\":\"8\",\"Latency\":\"1594\"}'),(82,28,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:28:52.296726','{\"EnqueuedAt\":\"2024-11-09T04:28:52.2959433Z\",\"Queue\":\"default\"}'),(83,28,'Processing',NULL,'2024-11-09 04:28:54.917542','{\"StartedAt\":\"2024-11-09T04:28:53.7682910Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"3e84169c-c521-4b37-8ead-69f2c6264724\"}'),(84,28,'Succeeded',NULL,'2024-11-09 04:28:54.977210','{\"SucceededAt\":\"2024-11-09T04:28:54.9612934Z\",\"PerformanceDuration\":\"23\",\"Latency\":\"2665\"}'),(85,29,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:29:16.801060','{\"EnqueuedAt\":\"2024-11-09T04:29:16.8001593Z\",\"Queue\":\"default\"}'),(86,29,'Processing',NULL,'2024-11-09 04:29:23.963092','{\"StartedAt\":\"2024-11-09T04:29:23.9515089Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"68e38891-51d7-431f-b2a9-8d39020fa75c\"}'),(87,29,'Succeeded',NULL,'2024-11-09 04:29:24.061011','{\"SucceededAt\":\"2024-11-09T04:29:24.0530924Z\",\"PerformanceDuration\":\"74\",\"Latency\":\"7206\"}'),(88,30,'Enqueued','Triggered by recurring job scheduler','2024-11-09 04:31:02.027350','{\"EnqueuedAt\":\"2024-11-09T04:31:02.0267166Z\",\"Queue\":\"default\"}'),(89,30,'Processing',NULL,'2024-11-09 04:31:09.044025','{\"StartedAt\":\"2024-11-09T04:31:09.0383178Z\",\"ServerId\":\"dccpltr004:21388:63f1020b-dcbe-472a-a46b-1f56d68c023e\",\"WorkerId\":\"deb03ae5-9bb4-4eca-baab-8af5f0aa0bd0\"}'),(90,30,'Succeeded',NULL,'2024-11-09 04:31:09.078815','{\"SucceededAt\":\"2024-11-09T04:31:09.0697870Z\",\"PerformanceDuration\":\"8\",\"Latency\":\"7059\"}');
/*!40000 ALTER TABLE `hangfirestate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 10:01:29
