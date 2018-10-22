package org.training.example.dto;

import java.sql.Date;
import lombok.Data;

@Data
public class RequestDTO {
    private Long id;
    private byte adults;
    private byte children;
    private Date arrivalDate;
    private Date departureDate;
    private String roomType;
    private byte numberOfRooms;
}
