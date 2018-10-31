package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.HotelDto;
import org.training.example.model.Hotel;
import org.training.example.repository.PhotoRepository;

@Mapper(componentModel = "spring")
public abstract class HotelMapper {
    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Mappings({
            @Mapping(target = "photos",
                    expression = "java(photoRepository.findAllByHotel_Id(hotel.getId()).stream()" +
                            ".map(photoMapper::photoToPhotoDTO).collect(java.util.stream.Collectors.toList()))")
    })
    public abstract HotelDto hotelToHotelDto(Hotel hotel);

    public abstract Hotel hotelDtoToHotel(HotelDto hotelDto);

    public abstract List<Hotel> hotelDtosToHotels(List<HotelDto> hotelDtos);

    public abstract List<HotelDto> hotelsToHotelsDTOs(List<Hotel> hotels);

}
