package org.training.example.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.RoomConfirmDTO;
import org.training.example.service.RoomConfirmService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/confirms")
@RequiredArgsConstructor
public class RoomConfirmRestController {
    private final RoomConfirmService roomConfirmService;
    private final UserService userService;

    @GetMapping
    List<RoomConfirmDTO> readRoomConfirms(@PathVariable long userId) {
        return roomConfirmService.findByAccountUsername(userId);
    }

    @GetMapping(value = "/{confirmsId}")
    RoomConfirmDTO readRoomRequest(@PathVariable long confirmsId) {
        return roomConfirmService.findOne(confirmsId);
    }
}
