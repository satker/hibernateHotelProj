package org.training.example.dto;

import java.util.Set;
import lombok.Data;

@Data
public class RoomTypeDTO {
    private Long id;
    private String name;
    private String description;
    private CapacityDto capacity;
    private Set<PhotoDto> photos;
}
