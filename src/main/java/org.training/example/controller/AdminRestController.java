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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.RoomConfirmDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.dto.RoomRequestDTO;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.dto.UserDTO;
import org.training.example.service.RoomConfirmService;
import org.training.example.service.RoomRequestService;
import org.training.example.service.RoomService;
import org.training.example.service.RoomTypeService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminRestController {
    private final RoomConfirmService roomConfirmService;
    private final UserService userService;
    private final RoomRequestService roomRequestService;
    private final RoomService roomService;
    private final RoomTypeService roomTypeService;

    ////For admin
    @GetMapping(value = "/{idAdmin}")
    public UserDTO getValidateAdmin(@PathVariable("idAdmin") long id, Principal principal) {
        return userService.
                getUserValidateUser(id,
                        principal.getName());
    }

    @PutMapping(value = "/{idAdmin}")
    public void updateValidateAdmin(@PathVariable("idAdmin") long id, @RequestBody UserDTO user, Principal principal) {
        userService.updateUserValidateUser(id, principal.getName(), user);
    }

    //// For Users
    @GetMapping(value = "/users/{id}")
    public UserDTO getUser(@PathVariable("id") long id) {
        return userService.findOne(id);
    }

    @DeleteMapping(value = "/users/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteUserById(id);
    }

    @DeleteMapping(value = "/users")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }

    @GetMapping(value = "/users")
    List<UserDTO> getAllUsers() {
        return userService.findAllUsers();
    }

    //// For Confirms
    @PostMapping(value = "/users/{id}/confirms")
    ResponseEntity add(@PathVariable("id") long userId, @RequestBody RoomConfirmDTO input) {
        return this.userService
                .findUserById(userId)
                .map(account -> {
                    roomConfirmService.save(input);
                    return new ResponseEntity(null, HttpStatus.CREATED);
                }).get();
    }

    @GetMapping(value = "/{idAdmin}/users/{id}/confirms")
    List<RoomConfirmDTO> readRoomConfirms(@PathVariable("id") long userId) {
        return roomConfirmService.findByAccountUsername(userId);
    }

    @GetMapping(value = "/{idAdmin}/users/{id}/confirms/{confirmId}")
    RoomConfirmDTO readRoomConfirm(@PathVariable long confirmId) {
        return roomConfirmService.findOne(confirmId);
    }

    @DeleteMapping(value = "/{idAdmin}/users/{id}/confirms/{confirmId}")
    public void deleteConfirm(@PathVariable("confirmId") long confirmId, @PathVariable("id") String id) {
        roomConfirmService.deleteConfirmById(confirmId);
    }

    //// For Requests
    @GetMapping(value = "/users/{id}/orders")
    List<RoomRequestDTO> readRoomRequests(@PathVariable("id") long userId) {
        return roomRequestService.findByAccountUsername(userId);
    }

    @GetMapping(value = "/users/{id}/orders/{orderId}")
    RoomRequestDTO readRoomRequest(@PathVariable long orderId) {
        return roomRequestService.findOne(orderId);
    }

    @DeleteMapping(value = "/users/{id}/orders/{orderId}")
    public void deleteOrder(@PathVariable("orderId") long orderId, @PathVariable("id") String id) {
        roomRequestService.deleteRoomRequestById(orderId);
    }

    ///// For room type
    @GetMapping(value = "/appartments")
    List<RoomTypeDTO> findAllTypes() {
        return roomTypeService.findAllTypes();
    }

    @GetMapping(value = "/appartments/{appartmentsId}")
    RoomTypeDTO findTypeById(@PathVariable long appartmentsId) {
        return roomTypeService.findOne(appartmentsId);
    }

    @DeleteMapping(value = "/appartments/{appartmentsId}")
    public void deleteType(@PathVariable long appartmentsId) {
        roomTypeService.deleteRoomTypeById(appartmentsId);
    }

    @PostMapping(value = "/appartments")
    public ResponseEntity addType(@RequestBody RoomTypeDTO input) {
        roomTypeService.save(input);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }

    //// For Rooms
    @GetMapping(value = "/appartments/{appartmentsId}/rooms")
    List<RoomDTO> findRoomsByTypes(@PathVariable long appartmentsId) {
        return roomService.findRoomsByType(appartmentsId);
    }

    @GetMapping(value = "/appartments/{appartmentsId}/rooms/{roomsId}")
    RoomDTO readRoom(@PathVariable long roomsId) {
        return roomService.findOne(roomsId);
    }

    @DeleteMapping(value = "/appartments/{appartmentsId}/rooms/{roomsId}")
    public void deleteRoom(@PathVariable long roomsId) {
        roomService.deleteRoomById(roomsId);
    }

    @PostMapping(value = "/appartments/{appartmentsId}/rooms")
    public ResponseEntity addRoom(@RequestBody RoomDTO input, @PathVariable("appartmentsId") String appartmentsId) {
        roomService.save(input);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }
}
