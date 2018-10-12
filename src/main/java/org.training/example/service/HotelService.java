package org.training.example.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.training.example.model.Hotel;
import org.training.example.repository.HotelRepository;

@Service
@AllArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;

    public List<Hotel> getHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> getHotelsByParams(String country, String city,
                                         int stars, double price) {
        Set<Hotel> result = new HashSet<>();
        if (!country.equals("")) result.retainAll(hotelRepository.findAllByCountryName(country));
        if (!city.equals("")) result.retainAll(hotelRepository.findAllByCityName(city));
        if (stars != 0) result.retainAll(hotelRepository.findAllByStars(stars));
        if (price != 0) result.retainAll(hotelRepository.findAllByPrice(price));
        return new ArrayList<>(result);
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }
}
