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

        City city = new City(35, "Rennes");
        User user = new User("test", "test", "test@gmail.com", "passwordTest");
        Admin admin = new Admin("admin", "admin", "admin@gmail.com", "passwordAdmin");
        manager.persist(city);
        manager.persist(user);
        manager.persist(admin);

        for (int i = 0; i < 2; i++) {
            Event event = new Event("event_" + i, "location_" + i, "lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero", LocalDateTime.now().plusDays(3), LocalDateTime.now().plusDays(4), city, user, "mainImage_" + i);
            manager.persist(event);
            city.getEvents().add(event);
            user.getEvents().add(event);
            for (int j = 1; j < 3; j++) {
                Pass pass = new Pass("pass_" + i + "_" + j, 10.0 * j, event);
                manager.persist(pass);
                event.getPasses().add(pass);
                for (int k = 0; k < 2; k++) {
                    Reservation reservation = new Reservation(user, pass, LocalDate.now());
                    manager.persist(reservation);
                    pass.getReservations().add(reservation);
                    Payment payment = new Payment("Payment_" + k, "PENDING", 10.0, "Le Paiement", reservation);
                    manager.persist(payment);
                }
            }
        }
        tx.commit();
        System.out.println("Database initialization done ✅");
    }
}
