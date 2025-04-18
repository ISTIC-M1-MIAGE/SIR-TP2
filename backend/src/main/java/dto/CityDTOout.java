package dto;

import entities.City;
import entities.Event;
import enums.EventState;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


public class CityDTOout implements Serializable {
    private Long id;
    private int code;
    private String name;
    private LocalDateTime createdAt;
    public CityDTOout(City city) {
        id = city.getId();
        code = city.getCode();
        name = city.getName();
        createdAt = city.getCreatedAt();
    }

    public static List<CityDTOout> convertEntitiesToDTOout(List<City> cities) {
        return cities.stream()
                .map(CityDTOout::new).collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
