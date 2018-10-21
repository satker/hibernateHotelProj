package org.training.example.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.training.example.dto.HotelDto;
import org.training.example.mappers.HotelMapper;
import org.training.example.model.Hotel;
import org.training.example.repository.HotelRepository;

@Service
@AllArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    public List<HotelDto> getHotels() {
        return hotelRepository.findAll().stream()
                .map(hotelMapper::hotelToHotelDto)
                .collect(Collectors.toList());
    }

    public List<HotelDto> getHotelsByParams(String country, String city,
                                            int stars, double price) {
        Set<Hotel> result = new HashSet<>();
        if (!country.equals("")) result.retainAll(hotelRepository.findAllByCountryName(country));
        if (!city.equals("")) result.retainAll(hotelRepository.findAllByCityName(city));
        if (stars != 0) result.retainAll(hotelRepository.findAllByStars(stars));
        if (price != 0) result.retainAll(hotelRepository.findAllByPrice(price));

        return result.stream()
                .map(hotelMapper::hotelToHotelDto)
                .collect(Collectors.toList());
    }

    public HotelDto createHotel(HotelDto hotelDto) {
        Hotel hotel = hotelMapper.hotelDtoToHotel(hotelDto);
        Hotel newHotel = hotelRepository.save(hotel);
        return hotelMapper.hotelToHotelDto(newHotel);
    }
}
