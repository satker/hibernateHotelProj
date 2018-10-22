package org.training.example.dto;

import java.sql.Date;
import lombok.Data;

@Data
public class AddRoomRequestDTO {
    private Date arrivalDate;
    private Date departureDate;
    private RoomTypeDTO roomType;
    private String numbersOfRooms;
    private String adults;
    private String children;
}
