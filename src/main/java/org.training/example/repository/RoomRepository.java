package org.training.example.repository;

import java.sql.Date;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Collection<Room> findByRoomTypeId(long id);

    // TODO: check norm rooms
    @Query(value = "SELECT * FROM rooms",
            nativeQuery = true)
    List<Room> findRoomsByParams(Date arrivalDate, Date departureDate,
                                        Long id, byte adults, byte children,
                                        byte numbersOfRooms);
}
