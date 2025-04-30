package dto;

import java.time.LocalDate;

public class ReservationDTOin {
    private Long passId;
    private Long userId;
    private LocalDate reservationDate;

    public ReservationDTOin() {
    }

    public ReservationDTOin(Long passId, Long userId, LocalDate reservationDate) {
        this.passId = passId;
        this.userId = userId;
        this.reservationDate = reservationDate;
    }

    public Long getPassId() {
        return passId;
    }

    public void setPassId(Long passId) {
        this.passId = passId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }
}
