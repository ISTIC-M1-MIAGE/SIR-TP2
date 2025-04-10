package dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public class EventDTOin implements Serializable {
    private String title;
    private String location;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime closingTicketOfficeDate;
    private String mainImage;
    private String currency;
    private String country;
    private Long organizerId;

    public EventDTOin(String title, String location, String description, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime closingTicketOfficeDate, String mainImage, String currency, String country, Long organizerId) {
        this.title = title;
        this.location = location;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.closingTicketOfficeDate = closingTicketOfficeDate;
        this.mainImage = mainImage;
        this.currency = currency;
        this.country = country;
        this.organizerId = organizerId;
    }

    public EventDTOin() {
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

    public Long getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }
}
