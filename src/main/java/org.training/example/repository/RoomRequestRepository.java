package org.training.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.RoomRequest;

public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {
    @Query(value = "SELECT * FROM room_request where request_id = ?1", nativeQuery = true)
    List<RoomRequest> findAllByRequestId (long id);
}
