package com.api.apiweb.repository;

import com.api.apiweb.domain.MatchIds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface MatchIdsRepository extends JpaRepository<MatchIds, String> {

    @Query("from MatchIds a where a.id = ?1")
    MatchIds alreadyExists(String matchId);

    @Query("select id from MatchIds ")
    List<MatchIds> getMatchIds();

    @Query("from MatchIds a order by a.date")
    List<MatchIds> getMatchIdsOrderedByDate();

    @Query("select a.date from MatchIds a where a.id = ?1")
    Timestamp getMatchDate(String id);
}
