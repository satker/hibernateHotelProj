package org.training.example.repository;

import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    Optional<RoomType> findByName(String name);
    RoomType findRoomTypeByName(String name);

    @Query(value = "select room_types.* from room_types\n" +
            "where hotel_id = ?1", nativeQuery = true)
    Set<RoomType> findByHoteId(long hotelId);

    default Long findIdByName(String name) {
        Optional<RoomType> roomType = findByName(name);
        return roomType.get().getId();
    }
}
