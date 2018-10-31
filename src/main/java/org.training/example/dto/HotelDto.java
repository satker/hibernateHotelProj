package org.training.example.dto;

import java.util.List;
import lombok.Data;

@Data
public class HotelDto {
    private Long id;
    private String hotelName;
    private int stars;
    private double price;
    private String address;
    private String url;
    private double latitude;
    private double longitude;
    private List<PhotoDto> photos;
}
