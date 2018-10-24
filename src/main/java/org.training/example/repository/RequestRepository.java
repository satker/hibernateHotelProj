package org.training.example.repository;

import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Request;
import org.training.example.model.Room;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    @Query(value = "SELECT * FROM request where user_id = ?1",
            nativeQuery = true)
    List<Request> findByUserId(long id);

    @Query(value = "SELECT * FROM room",
            nativeQuery = true)
    Set<Room> findRoomsByRequestId(long id);
}
