package org.training.example.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    Collection<Request> findByUserId(long id);
}
