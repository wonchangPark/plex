-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7a307.p.ssafy.io    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_no` bigint NOT NULL AUTO_INCREMENT,
  `room_code` varchar(255) NOT NULL,
  `room_endtime` datetime(6) DEFAULT NULL,
  `room_gameno` int DEFAULT NULL,
  `room_host` varchar(255) NOT NULL,
  `room_isprivate` bit(1) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `room_roomsize` int NOT NULL,
  `room_starttime` datetime(6) NOT NULL,
  PRIMARY KEY (`room_no`),
  UNIQUE KEY `UK_kr9j3iuvn7xxck7q4kj6hab5w` (`room_code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'nkmaN0fmHz','2022-08-18 17:52:34.274562',1,'박원창',_binary '\0','스쿼트 잘하는 사람 들어오셈',6,'2022-08-18 17:51:23.753151'),(2,'Xk2MIMid5R','2022-08-18 17:55:02.651780',1,'tester',_binary '\0','test',6,'2022-08-18 17:55:00.236901'),(3,'Sbfxjye2WT','2022-08-18 17:55:44.520230',1,'tester',_binary '\0','test',6,'2022-08-18 17:55:05.837785'),(4,'uHn8EKa0Ph','2022-08-18 17:57:19.539433',1,'홍인호',_binary '\0','드루와',6,'2022-08-18 17:57:15.319876'),(5,'1vRDN8FCRb','2022-08-18 17:58:03.231081',1,'박원창',_binary '\0','test',6,'2022-08-18 17:57:35.490215'),(6,'oxYhVEPhKt','2022-08-18 17:58:40.721471',1,'홍인호',_binary '\0','테스트',6,'2022-08-18 17:58:12.309840'),(7,'lb1SWgy3AU','2022-08-18 17:59:10.716870',1,'홍인호',_binary '\0','다시만듬',6,'2022-08-18 17:58:46.177107'),(8,'nrGOizBnyo','2022-08-18 20:51:24.605808',1,'한하평',_binary '\0','game',6,'2022-08-18 20:49:58.829080'),(9,'z06JS1EkQh','2022-08-18 20:53:53.998071',1,'누구게누구게',_binary '\0','game',6,'2022-08-18 20:52:09.097415'),(10,'JwzHu3AIex','2022-08-18 20:54:36.782949',1,'누구게누구게',_binary '\0','run',6,'2022-08-18 20:54:08.485523'),(11,'R3EcCwRPHJ','2022-08-18 20:55:10.593574',1,'누구게누구게',_binary '\0','test',6,'2022-08-18 20:54:49.575234');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 21:24:37
