package dao;

import entities.Reservation;

public class ReservationDAO extends AbstractJpaDao<Long, Reservation> {
    public ReservationDAO() {
        super();
        setClazz(Reservation.class);
    }

}
