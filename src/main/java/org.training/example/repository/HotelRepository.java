package org.training.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.training.example.model.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    /*List<Hotel> findAllByPrice(double price);

    List<Hotel> findAllByStars(int stars);

    List<Hotel> findAllByCountryName(String country);

    List<Hotel> findAllByCityName(String city);*/
}
