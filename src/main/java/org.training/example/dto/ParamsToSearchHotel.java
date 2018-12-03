package org.training.example.dto;

import lombok.Data;

@Data
public class ParamsToSearchHotel {
    private String country;
    private String city;
    private int stars;
    private double minCostNight;
    private double maxCostNight;
}
