package dto;

import entities.Reservation;
import enums.PurchaseStateEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReservationDTOout {

    private long id;
    private UserDTOout user;
    private PassDTO pass;
    private LocalDateTime scanDate;
    private PurchaseStateEnum state;
    private LocalDate reservationDate;

    public ReservationDTOout() {}

    public ReservationDTOout(Reservation reservation) {
        this.id = reservation.getId();
        this.user = new UserDTOout(reservation.getUser());
        this.pass = new PassDTO(reservation.getPass());
        this.scanDate = reservation.getScanDate();
        this.state = reservation.getState();
        this.reservationDate = reservation.getReservationDate();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserDTOout getUser() {
        return user;
    }

    public void setUser(UserDTOout user) {
        this.user = user;
    }

    public PassDTO getPass() {
        return pass;
    }

    public void setPass(PassDTO pass) {
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
}
