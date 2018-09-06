package org.training.example.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Hotel {
    private String hotelName;
    private int stars;
    private double price;
    private String cityName;
    private String countryCode;
    private String countryName;
    private String address;
    private String location;
    private String url;
    private double latitude;
    private double longitude;
}
