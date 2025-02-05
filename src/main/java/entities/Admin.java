package entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("admin")
public class Admin extends User {

    public Admin() {
        super();
    }

    public Admin(String firstname, String lastname, String email, String password) {
        super(firstname, lastname, email, password);
    }
}
