package com.api.apiweb.repository;

import com.api.apiweb.domain.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchesRepository extends JpaRepository<Matches, Integer> {

    @Query("select a.matches from Matches a where a.id = ?1")
    int getMatchesById(int id);

    @Query("from Matches a order by a.id")
    List<Matches> getAllMatches();
}
