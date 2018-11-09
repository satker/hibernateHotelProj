package org.training.example.dto;

import java.sql.Date;
import java.util.Set;
import lombok.Data;

@Data
public class PropertiesForOrderPrice {
    private Date arrivalDate;
    private Date departureDate;
    private Set<RoomTypeDTO> roomTypes;
}
