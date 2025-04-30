package dto;

import entities.Pass;

import java.util.List;
import java.util.stream.Collectors;

public class PassDTO {

    private Long id;
    private String name;
    private Long eventId;
    private double price;
    private String advantages;

    public PassDTO() {
    }
    public PassDTO(Pass pass) {
        this.id = pass.getId();
        this.name = pass.getName();
        this.eventId = pass.getEvent().getId();
        this.price = pass.getPrice();
        this.advantages = pass.getAdvantages();
    }

    public static List<PassDTO> convertEntitiesToDTOout(List<Pass> passes) {
        return passes.stream()
                .map(PassDTO::new).collect(Collectors.toList());
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public String getAdvantages() {
        return advantages;
    }
    public void setAdvantages(String advantages) {
        this.advantages = advantages;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventId() {
        return eventId;
    }
    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

}
