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
-- Table structure for table `score_history`
--

DROP TABLE IF EXISTS `score_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_history` (
  `scorehistory_no` bigint NOT NULL AUTO_INCREMENT,
  `scorehistory_exercisenum` bigint DEFAULT NULL,
  `game_no` bigint NOT NULL,
  `scorehistory_score` bigint DEFAULT '0',
  `scorehistory_teamno` int NOT NULL,
  `scorehistory_win` bit(1) DEFAULT NULL,
  `gamehistory_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`scorehistory_no`),
  KEY `FKimjxn97xvtojx1waqw7nooat8` (`gamehistory_no`),
  KEY `FK2w18n5vtmeee6oaf7c44srapf` (`user_no`),
  CONSTRAINT `FK2w18n5vtmeee6oaf7c44srapf` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKimjxn97xvtojx1waqw7nooat8` FOREIGN KEY (`gamehistory_no`) REFERENCES `game_history` (`gamehistory_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_history`
--

LOCK TABLES `score_history` WRITE;
/*!40000 ALTER TABLE `score_history` DISABLE KEYS */;
INSERT INTO `score_history` VALUES (1,2,2,200,0,_binary '',1,2),(2,2,2,200,0,_binary '',2,1),(3,2,2,200,0,_binary '',3,3),(4,1,1,200,1,_binary '',4,3),(5,1,1,150,1,_binary '',5,4),(6,2,2,200,0,_binary '',6,10),(7,2,2,200,0,_binary '',7,10),(8,1,1,200,1,_binary '',8,10);
/*!40000 ALTER TABLE `score_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 21:24:33
