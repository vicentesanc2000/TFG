package com.api.apiweb.repository;

import com.api.apiweb.domain.Champion_matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChampionMatchesRepository extends JpaRepository<Champion_matches, Integer> {

    @Query("from Champion_matches a order by a.matches_played")
    List<Champion_matches> getChampionMatches();

    @Query("from Champion_matches a where a.id = ?1")
    Champion_matches getChampionMatchesForChampionId(int championId);

    @Query("from Champion_matches a where a.champion_name = ?1")
    Champion_matches getChampionMatchesForChampion(String championName);
}
