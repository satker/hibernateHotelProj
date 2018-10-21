package org.training.example.dto;

import java.sql.Date;
import lombok.Data;

@Data
public class RequestDTO {
    private Long id;
    private byte capacity;
    private Date arrivalDate;
    private Date departureDate;
    private String roomType;
}
