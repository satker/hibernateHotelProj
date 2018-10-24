package org.training.example.controller;

import java.security.Principal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.PropertiesForOrderPrice;
import org.training.example.dto.RequestDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.service.RequestService;
import org.training.example.service.RoomService;
import org.training.example.service.RoomTypeService;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/orders")
@RequiredArgsConstructor
class RequestRestController {

    private final RequestService requestService;
    private final RoomTypeService roomTypeService;
    private final UserService userService;
    private final RoomService roomService;

    @PostMapping("/rooms")
    List<RoomDTO> findAvailableRooms(@PathVariable long userId, @RequestBody AddRoomRequestDTO input) {
        return roomService.findAvailableRooms(input);
    }

    @PostMapping
    RequestDTO createOrder(@PathVariable long userId, @RequestBody RequestDTO order){
        return requestService.createOrder(userId, order);
    }

    @PostMapping("/price")
    double getPriceOfOrder (@RequestBody PropertiesForOrderPrice propertiesForOrderPrice) {
        return requestService.getPriceOfOrder(propertiesForOrderPrice);
    }

    @GetMapping
    List<RequestDTO> findAllRequestsByUser(@PathVariable long userId) {
        return requestService.findAllRequestsByUser(userId);
    }

    @GetMapping(value = "/{orderId}")
    RequestDTO findValidateRoom(@PathVariable long orderId, Principal principal) {
        return requestService.findValidateRoom(orderId, principal.getName());
    }

    @DeleteMapping(value = "/{orderId}")
    public void rejectOrder(@PathVariable("orderId") long id) {
        requestService.rejectRoomRequestById(id);
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
