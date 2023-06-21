package com.api.apiweb.controller;

import com.api.apiweb.domain.Champion_matches;
import com.api.apiweb.domain.Champion_stats;
import com.api.apiweb.service.ChampionMatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/championmatches")
@CrossOrigin(origins = "http://localhost:3000")
public class ChampionMatchesController {

    @Autowired
    private ChampionMatchesService championMatchesService;

    @GetMapping("/")
    public ResponseEntity<List<Champion_matches>> getChampionMatches() {
        return ResponseEntity.status(HttpStatus.OK).body(championMatchesService.getChampionMatches());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Champion_matches> getChampionMatchesById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(championMatchesService.getMatchesById(id));
    }

    @GetMapping("/championName/{championName}")
    public ResponseEntity<Champion_matches> getChampionMatchesByName(@PathVariable String championName) {
        return ResponseEntity.status(HttpStatus.OK).body(championMatchesService.getMatchesByName(championName));
    }

    @PostMapping("/save")
    public ResponseEntity<Champion_matches> saveChampionStat(@RequestBody Champion_matches matches) {
        Champion_matches createdMatches = championMatchesService.guardar(matches);
        return ResponseEntity.status(HttpStatus.OK).body(createdMatches);
    }
}
