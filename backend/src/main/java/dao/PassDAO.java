package dao;

import entities.Pass;

public class PassDAO extends AbstractJpaDao<Long, Pass> {
    public PassDAO() {
        super();
        setClazz(Pass.class);
    }
}
