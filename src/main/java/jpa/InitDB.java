package jpa;

import entities.Event;
import entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.time.LocalDateTime;

public class InitDB {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        EntityManagerFactory factory = Persistence
                .createEntityManagerFactory("dev");
        EntityManager manager = factory.createEntityManager();
        JpaTest test = new JpaTest(manager);


        // TODO create entity


        EntityTransaction tx = manager.getTransaction();
        tx.begin();
        User u = new User("test", "test", "test@gmail.com", "passwordTest");
        manager.persist(u);
        for (int i = 0; i < 2; i++) {
            Event e = new Event("event_" + i, "location_" + i, "description_" + i, LocalDateTime.now(), LocalDateTime.now(), u, "mainImage_" + i);
            manager.persist(e);
            u.getEvents().add(e);
        }
        tx.commit();

        // TODO persist entity


        // TODO run request

        System.out.println(".. done");
    }
}
