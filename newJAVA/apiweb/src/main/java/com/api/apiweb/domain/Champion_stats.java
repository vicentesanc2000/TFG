package com.api.apiweb.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Champion_stats {

    @Id
    private Integer id;
    private String champion_name;
    private float win_rate;
    private float pick_rate;
    private float ban_rate;

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

    public float getWin_rate() {
        return win_rate;
    }

    public void setWin_rate(float win_rate) {
        this.win_rate = win_rate;
    }

    public float getPick_rate() {
        return pick_rate;
    }

    public void setPick_rate(float pick_rate) {
        this.pick_rate = pick_rate;
    }

    public float getBan_rate() {
        return ban_rate;
    }

    public void setBan_rate(float ban_rate) {
        this.ban_rate = ban_rate;
    }

    @Override
    public String toString() {
        return "Champion_stats{" +
                "id=" + id +
                ", champion_name='" + champion_name + '\'' +
                ", win_rate=" + win_rate +
                ", pick_rate=" + pick_rate +
                ", ban_rate=" + ban_rate +
                '}';
    }
}
