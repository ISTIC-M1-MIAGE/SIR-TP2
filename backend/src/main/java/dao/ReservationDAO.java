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
