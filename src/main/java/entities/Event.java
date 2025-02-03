package entities;

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

    @ManyToOne(targetEntity = User.class)
    private User organizer;

    @OneToMany(targetEntity = Pass.class)
    private List<Pass> passes = new ArrayList<>();

    @Column(name = "state", nullable = false)
    private EventState state = EventState.CREATED;

    @Column(name = "closing_ticket_office_date")
    private LocalDateTime closingTicketOfficeDate;

    @Column(name = "main_image", nullable = false)
    private String mainImage;

    @Column(name = "currency", length = 10, nullable = false)
    private String currency = "EUR";

    @Column(name = "country", nullable = false)
    private String country = "FR";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;


    public Event() {
    }

    public Event(String title, String location, String description, LocalDateTime startDate, LocalDateTime endDate, User organizer, String mainImage) {
        this.title = title;
        this.location = location;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.organizer = organizer;
        this.mainImage = mainImage;
    }
}
