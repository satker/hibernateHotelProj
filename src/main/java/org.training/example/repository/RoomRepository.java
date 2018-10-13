package org.training.example.repository;

import java.util.Collection;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Collection<Room> findByRoomTypeId(long id);

    Optional<Room> findById(long id);

    Room findOne(long id);
}
