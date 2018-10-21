package org.training.example.dto;

import lombok.Data;

@Data
public class ConfirmedRequestDTO {
    private Long id;
    private UserDTO user;
    private RequestDTO request;
    private RoomDTO room;
}
