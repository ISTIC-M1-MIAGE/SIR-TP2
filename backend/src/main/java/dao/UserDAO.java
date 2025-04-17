package dao;

import entities.User;
import rest.auth.PasswordUtil;

public class UserDAO extends AbstractJpaDAO<Long, User> {
    public UserDAO() {
        super();
        setClazz(User.class);
    }

    /**
     * Retrieves a User entity by its email address.
     *
     * @param email the email address of the user to retrieve
     * @return the User entity with the specified email address
     */
    public User findByEmail(String email) {
        return entityManager.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", email)
                .getSingleResult();
    }
}
