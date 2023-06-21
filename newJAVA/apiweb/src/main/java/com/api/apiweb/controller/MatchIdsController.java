package com.api.apiweb.controller;

import com.api.apiweb.domain.MatchIds;
import com.api.apiweb.service.MatchIdsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/matchids")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchIdsController {

    @Autowired
    private MatchIdsService service;

    //falla cuando solo hay un elemento en la tabla
    @GetMapping("/")
    public ResponseEntity<List<MatchIds>> getMatchIds() {
        return ResponseEntity.status(HttpStatus.OK).body(service.getMatchIds());
    }

    @GetMapping("/ordered")
    public ResponseEntity<List<MatchIds>> getMatchIdsOrderedByDate() {
        return ResponseEntity.status(HttpStatus.OK).body(service.getMatchIdsOrderedByDate());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchIds> alreadyExists(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.alreadyExists(id));
    }

    @GetMapping("/getdate/{id}")
    public ResponseEntity<Timestamp> getMatchDate(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.getMatchDate(id));
    }

    @PostMapping("/save")
    public ResponseEntity<MatchIds> saveMacthId(@RequestBody MatchIds match) {
        MatchIds createdMatch = service.guardar(match);
        return ResponseEntity.status(HttpStatus.OK).body(createdMatch);
    }
}
