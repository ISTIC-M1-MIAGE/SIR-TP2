package fr.istic.tahi.zinsou.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "payments")
public class Payment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @Column(name = "reference", nullable = false)
    private String reference;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "currency", nullable = false)
    private String currency;

    @OneToOne(targetEntity = Reservation.class)
    private Reservation reservation;

    public Payment() {
    }
}
