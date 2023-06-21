package com.api.apiweb.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Champion_matches {

    @Id
    private Integer id;
    private String champion_name;
    private Integer matches_played;
    private Integer matches_won;
    private Integer matches_banned;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChampion_name() {
        return champion_name;
    }

    public void setChampion_name(String champion_name) {
        this.champion_name = champion_name;
    }

    public Integer getMatches_played() {
        return matches_played;
    }

    public void setMatches_played(Integer matches_played) {
        this.matches_played = matches_played;
    }

    public Integer getMatches_won() {
        return matches_won;
    }

    public void setMatches_won(Integer matches_won) {
        this.matches_won = matches_won;
    }

    public Integer getMatches_banned() {
        return matches_banned;
    }

    public void setMatches_banned(Integer matches_banned) {
        this.matches_banned = matches_banned;
    }

    @Override
    public String toString() {
        return "Champion_matches{" +
                "id=" + id +
                ", champion_name='" + champion_name + '\'' +
                ", matches_played=" + matches_played +
                ", matches_won=" + matches_won +
                ", matches_banned=" + matches_banned +
                '}';
    }
}
