package org.training.example.dto;

import java.util.Set;
import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private Integer number;
    private Double costNight;
    private Boolean isSnoozed;
    private RoomTypeDTO roomType;
    private short roomSize;
    private Set<String> parameters;
    private Set<PhotoDto> photos;
}
