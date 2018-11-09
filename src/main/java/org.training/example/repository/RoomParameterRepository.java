package org.training.example.repository;

import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.RoomTypeParameter;

public interface RoomParameterRepository extends JpaRepository<RoomTypeParameter, Long> {
    @Query(value = "SELECT * FROM room_type_parameter where room_type_id = ?1", nativeQuery = true)
    Set<RoomTypeParameter> findAllByRoomTypeId(long id);
}
