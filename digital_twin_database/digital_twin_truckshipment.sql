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
-- Table structure for table `truckshipment`
--

DROP TABLE IF EXISTS `truckshipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truckshipment` (
  `TruckShipmentID` varchar(45) NOT NULL,
  `Location` varchar(45) DEFAULT NULL,
  `StockLevel` varchar(45) DEFAULT NULL,
  `Temperature` int DEFAULT NULL,
  `Humidity` int DEFAULT NULL,
  `WarehouseID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TruckShipmentID`),
  KEY `WarehouseID` (`WarehouseID`),
  CONSTRAINT `truckshipment_ibfk_1` FOREIGN KEY (`WarehouseID`) REFERENCES `warehouse` (`WarehouseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truckshipment`
--

LOCK TABLES `truckshipment` WRITE;
/*!40000 ALTER TABLE `truckshipment` DISABLE KEYS */;
INSERT INTO `truckshipment` VALUES ('68a34f5c-0584-41c0-8448-d06eb28cc746','11.32309890 105.00000','100',30,28,'bb244a26-79e8-4530-813c-bc68f5d92af9'),('9394ea99-2697-4bab-81ab-ab6d57ded77a','17.000000 107.590866','100',30,28,'4dbba466-bf5d-4759-b9bd-cd6ef8066f57'),('9d7e6012-8d78-43b0-bef0-bf3cdd0268b7','20.00000 105.84117','100',30,28,'8646cc1c-e7e3-4513-b5c2-fee8889aa5eb');
/*!40000 ALTER TABLE `truckshipment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28  8:57:57
