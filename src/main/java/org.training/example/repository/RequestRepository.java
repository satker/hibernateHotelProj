package org.training.example.repository;

import java.util.Collection;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Request;
import org.training.example.model.Room;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    Collection<Request> findByUserId(long id);

    @Query(value = "SELECT * FROM room",
            nativeQuery = true)
    Set<Room> findRoomsByRequestId(long id);
}
