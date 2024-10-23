-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: placement
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
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campusregistration`
--

LOCK TABLES `campusregistration` WRITE;
/*!40000 ALTER TABLE `campusregistration` DISABLE KEYS */;
INSERT INTO `campusregistration` VALUES (1,'jnnce','jnnce@gmail.com','1234','','',NULL,'','','','','2024-10-18 19:13:29',_binary '\0',_binary '\0',1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegejobposting`
--

LOCK TABLES `collegejobposting` WRITE;
/*!40000 ALTER TABLE `collegejobposting` DISABLE KEYS */;
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
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companydata`
--

LOCK TABLES `companydata` WRITE;
/*!40000 ALTER TABLE `companydata` DISABLE KEYS */;
INSERT INTO `companydata` VALUES (1,NULL,'SSG',NULL,'',NULL,'',NULL,'',NULL,NULL,NULL,NULL,_binary '\0',_binary '\0','2024-10-18 19:13:03',2,'1234','ssg@gmail.com'),(2,'tcs.com','TCS','Whitefield','9876543210','GSTIN98753146','Usha','Bangalore','Bangalore','Karnataka','577054','India',1,_binary '\0',_binary '\0','2024-10-21 09:59:37',2,'tcs@123','tcs@gmail.com');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyindustries`
--

LOCK TABLES `companyindustries` WRITE;
/*!40000 ALTER TABLE `companyindustries` DISABLE KEYS */;
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
-- Table structure for table `companytechonologies`
--

DROP TABLE IF EXISTS `companytechonologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companytechonologies` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CompanyId` bigint DEFAULT NULL,
  `TechnologyId` bigint DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`),
  KEY `FK_CompanyTechonologies_CompanyData` (`CompanyId`),
  KEY `FK_CompanyTechonologies_Technologies` (`TechnologyId`),
  CONSTRAINT `FK_CompanyTechonologies_CompanyData` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_CompanyTechonologies_Technologies` FOREIGN KEY (`TechnologyId`) REFERENCES `technologies` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companytechonologies`
--

LOCK TABLES `companytechonologies` WRITE;
/*!40000 ALTER TABLE `companytechonologies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companytechonologies` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobinterviewrounds`
--

LOCK TABLES `jobinterviewrounds` WRITE;
/*!40000 ALTER TABLE `jobinterviewrounds` DISABLE KEYS */;
INSERT INTO `jobinterviewrounds` VALUES (1,2,'test assesment-1','online test',1);
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
  `Feedback` varchar(45) DEFAULT NULL,
  `HasPassed` bit(1) DEFAULT NULL,
  `Score` int DEFAULT NULL,
  `RoundDate` datetime DEFAULT NULL,
  `col` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPost_Student_idx` (`StudentId`),
  KEY `FK_JobPostStudentRound_JobPostRound_idx` (`JobPostingRoundId`),
  CONSTRAINT `FK_JobPost_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`),
  CONSTRAINT `FK_JobPostStudentRound_JobPostRound` FOREIGN KEY (`JobPostingRoundId`) REFERENCES `jobinterviewrounds` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpost_studentround`
--

LOCK TABLES `jobpost_studentround` WRITE;
/*!40000 ALTER TABLE `jobpost_studentround` DISABLE KEYS */;
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
  `JobDescription` varchar(50) DEFAULT NULL,
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
  `Experience` varchar(100) DEFAULT NULL,
  `JobType` varchar(50) DEFAULT NULL,
  `Shift` varchar(45) DEFAULT NULL,
  `ModeOfWork` varchar(45) DEFAULT NULL,
  `DriveDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_JobPosting_Company_idx` (`CompanyId`),
  KEY `FK_JobPosting_Technology_idx` (`TechnologyId`),
  CONSTRAINT `FK_JobPosting_Company` FOREIGN KEY (`CompanyId`) REFERENCES `companydata` (`Id`),
  CONSTRAINT `FK_JobPosting_Technology` FOREIGN KEY (`TechnologyId`) REFERENCES `technologies` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobposting`
--

LOCK TABLES `jobposting` WRITE;
/*!40000 ALTER TABLE `jobposting` DISABLE KEYS */;
INSERT INTO `jobposting` VALUES (1,2,'Python developer','web application','2024-10-21 15:07:48','2024-10-21 15:07:48',30,9,_binary '\0',_binary '\0',2,900000,'bangalore',NULL,NULL,NULL,NULL,NULL,NULL),(2,2,'pyhton testing ','automation testing','2024-10-21 15:07:48','2024-10-21 15:07:48',18,2,_binary '\0',_binary '\0',2,1800000,'bangalore',NULL,NULL,NULL,NULL,NULL,NULL);
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
  `HasAcceptedOffer` bit(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_jobposting_selectedstudents_JobPosting_idx` (`JobPostingId`),
  KEY `FK_jobposting_selectedstudents_Student_idx` (`StudentId`),
  CONSTRAINT `FK_jobposting_selectedstudents_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_jobposting_selectedstudents_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobposting_selectedstudents`
