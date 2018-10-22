package org.training.example.dto;

import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private Integer number;
    private String costNight;
    private RoomTypeDTO roomType;
    private CapacityDto capacity;
}
