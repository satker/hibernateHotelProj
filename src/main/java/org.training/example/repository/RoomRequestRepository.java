package org.training.example.repository;

import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.RoomRequest;

@Repository
public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {
    Collection<RoomRequest> findByUserId(long id);

    Optional<RoomRequest> findById(Long id);
}