--

LOCK TABLES `jobposting_selectedstudents` WRITE;
/*!40000 ALTER TABLE `jobposting_selectedstudents` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobposting_selectedstudents` ENABLE KEYS */;
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
  PRIMARY KEY (`Id`),
  KEY `FK_jobpostings_eligiblestudents_Student_idx` (`StudentId`),
  KEY `FK_jobpostings_eligiblestudents_JobPosting_idx` (`JobPostingId`),
  CONSTRAINT `FK_jobpostings_eligiblestudents_JobPosting` FOREIGN KEY (`JobPostingId`) REFERENCES `jobposting` (`Id`),
  CONSTRAINT `FK_jobpostings_eligiblestudents_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpostings_eligiblestudents`
--

LOCK TABLES `jobpostings_eligiblestudents` WRITE;
/*!40000 ALTER TABLE `jobpostings_eligiblestudents` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,1,'ssg@gmail.com','1234','2024-10-18 19:13:03',NULL,2,_binary '\0',_binary '\0',NULL),(2,NULL,'jnnce@gmail.com','1234','2024-10-18 19:13:29',1,1,_binary '\0',_binary '\0',NULL),(3,NULL,'usha@gmail.com','1234','2024-10-18 19:14:02',NULL,3,_binary '\0',_binary '\0',1),(4,2,'tcs@gmail.com','tcs@123','2024-10-21 09:59:37',NULL,2,_binary '\0',_binary '\0',NULL);
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
  `CGPA` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_StudentAcademy_Student_idx` (`StudentId`),
  KEY `FK_Student_Course_idx` (`CourseId`),
  KEY `FK_Student_Stream_idx` (`StreamId`),
  CONSTRAINT `FK_Student_Course` FOREIGN KEY (`CourseId`) REFERENCES `course` (`Id`),
  CONSTRAINT `FK_Student_Stream` FOREIGN KEY (`StreamId`) REFERENCES `stream` (`Id`),
  CONSTRAINT `FK_StudentAcademy_Student` FOREIGN KEY (`StudentId`) REFERENCES `tblstudent` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentacademics`
--

LOCK TABLES `studentacademics` WRITE;
/*!40000 ALTER TABLE `studentacademics` DISABLE KEYS */;
INSERT INTO `studentacademics` VALUES (1,1,1,1,NULL),(2,2,5,1,NULL);
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
  PRIMARY KEY (`Id`),
  KEY `FK_Student_Campus_idx` (`OrgId`),
  KEY `FK_Student_Batch_idx` (`BatchId`),
  CONSTRAINT `FK_Student_Batch` FOREIGN KEY (`BatchId`) REFERENCES `batch` (`Id`),
  CONSTRAINT `FK_Student_Campus` FOREIGN KEY (`OrgId`) REFERENCES `campusregistration` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstudent`
--

LOCK TABLES `tblstudent` WRITE;
/*!40000 ALTER TABLE `tblstudent` DISABLE KEYS */;
INSERT INTO `tblstudent` VALUES (1,NULL,'Akram','Pasha',3,'160090004566','Mulbagala, Kolar, Karnataka - 563131','MSR Nagar, Bangalore, Karnataka','akrampashah1275@gmail.com','8147243278','Hyder Valy','9848022338','1999-06-06 00:00:00','MVJCE00001'),(2,NULL,'Ranjitha','GN',3,'123456789012','Chintamani, Chikka Ballapura, Karnataka - 563134','MSR Nagar, Bangalore, Karnataka','ranju.ssg9902@gmail.com','9845098768','Narayana Swamy','8978675645','1999-10-04 00:00:00','MVJCE00002');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

LOCK TABLES `technologies` WRITE;
/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
INSERT INTO `technologies` VALUES (1,'java','programming language',_binary '\0'),(2,'python','programming language',_binary '\0'),(3,'c#','programming language',_binary '\0');
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

-- Dump completed on 2024-10-22 11:33:58
