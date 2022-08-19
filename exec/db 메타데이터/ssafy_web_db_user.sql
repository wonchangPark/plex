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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT NULL,
  `user_expiredate` datetime(6) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_nick` varchar(100) NOT NULL,
  `user_pw` varchar(255) NOT NULL,
  `user_registerdate` datetime(6) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK_23fkpdormb3jwywokgb1gvls5` (`user_nick`),
  UNIQUE KEY `UK_a3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'whale','박원창','$2a$10$XnBl4R26gBC5glUJJoLv1ep7dRz/6Ect732z9Jl0xv8RlCnzWDfkC','2022-08-18 17:50:36.815085','pwc0213'),(2,NULL,NULL,'gummybear','tester','$2a$10$aL1XO.oeiKPauW50sejoQOTS04YnnW/7UpZyBrkBRCetQrNRLoGbC','2022-08-18 17:53:31.087765','test'),(3,NULL,NULL,'slime','홍인호','$2a$10$Giq9YTcrOKRgdMzj2f6ITek4qII3YCULGgOFxt5WT0SlOSAASYsV2','2022-08-18 17:56:48.213500','hong1'),(4,NULL,NULL,'gummybear','한하평','$2a$10$1P09vuqyoOCUUSAyYWpnrejZsIJNlQq/Wpy695DYnUkYZ8JuTJj8q','2022-08-18 18:00:41.979614','hana'),(5,NULL,NULL,'sushi','정예원','$2a$10$EjEcOEOgUfBTnd6ttqfSEO9xE8KNE5ZzkeP59zoMIVC8kUbtQ0dL.','2022-08-18 18:10:17.920944','asdfasdf'),(6,NULL,NULL,'stone','김지훈','$2a$10$43GV1jL8OGJvvVIkD4aqC.btjBzLOd8dM0fna3sa1M8u06NQa4ObW','2022-08-18 18:10:34.446492','qwerty'),(7,NULL,NULL,'gummybear','김용환','$2a$10$vGm9VNvwknOKwZDDGocPlOh45UEuM3EeOTVRW5mHUiSyObXoPchK6','2022-08-18 18:10:46.483442','ymin96'),(8,NULL,NULL,'pudding','닉네임추천좀','$2a$10$JBBc7QZ/7sSGHQmqEbGCTO9VEmaPDABSpF2Pb0heidK8Uk/6kZzJK','2022-08-18 18:18:22.026427','qwerqwer'),(9,NULL,NULL,'slime','콩콩콩','$2a$10$BIIAIG.eak21fB28MM/jBO.RYoidfLe3ti5D8HJz9JQ48E9VADvZu','2022-08-18 18:18:30.013457','hong2'),(10,NULL,NULL,'whale','누구게누구게','$2a$10$OG8HEnOKeZ4CQWNUwO8MbuBUHB5sX4p9l/OuTDGSnqBPNtQS5ajVS','2022-08-18 18:18:39.182555','han1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 21:24:35
