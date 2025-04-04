package dto;

import entities.Event;
import enums.EventState;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


public class EventDTOout implements Serializable {
    private Long id;
    private String title;
    private String location;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventState state = EventState.CREATED;
    private LocalDateTime closingTicketOfficeDate;
    private String mainImage;
    private String currency;
    private String country;
    private LocalDateTime createdAt;

    public EventDTOout(Event event) {
        id = event.getId();
        title = event.getTitle();
        location = event.getLocation();
        description = event.getDescription();
        startDate = event.getStartDate();
        endDate = event.getEndDate();
        state = event.getState();
        closingTicketOfficeDate = event.getClosingTicketOfficeDate();
        mainImage = event.getMainImage();
        currency = event.getCurrency();
        country = event.getCountry();
        createdAt = event.getCreatedAt();
    }

    public static List<EventDTOout> convertEventsToDTOout(List<Event> events) {
        return events.stream()
                .map(EventDTOout::new).collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public EventState getState() {
        return state;
    }

    public void setState(EventState state) {
        this.state = state;
    }

    public LocalDateTime getClosingTicketOfficeDate() {
        return closingTicketOfficeDate;
    }

    public void setClosingTicketOfficeDate(LocalDateTime closingTicketOfficeDate) {
        this.closingTicketOfficeDate = closingTicketOfficeDate;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
