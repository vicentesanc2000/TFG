package com.api.apiweb.controller;

import com.api.apiweb.domain.Matches;
import com.api.apiweb.service.MatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchesController {

    @Autowired
    private MatchesService matchesService;

    @GetMapping("/")
    public ResponseEntity<Integer> getMatches() {
        return ResponseEntity.status(HttpStatus.OK).body(matchesService.getMatches(0));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Integer> getMatchesById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(matchesService.getMatches(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Matches>> getAllMatches() {
        return ResponseEntity.status(HttpStatus.OK).body(matchesService.getAllMatches());
    }

    @PostMapping("/save")
    public ResponseEntity<Matches> saveMacthes(@RequestBody Matches matches) {
        Matches createdMatches = matchesService.guardar(matches);
        return ResponseEntity.status(HttpStatus.OK).body(createdMatches);
    }
}
