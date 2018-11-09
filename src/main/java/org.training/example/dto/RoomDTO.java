package org.training.example.dto;

import java.util.Set;
import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private Integer number;
    private Boolean isSnoozed;
    private RoomTypeDTO roomType;
    private short roomSize;
    private Set<PhotoDto> photos;
}
