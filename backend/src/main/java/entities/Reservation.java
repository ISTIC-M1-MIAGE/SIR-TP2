package entities;

import enums.PurchaseStateEnum;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pass_id")
    private Pass pass;

    @Column(name = "scan_date")
    private LocalDateTime scanDate;

    @Column(name = "purchase_state", nullable = false)
    private PurchaseStateEnum state = PurchaseStateEnum.PENDING;

    @Column(name = "reservation_date")
    private LocalDate reservationDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;


    public Reservation() {
    }

    public Reservation(User user, Pass pass, LocalDate reservationDate) {
        this.user = user;
        this.pass = pass;
        this.reservationDate = reservationDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pass getPass() {
        return pass;
    }

    public void setPass(Pass pass) {
        this.pass = pass;
    }

    public LocalDateTime getScanDate() {
        return scanDate;
    }

    public void setScanDate(LocalDateTime scanDate) {
        this.scanDate = scanDate;
    }

    public PurchaseStateEnum getState() {
        return state;
    }

    public void setState(PurchaseStateEnum state) {
        this.state = state;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
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
        return "\nReservation{" +
                "id=" + id +
                ", user=" + user +
                ", pass=" + pass +
                ", scanDate=" + scanDate +
                ", state=" + state +
                ", reservationDate=" + reservationDate +
                ", createdAt=" + createdAt.toString() +
                ", updatedAt=" + updatedAt.toString() +
                ", deletedAt=" + deletedAt.toString() +
                '}';
    }
}
