SELECT
  `e`.`numero_equipe` AS `numero_equipe`,
  `e`.`nome` AS `nome`,
  sum(
    CASE
      WHEN `p`.`status` = 'completada' THEN `a`.`total_rp`
      ELSE 0
    END
  ) AS `total_rp`,
  count(
    DISTINCT CASE
      WHEN `p`.`status` = 'completada' THEN `a`.`partida_id`
    END
  ) AS `partidas_jogadas`,
  round(
    sum(
      CASE
        WHEN `p`.`status` = 'completada' THEN `a`.`total_rp`
        ELSE 0
      END
    ) / nullif(
      count(
        DISTINCT CASE
          WHEN `p`.`status` = 'completada' THEN `a`.`partida_id`
        END
      ),
      0
    ),
    2
  ) AS `ranking_score`,
  round(
    avg(
      CASE
        WHEN `p`.`status` = 'completada' THEN `a`.`total_pontos`
      END
    ),
    2
  ) AS `match_score`,
  sum(
    CASE
      WHEN `p`.`status` = 'completada'
      AND (
        `a`.`color` = 'azul'
        AND `p`.`vencedor` = 'azul'
        OR `a`.`color` = 'vermelho'
        AND `p`.`vencedor` = 'vermelho'
      ) THEN 1
      ELSE 0
    END
  ) AS `vitorias`,
  sum(
    CASE
      WHEN `p`.`status` = 'completada'
      AND (
        `a`.`color` = 'azul'
        AND `p`.`vencedor` = 'vermelho'
        OR `a`.`color` = 'vermelho'
        AND `p`.`vencedor` = 'azul'
      ) THEN 1
      ELSE 0
    END
  ) AS `derrotas`,
  sum(
    CASE
      WHEN `p`.`status` = 'completada'
      AND `p`.`vencedor` = 'empate' THEN 1
      ELSE 0
    END
  ) AS `empates`
FROM
  (
    (
      `modf`.`equipe` `e`
      LEFT JOIN `modf`.`alianca` `a` ON(`e`.`numero_equipe` IN (`a`.`time1`, `a`.`time2`))
    )
    LEFT JOIN `modf`.`partida` `p` ON(`p`.`id` = `a`.`partida_id`)
  )
GROUP BY
  `e`.`numero_equipe`,
  `e`.`nome`
ORDER BY
  sum(
    CASE
      WHEN `p`.`status` = 'completada' THEN `a`.`total_rp`
      ELSE 0
    END
  ) DESC,
  round(
    sum(
      CASE
        WHEN `p`.`status` = 'completada' THEN `a`.`total_rp`
        ELSE 0
      END
    ) / nullif(
      count(
        DISTINCT CASE
          WHEN `p`.`status` = 'completada' THEN `a`.`partida_id`
        END
      ),
      0
    ),
    2
  ) DESC,
  round(
    avg(
      CASE
        WHEN `p`.`status` = 'completada' THEN `a`.`total_pontos`
      END
    ),
    2
  ) DESC,
  sum(
    CASE
      WHEN `p`.`status` = 'completada'
      AND (
        `a`.`color` = 'azul'
        AND `p`.`vencedor` = 'azul'
        OR `a`.`color` = 'vermelho'
        AND `p`.`vencedor` = 'vermelho'
      ) THEN 1
      ELSE 0
    END
  ) DESC