package jpa;

import entities.Event;
import entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class N1Select {

    private EntityManager manager;

    public N1Select(EntityManager manager) {
        this.manager = manager;
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence
                .createEntityManagerFactory("dev");
        EntityManager manager = factory.createEntityManager();
        N1Select test = new N1Select(manager);


        TypedQuery<User> q = test.manager.createQuery("select u from User u", User.class);
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