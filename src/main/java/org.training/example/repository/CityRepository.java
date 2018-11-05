package org.training.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.City;

public interface CityRepository extends JpaRepository<City, Long> {
    @Query(value = "select cities.* from cities\n" +
            "LEFT JOIN hotels h on cities.id = h.city_id\n" +
            "where h.id = ?1", nativeQuery = true)
    City findByHotelId(long hotelId);

}
