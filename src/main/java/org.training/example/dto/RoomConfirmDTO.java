package org.training.example.dto;

import lombok.Data;

@Data
public class RoomConfirmDTO {
    private Long id;
    private UserDTO user;
    private RoomRequestDTO request;
    private RoomDTO room;
}
