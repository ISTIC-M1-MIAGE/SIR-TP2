package entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import dto.EventDTOin;
import enums.EventState;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "events")
public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @ManyToOne(targetEntity = City.class, fetch = FetchType.LAZY)
    @JsonBackReference
    private City city;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JsonBackReference
    private User organizer;

    @OneToMany(targetEntity = Pass.class, mappedBy = "event", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Pass> passes = new ArrayList<>();

    @Column(name = "state", nullable = false)
    private EventState state = EventState.CREATED;

    @Column(name = "closing_ticket_office_date")
    private LocalDateTime closingTicketOfficeDate;

    @Column(name = "main_image", nullable = false)
    private String mainImage;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;


    public Event() {
    }

    public Event(String title, String location, String description, LocalDateTime startDate, LocalDateTime endDate, City city, User organizer, String mainImage) {
        this.title = title;
        this.location = location;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.organizer = organizer;
        this.mainImage = mainImage;
    }
    public Event(EventDTOin eventDTOin, City city, User organizer) {
        this.title = eventDTOin.getTitle();
        this.location = eventDTOin.getLocation();
        this.description = eventDTOin.getDescription();
        this.startDate = eventDTOin.getStartDate();
        this.endDate = eventDTOin.getEndDate();
        this.closingTicketOfficeDate = eventDTOin.getClosingTicketOfficeDate();
        this.mainImage = eventDTOin.getMainImage();
        this.city = city;
        this.organizer = organizer;
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

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public List<Pass> getPasses() {
        return passes;
    }

    public void setPasses(List<Pass> passes) {
        this.passes = passes;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    @Override
    public String toString() {
        return "\nEvent{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", location='" + location + "'" +
                ", description='" + description + "'" +
                ", startDate=" + startDate.toString() +
                ", endDate=" + endDate.toString() +
                ", city=" + city.toString() +
                ", organizer=" + organizer.toString() +
                ", passes=" + passes +
                ", state=" + state +
                ", closingTicketOfficeDate=" + closingTicketOfficeDate +
                ", mainImage='" + mainImage + "'" +
                ", createdAt=" + createdAt.toString() +
                ", updatedAt=" + updatedAt.toString() +
                ", deletedAt=" + deletedAt.toString() +
                "}";
    }
}
