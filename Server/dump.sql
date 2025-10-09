-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: frc_score
-- ------------------------------------------------------
-- Server version	8.0.43

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
  `partida_id` int NOT NULL,
  `color` varchar(4) DEFAULT NULL,
  `time1` int NOT NULL,
  `time2` int NOT NULL,
  `time3` int NOT NULL,
  `auto_pontos` int NOT NULL,
  `teleop_pontos` int NOT NULL,
  `faltas_pontos` int NOT NULL,
  `total_pontos` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `time1_idx` (`time1`),
  KEY `time2_idx` (`time2`),
  KEY `time3_idx` (`time3`),
  CONSTRAINT `time1` FOREIGN KEY (`time1`) REFERENCES `equipe` (`numero_equipe`),
  CONSTRAINT `time2` FOREIGN KEY (`time2`) REFERENCES `equipe` (`numero_equipe`),
  CONSTRAINT `time3` FOREIGN KEY (`time3`) REFERENCES `equipe` (`numero_equipe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alianca`
--

LOCK TABLES `alianca` WRITE;
/*!40000 ALTER TABLE `alianca` DISABLE KEYS */;
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
  `localizacao` varchar(100) NOT NULL,
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
/*!40000 ALTER TABLE `equipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `id` int NOT NULL,
  `numero_partida` int NOT NULL,
  `tipo_partida` enum('qualificacao','eliminatorias') NOT NULL,
  `azul_pontos` int NOT NULL,
  `vermelho_pontos` int NOT NULL,
  `status` enum('agendada','em_progresso','completada') NOT NULL,
  `vencedor` varchar(4) NOT NULL,
  `alianca_vermelha` int NOT NULL,
  `alianca_azul` int NOT NULL,
  `horario` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `horario_UNIQUE` (`horario`),
  KEY `alianca_azul_idx` (`alianca_azul`),
  KEY `alianca_vermelha_idx` (`alianca_vermelha`),
  CONSTRAINT `alianca_azul` FOREIGN KEY (`alianca_azul`) REFERENCES `alianca` (`id`),
  CONSTRAINT `alianca_vermelha` FOREIGN KEY (`alianca_vermelha`) REFERENCES `alianca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE OR REPLACE VIEW ranking_view AS
SELECT 
    e.numero_equipe,
    e.nome,
    e.localizacao,
    COUNT(DISTINCT p.id) AS partidas_jogadas,
    SUM(
        CASE
            WHEN p.vencedor = a.color THEN 2
            WHEN p.vencedor = 'TIE' THEN 1
            ELSE 0
        END
    ) AS total_rp,
    ROUND(
        SUM(
            CASE
                WHEN p.vencedor = a.color THEN 2
                WHEN p.vencedor = 'TIE' THEN 1
                ELSE 0
            END
        ) / COUNT(DISTINCT p.id), 2
    ) AS media_rp,
    SUM(a.auto_pontos) AS total_auto,
    SUM(a.teleop_pontos) AS total_teleop,
    SUM(a.faltas_pontos) AS total_faltas,
    SUM(a.total_pontos) AS total_pontos
FROM equipe e
JOIN alianca a 
  ON e.numero_equipe IN (a.time1, a.time2, a.time3)
JOIN partida p 
  ON p.id = a.partida_id
WHERE p.tipo_partida = 'qualificacao'
  AND p.status = 'completada'
GROUP BY e.numero_equipe, e.nome, e.localizacao
ORDER BY total_rp DESC, media_rp DESC, total_auto DESC, total_teleop DESC;


--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-09 15:05:38
