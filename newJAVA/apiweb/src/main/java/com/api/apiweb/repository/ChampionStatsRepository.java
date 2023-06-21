package com.api.apiweb.repository;

import com.api.apiweb.domain.Champion_stats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChampionStatsRepository extends JpaRepository<Champion_stats, Integer> {

    @Query("from Champion_stats a order by a.win_rate")
    List<Champion_stats> getChampionStats();

    @Query("from Champion_stats a where a.id = ?1")
    Champion_stats getChampionStatsForChampionId(int championId);

    @Query("from Champion_stats a where a.champion_name = ?1")
    Champion_stats getChampionStatsForChampion(String championName);
}
