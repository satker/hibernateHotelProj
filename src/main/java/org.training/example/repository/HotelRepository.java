package org.training.example.repository;

import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    @Query(value = "select *\n" +
            "from hotels\n" +
            "left join cities ct on hotels.city_id = ct.id\n" +
            "left join countries cout on ct.country_id = cout.id\n" +
            "where hotels.stars = ?1 AND ct.name = ?3 and cout.name = ?2 AND hotels.id in (select h.id\n" +
            "                    from (select h2.id, (select AVG(rt.cost_night)\n" +
            "                                         from room_types rt\n" +
            "                                                left join hotels h1 on rt.hotel_id = h1.id\n" +
            "                                         where h1.id = h2.id) avg_price\n" +
            "                          from hotels h2) as h\n" +
            "                    where h.avg_price between ?4 and ?5);", nativeQuery = true)
    Set<Hotel> findAllByStarsCountryNameAndCityNameAndPriceBetweenValues(int stars, String country, String city, double minCostNight, double maxCostNight);
}

