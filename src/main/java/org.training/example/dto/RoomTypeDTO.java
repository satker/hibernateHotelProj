package org.training.example.dto;

import java.util.List;
import lombok.Data;

@Data
public class RoomTypeDTO {
    private Long id;
    private String name;
    private String description;
    private CapacityDto capacity;
    private List<PhotoDto> photos;
}
