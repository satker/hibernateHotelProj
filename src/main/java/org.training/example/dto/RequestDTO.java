package org.training.example.dto;

import java.sql.Date;
import java.util.Set;
import lombok.Data;

@Data
public class RequestDTO {
    private Long id;
    private Date arrivalDate;
    private Date departureDate;
    private Set<RoomDTO> rooms;
}
