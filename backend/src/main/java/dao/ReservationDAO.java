package dao;

import entities.Event;
import entities.Pass;
import entities.Reservation;
import jakarta.persistence.TypedQuery;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class ReservationDAO extends AbstractJpaDAO<Long, Reservation> {
    public ReservationDAO() {
        super();
        setClazz(Reservation.class);
    }

    /**
     * Retrieves a Reservation entity by the event ID.
     *
     * @param id the ID of the reservation to retrieve
     * @return the Reservation entity with the specified ID
     */
    public Reservation findByEventId(Long id) {
        TypedQuery<Reservation> q = entityManager.createQuery("select r from Reservation r WHERE r.pass.event.id = :id", Reservation.class);
        return q.setParameter("id", id).getSingleResult();
    }

    /**
     * Retrieves a Reservation entity by the user ID.
     *
     * @param id the ID of the reservation to retrieve
     * @return the Reservation entity with the specified ID
     */
    public Reservation findByUserId(Long id) {
        TypedQuery<Reservation> q = entityManager.createQuery("select r from Reservation r WHERE r.user.id = :id", Reservation.class);
        return q.setParameter("id", id).getSingleResult();
    }


    /**
     * Retrieves a Map of Number of reservation by Day.
     * All the successful reservations for a given event are counted.
     *
     * @return List<Event>.
     */
    public Map<LocalDate, Integer> findReservationByDay(Long eventId) {
        TypedQuery<Event> q = entityManager.createQuery("select e from Event e WHERE e.id = :eventId", Event.class);
        Event res = q.setParameter("eventId", eventId).getSingleResult();
        Map<LocalDate, Integer> numberOfResPerDay = new HashMap<>();

            for (Pass p : res.getPasses() ){
                for (Reservation r : p.getReservations()){
                    LocalDate date = r.getReservationDate();
                    numberOfResPerDay.merge(date, 1, Integer::sum);
                    /* NB: This code was replaced by the code above
                    Integer oldValue = numberOfResPerDay.get(date);
                    if (oldValue != null) {
                        numberOfResPerDay.put(date, oldValue + 1);
                    } else {
                        numberOfResPerDay.put(date, 1);
                    }
                     */
                }
            }
        return numberOfResPerDay;
    }
}
