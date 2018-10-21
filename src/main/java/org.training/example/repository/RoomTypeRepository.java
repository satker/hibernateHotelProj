package org.training.example.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    Optional<RoomType> findByName(String name);
    RoomType findRoomTypeByName(String name);

    default Long findIdByName(String name) {
        Optional<RoomType> roomType = findByName(name);
        return roomType.get().getId();
    }
}
