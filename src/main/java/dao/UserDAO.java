package dao;

import entities.Reservation;
import entities.User;

import java.util.List;

public class UserDAO extends AbstractJpaDao<Long, User> {
    public UserDAO() {
        super();
        setClazz(User.class);
    }
}
