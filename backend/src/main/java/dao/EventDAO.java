package dao;

import entities.Event;
import enums.EventState;
import jakarta.persistence.TypedQuery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class EventDAO extends AbstractJpaDAO<Long, Event> {
    public EventDAO() {
        super();
        setClazz(Event.class);
    }

    /**
     * Retrieves a list of recent events.
     * Remove the events older than 7 days.
     *
     * @return List<Event>.
     */
    public List<Event> findRecentEvents() {
        String query = "SELECT e FROM Event e WHERE e.endDate >= CURRENT_DATE - 7 AND e.state = 2";
        return entityManager.createQuery(query, Event.class).getResultList();
    }


    /**
     * Retrieves a list of events by search criteria.
     *
     * @return List<Event>.
     */
    public List<Event> findBySearchCriteria(String title, Long cityId, String startDate, String endDate) {
        String queryString = "SELECT e FROM Event e WHERE e.state = :state";

        if (title != null) queryString += " AND e.title LIKE :title";
        if (cityId != null) queryString += " AND e.city.id = :cityId";
        if (startDate != null) queryString += " AND e.startDate >= :startDate";
        if (endDate != null) queryString += " AND e.endDate <= :endDate";

        TypedQuery<Event> query = entityManager.createQuery(queryString, Event.class)
                .setParameter("state", EventState.VALIDATED);

        if (title != null) query = query.setParameter("title", "%" + title + "%");
        if (cityId != null) query = query.setParameter("cityId", cityId);
        if (startDate != null) {
            LocalDateTime startDateTime = LocalDate.parse(startDate).atStartOfDay();
            query = query.setParameter("startDate", startDateTime);
        }
        if (endDate != null) {
            LocalDateTime endDateTime = LocalDate.parse(endDate).atStartOfDay();
            query = query.setParameter("endDate", endDateTime);
        }


        return query.getResultList();
    }


}
