package org.training.example.dto;

import java.sql.Date;
import lombok.Data;
import org.training.example.model.User;

@Data
public class AddRoomRequestDTO {
    private byte capacity;
    private Date arrivalDate;
    private Date departureDate;
    private boolean idDone;
    private RoomTypeDTO roomType;
    private User user;
}
