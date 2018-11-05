package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.HotelDto;
import org.training.example.model.Hotel;
import org.training.example.repository.CityRepository;
import org.training.example.repository.CountryRepository;
import org.training.example.repository.PhotoRepository;
import org.training.example.repository.RoomRepository;

@Mapper(componentModel = "spring")
public abstract class HotelMapper {
    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    CountryRepository countryRepository;

    @Mappings({
            @Mapping(target = "photos",
                    expression = "java(photoRepository.findAllByHotel_Id(hotel.getId()).stream()" +
                            ".map(photoMapper::photoToPhotoDTO).collect(java.util.stream.Collectors.toSet()))"),
            @Mapping(target = "price",
                    expression = "java( roomRepository.findByHotelId(hotel.getId()).stream()" +
                            "                        .mapToDouble(org.training.example.model.Room::getCostNight)" +
                            "                        .average()" +
                            "                        .orElse(0) )"),
            @Mapping(target = "countryName",
                    expression = "java( countryRepository.findByHotelId(hotel.getId()).getName() )"),
            @Mapping(target = "countryCode",
                    expression = "java( countryRepository.findByHotelId(hotel.getId()).getCountryCode() )"),
            @Mapping(target = "cityName",
                    expression = "java( cityRepository.findByHotelId(hotel.getId()).getName() )")
    })
    public abstract HotelDto hotelToHotelDto(Hotel hotel);

    public abstract Hotel hotelDtoToHotel(HotelDto hotelDto);

    public abstract List<Hotel> hotelDtosToHotels(List<HotelDto> hotelDtos);

    public abstract List<HotelDto> hotelsToHotelsDTOs(List<Hotel> hotels);

}
