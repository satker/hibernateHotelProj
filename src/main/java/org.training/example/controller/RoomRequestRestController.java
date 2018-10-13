package org.training.example.controller;

import java.security.Principal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RoomRequestDTO;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.service.RoomRequestService;
import org.training.example.service.RoomTypeService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/orders")
@RequiredArgsConstructor
class RoomRequestRestController {

    private final RoomRequestService roomRequestService;
    private final RoomTypeService roomTypeService;
    private final UserService userService;

    @PostMapping
    ResponseEntity add(@PathVariable long userId, @RequestBody AddRoomRequestDTO input) {
        return this.userService
                .findUserById(userId)
                .map(account -> {
                    roomRequestService.save(input);
                    return new ResponseEntity(null, HttpStatus.CREATED);
                }).get();
    }

    @GetMapping(value = "/{orderId}")
    RoomRequestDTO findValidateRoom(@PathVariable long orderId, Principal principal) {
        return roomRequestService.findValidateRoom(orderId, principal.getName());
    }

    @GetMapping
    List<RoomRequestDTO> readRoomRequests(@PathVariable long userId) {
        return roomRequestService.findRequestsByAccountUsername(userId);
    }

    @DeleteMapping(value = "/{orderId}")
    public void deleteOrder(@PathVariable("orderId") long id) {
        roomRequestService.deleteRoomRequestById(id);
    }

    @GetMapping(value = "/appartments")
    List<RoomTypeDTO> findAllTypes() {
        return roomTypeService.findAllTypes();
    }

    @GetMapping(value = "/appartments/{appartmentsId}")
    RoomTypeDTO findTypeById(@PathVariable long appartmentsId) {
        return roomTypeService.findOne(appartmentsId);
    }
}
