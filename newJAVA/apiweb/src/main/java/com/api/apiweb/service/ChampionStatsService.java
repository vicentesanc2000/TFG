package com.api.apiweb.service;

import com.api.apiweb.domain.Champion_stats;
import com.api.apiweb.repository.ChampionStatsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampionStatsService {

    private final ChampionStatsRepository championStatsRepository;

    public ChampionStatsService(ChampionStatsRepository championStatsRepository){
        this.championStatsRepository = championStatsRepository;
    }

    public List<Champion_stats> getChampionStats() {
        return championStatsRepository.getChampionStats();
    }

    public Champion_stats getStatsById(int championId) {
        return championStatsRepository.getChampionStatsForChampionId(championId);
    }

    public Champion_stats getStatsByName(String championName) {
        return championStatsRepository.getChampionStatsForChampion(championName);
    }

    public Champion_stats guardar(Champion_stats stats) {
        return championStatsRepository.save(stats);
    }
}
