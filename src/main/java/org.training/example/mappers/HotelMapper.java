package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.training.example.dto.HotelDto;
import org.training.example.model.Hotel;

@Mapper(componentModel = "spring")
public abstract class HotelMapper {
    public abstract HotelDto hotelToHotelDto(Hotel hotel);

    public abstract Hotel hotelDtoToHotel(HotelDto hotelDto);

    public abstract List<Hotel> hotelDtosToHotels(List<HotelDto> hotelDtos);

    public abstract List<HotelDto> hotelsToHotelsDTOs(List<Hotel> hotels);

}
