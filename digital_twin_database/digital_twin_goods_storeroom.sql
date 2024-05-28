CREATE DATABASE  IF NOT EXISTS `digital_twin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `digital_twin`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: digital_twin
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `goods_storeroom`
--

DROP TABLE IF EXISTS `goods_storeroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_storeroom` (
  `GoodsStoreroomID` varchar(45) NOT NULL,
  `GoodsID` varchar(45) NOT NULL,
  `StoreRoomID` varchar(45) NOT NULL,
  `Count` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  PRIMARY KEY (`GoodsStoreroomID`),
  KEY `GoodsID` (`GoodsID`),
  KEY `StoreRoomID` (`StoreRoomID`),
  CONSTRAINT `goods_storeroom_ibfk_1` FOREIGN KEY (`GoodsID`) REFERENCES `goods` (`GoodsID`),
  CONSTRAINT `goods_storeroom_ibfk_2` FOREIGN KEY (`StoreRoomID`) REFERENCES `storeroom` (`StoreRoomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_storeroom`
--

LOCK TABLES `goods_storeroom` WRITE;
/*!40000 ALTER TABLE `goods_storeroom` DISABLE KEYS */;
INSERT INTO `goods_storeroom` VALUES ('02faa282-5047-44fa-ab83-45aa3ff96531','3a25b4ea-e107-4164-a564-10288299aac3','f735a1c9-3bf2-4a10-a3ab-223f891c802b',420,100),('64580627-bf76-4fe1-8527-b56cc3b1d7f5','3a25b4ea-e107-4164-a564-10288299aac3','00407ab7-7ecc-4daf-9483-d99fd4bd758d',420,100),('6580ad4c-ebc5-4c5f-9454-84f6f57e5809','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','00407ab7-7ecc-4daf-9483-d99fd4bd758d',123,100),('727d83f6-9ea9-4ead-a613-e65ec7fbb84f','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','f735a1c9-3bf2-4a10-a3ab-223f891c802b',200,100),('7411d285-6693-4879-bd1a-fa0abdc2dc4f','b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d','f06d25fe-73b5-4397-9ba8-800c20e966c4',500,100),('81bcc474-1e8b-4988-b4bd-76a41d1e8150','2038dedd-fb34-4707-ab9b-1973470d78fb','3ab13ca3-4586-49b7-b6b5-f1164eb84c10',1,100),('91de26ff-a3cd-4d40-ab46-b8abbd0bc9ad','2038dedd-fb34-4707-ab9b-1973470d78fb','f06d25fe-73b5-4397-9ba8-800c20e966c4',1054,100),('9600e3f2-81d8-4cc2-9290-20c48ed3dd3f','3a25b4ea-e107-4164-a564-10288299aac3','f06d25fe-73b5-4397-9ba8-800c20e966c4',740,100),('9f7f1883-4cd4-41ec-a978-42310884581a','7b7211bb-4df4-47a4-9d93-5dd0bd4b051e','00407ab7-7ecc-4daf-9483-d99fd4bd758d',16,290),('a10fa8a2-4ffc-4012-a4ce-3c2c9feaca7e','2038dedd-fb34-4707-ab9b-1973470d78fb','f735a1c9-3bf2-4a10-a3ab-223f891c802b',123,100),('def52f05-1774-4861-af4a-fe9536f63ae8','2038dedd-fb34-4707-ab9b-1973470d78fb','00407ab7-7ecc-4daf-9483-d99fd4bd758d',247,100),('f86051bc-68cb-408a-a76b-6285e38fece6','b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d','f735a1c9-3bf2-4a10-a3ab-223f891c802b',300,100),('GS1','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','f06d25fe-73b5-4397-9ba8-800c20e966c4',444,100);
/*!40000 ALTER TABLE `goods_storeroom` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28  8:57:58
