package org.training.example.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.service.OrderService;
import org.training.example.service.RoomService;
import org.training.example.service.RoomTypeService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminRestController {
    private final UserService userService;
    private final OrderService orderService;
    private final RoomService roomService;
    private final RoomTypeService roomTypeService;
/*
    ////For admin
    @GetMapping(value = "/{idAdmin}")
    public UserDTO getValidateAdmin(@PathVariable("idAdmin") long id, Principal principal) {
        return userService.
                getValidateUser(id,
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

    //// For Requests
    @GetMapping(value = "/users/{id}/orders")
    List<OrderDTO> readRoomRequests(@PathVariable("id") long userId) {
        return requestService.findByAccountUsername(userId);
    }

    @GetMapping(value = "/users/{id}/orders/{orderId}")
    OrderDTO readRoomRequest(@PathVariable long orderId) {
        return requestService.findOne(orderId);
    }

    @DeleteMapping(value = "/users/{id}/orders/{orderId}")
    public void deleteOrder(@PathVariable("orderId") long orderId, @PathVariable("id") String id) {
        requestService.rejectRoomOrderById(orderId);
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
*/
}
