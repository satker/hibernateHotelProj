package org.training.example.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.ConfirmedRequestDTO;
import org.training.example.service.ConfirmedRequestService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/confirms")
@RequiredArgsConstructor
public class ConfirmedRequestRestController {
    private final ConfirmedRequestService confirmedRequestService;
    private final UserService userService;

    @GetMapping
    List<ConfirmedRequestDTO> readRoomConfirms(@PathVariable long userId) {
        return confirmedRequestService.findByAccountUsername(userId);
    }

    @GetMapping(value = "/{confirmsId}")
    ConfirmedRequestDTO readRoomRequest(@PathVariable long confirmsId) {
        return confirmedRequestService.findOne(confirmsId);
    }
}
