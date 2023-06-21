package com.api.apiweb.service;

import com.api.apiweb.domain.MatchIds;
import com.api.apiweb.repository.MatchIdsRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class MatchIdsService {

    private final MatchIdsRepository repository;

    public MatchIdsService(MatchIdsRepository repository) {
        this.repository = repository;
    }

    public MatchIds alreadyExists(String id) {
        return repository.alreadyExists(id);
    }

    public List<MatchIds> getMatchIds() {
        return repository.getMatchIds();
    }

    public List<MatchIds> getMatchIdsOrderedByDate() {
        return repository.getMatchIdsOrderedByDate();
    }

    public Timestamp getMatchDate(String id) {
        return repository.getMatchDate(id);
    }

    public MatchIds guardar(MatchIds match) {
        return repository.save(match);
    }
}
