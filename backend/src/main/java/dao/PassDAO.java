package dao;

import entities.Pass;

public class PassDAO extends AbstractJpaDAO<Long, Pass> {
    public PassDAO() {
        super();
        setClazz(Pass.class);
    }
}
