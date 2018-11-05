package org.training.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query(value = "select countries.*\n" +
            "from countries\n" +
            "       left join cities c on countries.id = c.country_id\n" +
            "       left join hotels h on c.id = h.city_id\n" +
            "where h.id = ?1", nativeQuery = true)
    Country findByHotelId(long id);
}
