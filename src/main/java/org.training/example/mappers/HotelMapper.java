package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.training.example.dto.HotelDto;
import org.training.example.model.Hotel;
import org.training.example.repository.CityRepository;
import org.training.example.repository.CountryRepository;
import org.training.example.repository.PhotoRepository;
import org.training.example.repository.RoomRepository;
import org.training.example.repository.RoomTypeRepository;

@Mapper(componentModel = "spring")
@Component
public abstract class HotelMapper {
    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    CountryRepository countryRepository;

    @Mappings({
            @Mapping(target = "photos",
                    expression = "java(photoRepository.findAllByHotel_Id(hotel.getId()).stream()" +
                            ".map(photoMapper::photoToPhotoDTO).collect(java.util.stream.Collectors.toSet()))"),
            @Mapping(target = "mainPhoto",
                    expression = "java(photoMapper.photoToPhotoDTO(photoRepository.findMainPhotoByHotelId(hotel.getId())))"),
            @Mapping(target = "price",
                    expression = "java( new java.math.BigDecimal(roomTypeRepository.findByHoteId(hotel.getId()).stream()" +
                            "                .flatMap(roomType -> roomRepository.findByRoomType(roomType).stream())" +
                            "                .mapToDouble(room -> room.getRoomType().getCostNight())" +
                            "                .average().orElse(0)).setScale(3, java.math.RoundingMode.UP).doubleValue() )"),
            @Mapping(target = "countryName",
                    expression = "java( countryRepository.findByHotelId(hotel.getId()).getName() )"),
            @Mapping(target = "countryCode",
                    expression = "java( countryRepository.findByHotelId(hotel.getId()).getCountryCode() )"),
            @Mapping(target = "cityName",
                    expression = "java( cityRepository.findByHotelId(hotel.getId()).getName() )"),
            @Mapping(target = "description",
                    expression = "java( hotel.getDescription() )")
    })
    public abstract HotelDto hotelToHotelDto(Hotel hotel);

    @Mappings({
            @Mapping(target = "description",
                    expression = "java( hotelDto.getDescription() )")
    })
    public abstract Hotel hotelDtoToHotel(HotelDto hotelDto);

    public abstract List<Hotel> hotelDtosToHotels(List<HotelDto> hotelDtos);

    public abstract List<HotelDto> hotelsToHotelsDTOs(List<Hotel> hotels);

}
