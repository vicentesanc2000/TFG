package com.api.apiweb.controller;

import com.api.apiweb.domain.Champion_stats;
import com.api.apiweb.service.ChampionStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/championstats")
@CrossOrigin(origins = "http://localhost:3000")
public class ChampionStatsController {

    @Autowired
    private ChampionStatsService championStatsService;

    @GetMapping("/")
    public ResponseEntity<List<Champion_stats>> getChampionStats() {
        return ResponseEntity.status(HttpStatus.OK).body(championStatsService.getChampionStats());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Champion_stats> getChampionStatsById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(championStatsService.getStatsById(id));
    }

    @GetMapping("/championName/{championName}")
    public ResponseEntity<Champion_stats> getChampionStatsByName(@PathVariable String championName) {
        return ResponseEntity.status(HttpStatus.OK).body(championStatsService.getStatsByName(championName));
    }

    @PostMapping("/save")
    public ResponseEntity<Champion_stats> saveChampionStat(@RequestBody Champion_stats stats) {
        Champion_stats createdStats = championStatsService.guardar(stats);
        return ResponseEntity.status(HttpStatus.OK).body(createdStats);
    }
}
