package jpa;


import java.util.List;

import entities.Event;
import entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;


public class JoinFetch {

    private EntityManager manager;

    public JoinFetch(EntityManager manager) {
        this.manager = manager;
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence
                .createEntityManagerFactory("dev");
        EntityManager manager = factory.createEntityManager();
        JoinFetch test = new JoinFetch(manager);


        TypedQuery<User> q = test.manager.createQuery("select distinct u from User u join fetch u.events e", User.class);
        long start = System.currentTimeMillis();
        List<User> res = q.getResultList();

        for (User u : res) {
            for (Event e : u.getEvents()) {
                e.getLocation();
            }
        }

        long end = System.currentTimeMillis();
        long duree = end - start;
        System.err.println("temps d'exec = " + duree);

        System.out.println(".. done");
    }

}