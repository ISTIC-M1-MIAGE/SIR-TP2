package jpa;

import entities.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

import java.time.LocalDate;
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
        User created = manager.find(User.class, 1);
        manager.persist(a);
        for (int i = 0; i < 2; i++) {
            Event e = new Event("event_" + i, "location_" + i, "lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero", LocalDateTime.now().plusDays(3), LocalDateTime.now().plusDays(4), u, "mainImage_" + i);
            manager.persist(e);
            u.getEvents().add(e);
            for (int j = 1; j < 3; j++) {
                Pass p = new Pass("pass_" + i + "_" + j, 10.0 * j, e);
                manager.persist(p);
                e.getPasses().add(p);
                for (int k = 0; k < 2; k++) {
                    Reservation r = new Reservation(u, p, LocalDate.now());
                    manager.persist(r);
                    p.getReservations().add(r);
                    Payment pay = new Payment("Payment_" + k, "PENDING", 10.0, "Le Paiement", r);
                    manager.persist(pay);
                }
            }
        }
        tx.commit();
        System.out.println(".. done");
    }
}
