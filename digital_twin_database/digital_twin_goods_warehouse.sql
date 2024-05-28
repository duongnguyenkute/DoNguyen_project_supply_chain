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
-- Table structure for table `goods_warehouse`
--

DROP TABLE IF EXISTS `goods_warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_warehouse` (
  `GoodsWarehouseID` varchar(45) NOT NULL,
  `GoodsID` varchar(45) NOT NULL,
  `WarehouseID` varchar(45) NOT NULL,
  `Count` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  PRIMARY KEY (`GoodsWarehouseID`),
  KEY `GoodsID` (`GoodsID`),
  KEY `WarehouseID` (`WarehouseID`),
  CONSTRAINT `goods_warehouse_ibfk_1` FOREIGN KEY (`GoodsID`) REFERENCES `goods` (`GoodsID`),
  CONSTRAINT `goods_warehouse_ibfk_2` FOREIGN KEY (`WarehouseID`) REFERENCES `warehouse` (`WarehouseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_warehouse`
--

LOCK TABLES `goods_warehouse` WRITE;
/*!40000 ALTER TABLE `goods_warehouse` DISABLE KEYS */;
INSERT INTO `goods_warehouse` VALUES ('dec25368-a60c-4285-8de3-92f77940f63b','7b7211bb-4df4-47a4-9d93-5dd0bd4b051e','bb244a26-79e8-4530-813c-bc68f5d92af9',48,290),('GW122','2038dedd-fb34-4707-ab9b-1973470d78fb','4dbba466-bf5d-4759-b9bd-cd6ef8066f57',110,100),('GW1222','b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d','8646cc1c-e7e3-4513-b5c2-fee8889aa5eb',100,100),('GW123','3a25b4ea-e107-4164-a564-10288299aac3','4dbba466-bf5d-4759-b9bd-cd6ef8066f57',220,100),('GW1233','2038dedd-fb34-4707-ab9b-1973470d78fb','bb244a26-79e8-4530-813c-bc68f5d92af9',202,100),('GW124','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','4dbba466-bf5d-4759-b9bd-cd6ef8066f57',100,100),('GW1244','3a25b4ea-e107-4164-a564-10288299aac3','bb244a26-79e8-4530-813c-bc68f5d92af9',100,100),('GW1255','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','bb244a26-79e8-4530-813c-bc68f5d92af9',100,100),('GW126','b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d','4dbba466-bf5d-4759-b9bd-cd6ef8066f57',100,100),('GW127','2038dedd-fb34-4707-ab9b-1973470d78fb','8646cc1c-e7e3-4513-b5c2-fee8889aa5eb',100,100),('GW1277','b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d','bb244a26-79e8-4530-813c-bc68f5d92af9',100,100),('GW128','3a25b4ea-e107-4164-a564-10288299aac3','8646cc1c-e7e3-4513-b5c2-fee8889aa5eb',100,100),('GW129','5c3b8e10-2c6d-411d-9d62-0fd26bccfff1','8646cc1c-e7e3-4513-b5c2-fee8889aa5eb',100,100);
/*!40000 ALTER TABLE `goods_warehouse` ENABLE KEYS */;
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
