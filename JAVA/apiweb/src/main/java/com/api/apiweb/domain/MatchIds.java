package com.api.apiweb.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Timestamp;

@Entity
public class MatchIds {

    @Id
    private String id;
    private Timestamp date;

    public String getId() {
        return id;
    }

    public void setID(String ID) {
        this.id = ID;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "MatchIds{" +
                "id='" + id + '\'' +
                ", date=" + date +
                '}';
    }
}
