package entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "passes")
public class Pass implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "advantages", nullable = false)
    private String advantages;

    @ManyToOne(targetEntity = Event.class)
    private Event event;

    @OneToMany(targetEntity = Reservation.class)
    private List<Reservation> reservation;

    @Column(name = "old_price", nullable = false)
    private double oldPrice;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;


    public Pass() {
    }

}
