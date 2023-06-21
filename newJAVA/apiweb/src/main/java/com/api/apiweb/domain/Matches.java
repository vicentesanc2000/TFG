package com.api.apiweb.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Matches {

    @Id
    private Integer id;
    private Integer matches;

    public Integer getMatches() {
        return matches;
    }

    public void setMatches(Integer matches) {
        this.matches = matches;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Matches{" +
                "id=" + id +
                ", matches=" + matches +
                '}';
    }
}
