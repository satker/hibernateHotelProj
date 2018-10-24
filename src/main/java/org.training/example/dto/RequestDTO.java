package org.training.example.dto;

import java.sql.Date;
import java.util.Set;
import lombok.Data;
import org.training.example.model.OrderStatus;
import org.training.example.model.PayedType;

@Data
public class RequestDTO {
    private Long id;
    private Date arrivalDate;
    private Date departureDate;
    private PayedType payedType;
    private OrderStatus orderStatus;
    private Boolean isPaid;
    private Double totalPrice;
    private UserDTO user;
    private Set<RoomDTO> rooms;
}
