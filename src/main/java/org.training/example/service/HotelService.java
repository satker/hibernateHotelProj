package org.training.example.service;

import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.training.example.dto.HotelDto;
import org.training.example.dto.ParamsToSearchHotel;
import org.training.example.mappers.HotelMapper;
import org.training.example.model.Hotel;
import org.training.example.repository.CityRepository;
import org.training.example.repository.CountryRepository;
import org.training.example.repository.HotelRepository;
import org.training.example.repository.RoomRepository;

@Service
@AllArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;
    private final RoomRepository roomRepository;
    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;

    public Set<HotelDto> getHotels() {
        roomRepository.findByHotelId(1);
        return hotelRepository.findAll().stream()
                .map(hotelMapper::hotelToHotelDto)
                .collect(Collectors.toSet());
    }

    public Set<HotelDto> getHotelsByParams(ParamsToSearchHotel paramsToSearchHotel) {
        //Set<Hotel> result = new HashSet<>();
        /*if (!paramsToSearchHotel.getCountry().equals("")) result.retainAll(hotelRepository.findAllByCountryName(paramsToSearchHotel.getCountry()));
        if (!paramsToSearchHotel.getCity().equals("")) result.retainAll(hotelRepository.findAllByCityName(paramsToSearchHotel.getCity()));
        if (paramsToSearchHotel.getStars() != 0) result.retainAll(hotelRepository.findAllByStars(paramsToSearchHotel.getStars()));
        if (paramsToSearchHotel.getMinCostNight() != 0 && paramsToSearchHotel.getMaxCostNight() != 0) {
            result.retainAll(hotelRepository.findAllByPrice(paramsToSearchHotel.getMinCostNight(), paramsToSearchHotel.getMaxCostNight()));
        }*/

        /*return result.stream()
                .map(hotelMapper::hotelToHotelDto)
                .collect(Collectors.toSet());*/
        return hotelRepository.findAllByStarsCountryNameAndCityNameAndPriceBetweenValues(paramsToSearchHotel.getStars(), paramsToSearchHotel.getCountry(),
                paramsToSearchHotel.getCity(), paramsToSearchHotel.getMinCostNight(), paramsToSearchHotel.getMaxCostNight()).stream()
                .map(hotelMapper::hotelToHotelDto)
                .collect(Collectors.toSet());
    }

    public HotelDto createHotel(HotelDto hotelDto) {
        Hotel hotel = hotelMapper.hotelDtoToHotel(hotelDto);
        Hotel newHotel = hotelRepository.save(hotel);
        return hotelMapper.hotelToHotelDto(newHotel);
    }

    public Set<String> getCountries() {
        return countryRepository.findAllUniqueCountries();
    }

    public Set<String> getCities() {
        return cityRepository.findAllUniqueCities();
    }
}
