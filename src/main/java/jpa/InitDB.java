package jpa;

import entities.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.time.LocalDateTime;

public class InitDB {

    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence
                .createEntityManagerFactory("dev");
        EntityManager manager = factory.createEntityManager();
        JpaTest test = new JpaTest(manager);

        EntityTransaction tx = manager.getTransaction();
        tx.begin();
        User u = new User("test", "test", "test@gmail.com", "passwordTest");
        Admin a = new Admin("admin", "admin", "admin@gmail.com", "passwordAdmin");
        manager.persist(u);
        manager.persist(a);
        for (int i = 0; i < 2; i++) {
            Event e = new Event("event_" + i, "location_" + i, "description_" + i, LocalDateTime.now(), LocalDateTime.now(), u, "mainImage_" + i);
            manager.persist(e);
            u.getEvents().add(e);
            for (int j = 1; j < 3; j++) {
                Pass p = new Pass("pass_" + i + "_" + j, 10.0 * j, e);
                manager.persist(p);
                e.getPasses().add(p);
                for (int k = 0; k < 2; k++) {
                    Reservation r = new Reservation(u, p, LocalDateTime.now());
                    manager.persist(r);
                    p.getReservation().add(r);
                    Payment pay = new Payment("Payment_" + k, "PENDING", 10.0, "Le Paiement", r);
                    manager.persist(pay);
                }
            }
        }
        tx.commit();
        System.out.println(".. done");
    }
}
