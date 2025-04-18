package dao;

import entities.City;
import entities.Event;

import java.util.List;

public class CityDAO extends AbstractJpaDAO<Long, City> {
    public CityDAO() {
        super();
        setClazz(City.class);
    }

}
