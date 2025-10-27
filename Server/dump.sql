-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: frc2
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `alianca`
--

DROP TABLE IF EXISTS `alianca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alianca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` enum('azul','vermelho') DEFAULT NULL,
  `time1` int NOT NULL,
  `time2` int NOT NULL,
  `teleop_pontos` int NOT NULL,
  `auto_pontos` int NOT NULL,
  `faltas_pontos` int NOT NULL,
  `total_pontos` int NOT NULL,
  `total_rp` int NOT NULL,
  `partida_id` int DEFAULT NULL,
  `idade_media` int NOT NULL,
  `pre_historico` int NOT NULL,
  `estacionar` int NOT NULL,
  `sair` int NOT NULL,
  `falta_estacionar` int NOT NULL,
  `falta_transp` int NOT NULL,
  `falta_prh` int NOT NULL,
  `falta_branca` int NOT NULL,
  `pre_historico_au` int NOT NULL,
  `idade_media_au` int NOT NULL,
  `poco_au` int NOT NULL,
  `poco_endgame` int NOT NULL,
  `sitio` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `time1_idx` (`time1`),
  KEY `time2_idx` (`time2`),
  KEY `partida_id_idx` (`partida_id`),
  CONSTRAINT `partida_id` FOREIGN KEY (`partida_id`) REFERENCES `partida` (`id`),
  CONSTRAINT `time1` FOREIGN KEY (`time1`) REFERENCES `equipe` (`numero_equipe`),
  CONSTRAINT `time2` FOREIGN KEY (`time2`) REFERENCES `equipe` (`numero_equipe`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alianca`
--

LOCK TABLES `alianca` WRITE;
/*!40000 ALTER TABLE `alianca` DISABLE KEYS */;
INSERT INTO `alianca` VALUES (206,'azul',9110,10019,33,46,0,97,2,65,18,55,13,5,0,0,0,0,0,0,0,0,0),(207,'vermelho',8882,9050,28,33,16,69,2,65,28,30,7,1,6,2,6,2,0,0,0,0,0),(208,'azul',10019,7565,0,0,0,0,0,66,0,0,0,0,0,0,0,0,0,0,0,0,0),(209,'vermelho',9050,9110,0,0,0,0,0,66,0,0,0,0,0,0,0,0,0,0,0,0,0),(210,'azul',7565,8882,0,0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,0,0),(211,'vermelho',9110,10019,0,0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,0,0),(212,'azul',8882,9050,0,0,0,0,0,68,0,0,0,0,0,0,0,0,0,0,0,0,0),(213,'vermelho',10019,7565,0,0,0,0,0,68,0,0,0,0,0,0,0,0,0,0,0,0,0),(214,'azul',9050,9110,0,0,0,0,0,69,0,0,0,0,0,0,0,0,0,0,0,0,0),(215,'vermelho',7565,8882,0,0,0,0,0,69,0,0,0,0,0,0,0,0,0,0,0,0,0),(216,'azul',7565,9050,0,0,0,0,0,70,0,0,0,0,0,0,0,0,0,0,0,0,0),(217,'vermelho',8882,10019,0,0,0,0,0,70,0,0,0,0,0,0,0,0,0,0,0,0,0),(218,'azul',9110,7565,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0),(219,'vermelho',9050,8882,0,0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,0),(220,'azul',10019,8882,0,0,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,0),(221,'vermelho',9110,9050,0,0,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,0),(222,'azul',7565,8882,0,0,0,0,0,73,0,0,0,0,0,0,0,0,0,0,0,0,0),(223,'vermelho',10019,9110,0,0,0,0,0,73,0,0,0,0,0,0,0,0,0,0,0,0,0),(224,'azul',8882,10019,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0),(225,'vermelho',7565,9050,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0),(226,'azul',9050,9110,0,0,0,0,0,75,0,0,0,0,0,0,0,0,0,0,0,0,0),(227,'vermelho',8882,7565,0,0,0,0,0,75,0,0,0,0,0,0,0,0,0,0,0,0,0),(228,'azul',9110,8882,0,0,0,0,0,76,0,0,0,0,0,0,0,0,0,0,0,0,0),(229,'vermelho',9050,10019,0,0,0,0,0,76,0,0,0,0,0,0,0,0,0,0,0,0,0),(230,'azul',10019,9050,0,0,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0),(231,'vermelho',9110,8882,0,0,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0),(232,'azul',7565,9110,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,0,0,0),(233,'vermelho',10019,9050,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,0,0,0),(234,'azul',8882,9050,0,0,0,0,0,79,0,0,0,0,0,0,0,0,0,0,0,0,0),(235,'vermelho',7565,10019,0,0,0,0,0,79,0,0,0,0,0,0,0,0,0,0,0,0,0),(236,'azul',9110,7565,0,0,0,0,0,80,0,0,0,0,0,0,0,0,0,0,0,0,0),(237,'vermelho',8882,9050,0,0,0,0,0,80,0,0,0,0,0,0,0,0,0,0,0,0,0),(238,'azul',10019,8882,0,0,0,0,0,81,0,0,0,0,0,0,0,0,0,0,0,0,0),(239,'vermelho',9050,9110,0,0,0,0,0,81,0,0,0,0,0,0,0,0,0,0,0,0,0),(240,'azul',7565,9050,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0),(241,'vermelho',9110,10019,0,0,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0),(242,'azul',9050,10019,0,0,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,0,0),(243,'vermelho',7565,8882,0,0,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,0,0),(244,'azul',9110,7565,0,0,0,0,0,84,0,0,0,0,0,0,0,0,0,0,0,0,0),(245,'vermelho',8882,10019,0,0,0,0,0,84,0,0,0,0,0,0,0,0,0,0,0,0,0),(248,'azul',9110,10019,0,0,0,7,0,86,0,0,4,3,0,0,0,0,0,0,0,0,0),(249,'vermelho',7565,8882,12,30,16,52,1,86,2,10,9,1,6,2,6,2,20,10,6,2,1);
/*!40000 ALTER TABLE `alianca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipe` (
  `numero_equipe` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `pontos_ranking` int NOT NULL,
  `media_pontos` double NOT NULL,
  PRIMARY KEY (`numero_equipe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe`
--

LOCK TABLES `equipe` WRITE;
/*!40000 ALTER TABLE `equipe` DISABLE KEYS */;
INSERT INTO `equipe` VALUES (7565,'Robonáticos',0,0),(8882,'Infinity',0,0),(9050,'Tucanus',0,0),(9110,'Atomiic',0,0),(10019,'MinerSkills',0,0);
/*!40000 ALTER TABLE `equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_partida` int NOT NULL,
  `tipo_partida` enum('qualificatorias','eliminatorias','treino') NOT NULL,
  `azul_pontos` int NOT NULL,
  `vermelho_pontos` int NOT NULL,
  `status` enum('agendada','em_progresso','completada') NOT NULL DEFAULT 'agendada',
  `vencedor` enum('azul','vermelho','empate','no') NOT NULL,
  `horario` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (65,1,'qualificatorias',0,0,'em_progresso','no','09:00'),(66,2,'qualificatorias',0,0,'agendada','no','09:20'),(67,3,'qualificatorias',0,0,'agendada','no','09:40'),(68,4,'qualificatorias',0,0,'agendada','no','10:00'),(69,5,'qualificatorias',0,0,'agendada','no','10:20'),(70,6,'qualificatorias',0,0,'agendada','no','10:40'),(71,7,'qualificatorias',0,0,'agendada','no','11:00'),(72,8,'qualificatorias',0,0,'agendada','no','11:20'),(73,9,'qualificatorias',0,0,'agendada','no','13:00'),(74,10,'qualificatorias',0,0,'agendada','no','13:20'),(75,11,'qualificatorias',0,0,'agendada','no','13:40'),(76,12,'qualificatorias',0,0,'agendada','no','14:00'),(77,13,'qualificatorias',0,0,'agendada','no','14:20'),(78,14,'qualificatorias',0,0,'agendada','no','14:40'),(79,15,'qualificatorias',0,0,'agendada','no','15:00'),(80,16,'qualificatorias',0,0,'agendada','no','15:20'),(81,17,'qualificatorias',0,0,'agendada','no','15:40'),(82,18,'qualificatorias',0,0,'agendada','no','16:00'),(83,19,'qualificatorias',0,0,'em_progresso','no','16:20'),(84,20,'qualificatorias',0,0,'em_progresso','no','16:40'),(86,44,'treino',0,0,'em_progresso','no','11:47');
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ranking_view`
--

DROP TABLE IF EXISTS `ranking_view`;
/*!50001 DROP VIEW IF EXISTS `ranking_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ranking_view` AS SELECT 
 1 AS `numero_equipe`,
 1 AS `nome`,
 1 AS `total_rp`,
 1 AS `partidas_jogadas`,
 1 AS `ranking_score`,
 1 AS `match_score`,
 1 AS `vitorias`,
 1 AS `derrotas`,
 1 AS `empates`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `ranking_view`
--

/*!50001 DROP VIEW IF EXISTS `ranking_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ranking_view` AS select `e`.`numero_equipe` AS `numero_equipe`,`e`.`nome` AS `nome`,sum((case when (`p`.`status` = 'completada') then `a`.`total_rp` else 0 end)) AS `total_rp`,count(distinct (case when (`p`.`status` = 'completada') then `a`.`partida_id` end)) AS `partidas_jogadas`,round((sum((case when (`p`.`status` = 'completada') then `a`.`total_rp` else 0 end)) / nullif(count(distinct (case when (`p`.`status` = 'completada') then `a`.`partida_id` end)),0)),2) AS `ranking_score`,round(avg((case when (`p`.`status` = 'completada') then `a`.`total_pontos` end)),2) AS `match_score`,sum((case when ((`p`.`status` = 'completada') and (((`a`.`color` = 'azul') and (`p`.`vencedor` = 'azul')) or ((`a`.`color` = 'vermelho') and (`p`.`vencedor` = 'vermelho')))) then 1 else 0 end)) AS `vitorias`,sum((case when ((`p`.`status` = 'completada') and (((`a`.`color` = 'azul') and (`p`.`vencedor` = 'vermelho')) or ((`a`.`color` = 'vermelho') and (`p`.`vencedor` = 'azul')))) then 1 else 0 end)) AS `derrotas`,sum((case when ((`p`.`status` = 'completada') and (`p`.`vencedor` = 'empate')) then 1 else 0 end)) AS `empates` from ((`equipe` `e` left join `alianca` `a` on((`e`.`numero_equipe` in (`a`.`time1`,`a`.`time2`)))) left join `partida` `p` on((`p`.`id` = `a`.`partida_id`))) group by `e`.`numero_equipe`,`e`.`nome` order by `total_rp` desc,`ranking_score` desc,`match_score` desc,`vitorias` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-24 18:43:23
