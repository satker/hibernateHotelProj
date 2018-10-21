package org.training.example.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.ConfirmedRequest;
import org.training.example.model.Request;

@Repository
public interface ConfirmedRequestRepository extends JpaRepository<ConfirmedRequest, Long> {
    Collection<ConfirmedRequest> findByUserId(long id);
    ConfirmedRequest findConfirmedRequestByRequest(Request request);
}
