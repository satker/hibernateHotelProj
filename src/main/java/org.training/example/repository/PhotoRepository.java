package org.training.example.repository;

import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    @Query(value = "select * from photos where hotel_id = ?1", nativeQuery = true)
    Set<Photo> findAllByHotel_Id(Long hotelId);

    @Query(value = "select photos.* from photos\n" +
            "left join room_type_photo rtp on photos.id = rtp.photo_id\n" +
            "left join room_types t on rtp.room_type_id = t.id\n" +
            "where t.id = ?1", nativeQuery = true)
    Set<Photo> findAllByRoomTypeId(Long roomTypeId);

    Photo findByPhotoUrl (String photoUrl);
}
