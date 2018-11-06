package org.training.example.dto;

import java.util.Set;
import lombok.Data;

@Data
public class HotelDto {
    private Long id;
    private String hotelName;
    private String description;
    private int stars;
    private double price;
    private String address;
    private String url;
    private String cityName;
    private String countryName;
    private String countryCode;
    private double latitude;
    private double longitude;
    private Set<PhotoDto> photos;
}
