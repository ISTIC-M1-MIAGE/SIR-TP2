package dao;

import entities.Event;

import java.util.List;

public class EventDAO extends AbstractJpaDao<Long, Event> {
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
    public List<Event> findBySearchCriteria(String searchCriteria) {
        String query = "SELECT e FROM Event e WHERE e.title LIKE :searchCriteria";
        return entityManager.createQuery(query, Event.class).setParameter("searchCriteria", searchCriteria).getResultList();
    }


}
