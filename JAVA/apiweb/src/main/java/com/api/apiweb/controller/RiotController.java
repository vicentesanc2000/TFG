package com.api.apiweb.controller;

import com.api.apiweb.domain.Champion_matches;
import com.api.apiweb.domain.Champion_stats;
import com.api.apiweb.domain.MatchIds;
import com.api.apiweb.service.ChampionMatchesService;
import com.api.apiweb.service.ChampionStatsService;
import com.api.apiweb.service.MatchIdsService;
import com.api.apiweb.service.MatchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.json.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/riot")
@CrossOrigin(origins = "http://localhost:3000")
public class RiotController {

    private final String APIKEY = "api_key=RGAPI-a54b8a5d-4868-461c-8478-d469234a1d47";
    //private final String PATCH = "13.3.1";
    private final String baseUrl= "https://";

    @Autowired
    private MatchIdsService matchIdsService;
    @Autowired
    private MatchesService matchesService;
    @Autowired
    private ChampionMatchesService championMatchesService;
    @Autowired
    private ChampionStatsService championStatsService;

    private RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/{server}/getsummonerbyname/{summoner}")
    public ResponseEntity<String> getSummonerByName(@PathVariable String server, @PathVariable String summoner) {
        String url = baseUrl + server + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summoner + "?" + APIKEY;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("/{region}/getlistofmatches/{puuid}/{matchIndex}")
    public ResponseEntity<String> getListOfMatches(@PathVariable String region, @PathVariable String puuid, @PathVariable String matchIndex) {
        String url = baseUrl + region + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=" + matchIndex + "&count=2&" + APIKEY;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("/{region}/getmatchinfo/{matchID}")
    public ResponseEntity<String> getMatchInfo(@PathVariable String region, @PathVariable String matchID) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept","*/*");

        String url = baseUrl + region + ".api.riotgames.com/lol/match/v5/matches/" + matchID + "?" + APIKEY;

        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        //ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("/{server}/getLeagueEntries/{summonerEncryptedId}")
    public ResponseEntity<String> getLeagueEntries(@PathVariable String server, @PathVariable String summonerEncryptedId) {
        String url = baseUrl + server + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerEncryptedId + "?" + APIKEY;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

    @GetMapping("/{server}/getChallengerLeague/{queue}")
    public ResponseEntity<String> getChallengerLeague(@PathVariable String server, @PathVariable String queue) throws JSONException {
        String url = baseUrl + server + ".api.riotgames.com/lol/league/v4/challengerleagues/by-queue/" + queue + "?" + APIKEY;
        JSONObject challengerLeague = new JSONObject(restTemplate.getForEntity(url, String.class).getBody());
        JSONArray playerList = challengerLeague.getJSONArray("entries");
        return ResponseEntity.status(HttpStatus.OK).body(playerList.toString());
    }

    //endpoint para llamar a la función que inserta los datos de las partidas en la BD
    @GetMapping("/updatestats")
    public void updatestats() throws JSONException {

        String[] servers = {"euw1","na1","kr"};

        //analizamos los servidores de las regiones mayoritarias (China no está disponible)
        for (String s : servers) {
            String region = getRegionForServer(s);
            //conexion http descarga lista de jugadores en json con resttemplate
            String url = baseUrl + s + ".api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?" + APIKEY;
            //parsear el json para hacer un json object
            JSONObject challengerLeague = new JSONObject(restTemplate.getForEntity(url, String.class).getBody());
            JSONArray playerList = challengerLeague.getJSONArray("entries");

            //analizamos los 300 jugadores de cada región
            for (int playerNumber = 0; playerNumber < playerList.length(); playerNumber++) {
                String summonerId = playerList.getJSONObject(playerNumber).getString("summonerId");
                url = baseUrl + s + ".api.riotgames.com/lol/summoner/v4/summoners/" + summonerId + "?" + APIKEY;
                JSONObject player = new JSONObject(restTemplate.getForEntity(url, String.class).getBody());
                String puuid = player.getString("puuid");
                //queue 420 --> soloq, count 20 --> numero de partidas que vamos a analizar de cada jugador, start 0 --> empezamos a contar desde la última partida
                url = baseUrl + region + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?queue=420&start=0&count=20&" + APIKEY;
                JSONArray matchList = new JSONArray(restTemplate.getForEntity(url, String.class).getBody());

                //analizamos 20 partidas de cada jugador
                for (int matchNumber = 0; matchNumber < matchList.length(); matchNumber++) {
                    String matchID = matchList.getString(matchNumber);

                    //comprobar que el ID de la partida no existe en matchIds, si existe no se hace nada, si no existe se añade a la tabla, se suma uno a la cantidad de partidas y se analiza la partida
                    if (!restTemplate.getForEntity("http://localhost:8080/matchids/" + matchID, String.class).hasBody()) {

                        //sumar 1 al número de partidas analizadas
                        matchesService.add1();

                        //obtenemos la informacion de la partida en formato json
                        url = baseUrl + region + ".api.riotgames.com/lol/match/v5/matches/" + matchID + "?" + APIKEY;
                        JSONObject match = new JSONObject(restTemplate.getForEntity(url, String.class).getBody());

                        //añadir la partida a matchids
                        Timestamp date = new Timestamp(match.getJSONObject("info").getLong("gameStartTimestamp"));
                        MatchIds mids = new MatchIds();
                        mids.setDate(date);
                        mids.setID(matchID);
                        matchIdsService.guardar(mids);

                        //analizar a los 10 jugadores de cada partida
                        JSONArray participants = new JSONArray(match.getJSONObject("info").getJSONArray("participants"));
                        for (int participantNumber = 0; participantNumber < participants.length(); participantNumber++) {
                            JSONObject participant = participants.getJSONObject(participantNumber);
                            championMatchesService.addMatches(participant.getInt("championId"), participant.getBoolean("win"));
                        }

                        //analizar los bans de cada partida
                        JSONArray teams = new JSONArray(match.getJSONObject("info").getJSONArray("teams"));
                        //recorrer los dos equipos
                        for (int team = 0; team < teams.length(); team++) {
                            JSONArray bans = teams.getJSONObject(team).optJSONArray("bans");

                            //recorrer los 5 bans de cada equipo
                            for (int ban = 0; ban < bans.length(); ban++) {
                                championMatchesService.addBan(bans.getJSONObject(ban).getInt("championId"));
                            }
                        }
                    }

                }
            }
        }

        //actualizar champion_stats con los resultados obtenidos
        updateTable();
        //insertar en la base de datos jdbc
    }

    @GetMapping("/updateTable")
    public void updateTable() {
        //actualizar champion_stats con los resultados obtenidos
        List<Champion_matches> championMatchesList = championMatchesService.getChampionMatches();
        int matchNumber = matchesService.getMatches(0);
        for (Champion_matches champion_matches : championMatchesList) {

            Champion_stats champion_stats = new Champion_stats();

            float win_rate, pick_rate, ban_rate;
            win_rate = (float) (champion_matches.getMatches_won() / champion_matches.getMatches_played()) * 100;
            pick_rate = (float) (champion_matches.getMatches_played() / matchNumber) * 100;
            ban_rate = (float) (champion_matches.getMatches_banned() / matchNumber) * 100;

            champion_stats.setId(champion_matches.getId());
            champion_stats.setChampion_name(champion_stats.getChampion_name());
            champion_stats.setWin_rate(win_rate);
            champion_stats.setPick_rate(pick_rate);
            champion_stats.setBan_rate(ban_rate);

            championStatsService.guardar(champion_stats);
        }
    }

    private String getRegionForServer(String server) {
        return switch (server) {
            case "euw1" -> "europe";
            case "na1" -> "americas";
            case "kr" -> "asia";
            default -> null;
        };
    }


}
