package com.api.apiweb.service;

import com.api.apiweb.domain.Matches;
import com.api.apiweb.repository.MatchesRepository;
import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchesService {

    private final MatchesRepository matchesRepository;

    public MatchesService(MatchesRepository matchesRepository){
        this.matchesRepository = matchesRepository;
    }

    public int getMatches(int id){
        return matchesRepository.getMatchesById(id);
    }

    public List<Matches> getAllMatches() {
        return matchesRepository.getAllMatches();
    }

    public Matches guardar(Matches match){
        return matchesRepository.save(match);
    }

    public Matches add1() {
        Matches m = new Matches();
        m.setId(0);
        m.setMatches(matchesRepository.getMatchesById(0) + 1);
        return matchesRepository.save(m);
    }
}
