package org.training.example.dao;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.training.example.model.Hotel;

@Repository
public class HotelDao {
    @Autowired
    private SessionFactory factory;

    public List<Hotel> getHotels() {
        Transaction tx = null;
        List<Hotel> result;
        try (Session session = factory.openSession()) {
            tx = session.beginTransaction();
            result = (List<Hotel>) session.createQuery("FROM Hotel")
                    .list().stream()
                    .collect(Collectors.toList());
            tx.commit();
        } catch (HibernateException e) {
            result = Collections.emptyList();
            if (tx != null) tx.rollback();
            e.printStackTrace();
        }
        return result;
    }
}
