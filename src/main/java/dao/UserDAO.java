package dao;

import entities.User;

public class UserDAO extends AbstractJpaDao<Long, User> {
    public UserDAO() {
        super();
        setClazz(User.class);
    }


}
