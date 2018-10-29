package org.training.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.RoomParameter;

public interface RoomParameterRepository extends JpaRepository<RoomParameter, Long> {
    @Query(value = "SELECT * FROM room_parameter where room_id = ?1", nativeQuery = true)
    List<RoomParameter> findAllByRoomId (long id);
}
