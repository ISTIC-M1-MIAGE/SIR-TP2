package dao;

import entities.User;

public class UserDAO extends AbstractJpaDAO<Long, User> {
    public UserDAO() {
        super();
        setClazz(User.class);
    }
}
