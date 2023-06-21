package com.api.apiweb.service;

import com.api.apiweb.domain.Champion_matches;
import com.api.apiweb.repository.ChampionMatchesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChampionMatchesService {

    private final ChampionMatchesRepository championMatchesRepository;

    public ChampionMatchesService(ChampionMatchesRepository championMatchesRepository) {
        this.championMatchesRepository = championMatchesRepository;
    }

    public List<Champion_matches> getChampionMatches() {
        return championMatchesRepository.getChampionMatches();
    }

    public Champion_matches getMatchesById(int championId){
        return championMatchesRepository.getChampionMatchesForChampionId(championId);
    }

    public Champion_matches getMatchesByName(String championName){
        return championMatchesRepository.getChampionMatchesForChampion(championName);
    }

    public Champion_matches guardar(Champion_matches matches){
        return championMatchesRepository.save(matches);
    }

    public Champion_matches addMatches(int championId, Boolean win) {
        Champion_matches cm = championMatchesRepository.getChampionMatchesForChampionId(championId);
        cm.setMatches_played(cm.getMatches_played() + 1);
        if (win) cm.setMatches_won(cm.getMatches_won() + 1);
        return championMatchesRepository.save(cm);
    }

    public Champion_matches addBan(int championId) {
        Champion_matches cm = championMatchesRepository.getChampionMatchesForChampionId(championId);
        cm.setMatches_banned(cm.getMatches_banned() + 1);
        return championMatchesRepository.save(cm);
    }

}
