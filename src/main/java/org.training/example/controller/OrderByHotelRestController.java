package org.training.example.controller;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.OrderDTO;
import org.training.example.dto.PropertiesForOrderPrice;
import org.training.example.dto.RoomDTO;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.service.OrderService;
import org.training.example.service.RoomService;
import org.training.example.service.RoomTypeService;

// OK
@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/hotels/{hotelId}/orders")
@RequiredArgsConstructor
class OrderByHotelRestController {

    private final OrderService orderService;
    private final RoomTypeService roomTypeService;
    private final RoomService roomService;

    @PostMapping("/rooms")
    Set<RoomDTO> findAvailableRooms(@PathVariable long userId,
                                    @PathVariable long hotelId,
                                    @RequestBody AddRoomRequestDTO input) {
        return roomService.findAvailableRooms(input, hotelId);
    }

    @PostMapping
    OrderDTO createOrder(@PathVariable long userId,
                         @PathVariable long hotelId,
                         @RequestBody OrderDTO order) {
        return orderService.createOrder(userId, hotelId, order);
    }

    @PostMapping("/price")
    double getPriceOfOrder(@RequestBody PropertiesForOrderPrice propertiesForOrderPrice) {
        return orderService.getPriceOfOrder(propertiesForOrderPrice);
    }

    /*@GetMapping(value = "/{orderId}")
    OrderDTO findValidateRoom(@PathVariable long orderId, Principal principal) {
        return requestService.findValidateRoom(orderId, principal.getName());
    }*/

    @GetMapping(value = "/appartments")
    Set<RoomTypeDTO> findAllTypes() {
        return roomTypeService.findAllTypes();
    }

   /* @GetMapping(value = "/appartments/{appartmentsId}")
    RoomTypeDTO findTypeById(@PathVariable long appartmentsId) {
        return roomTypeService.findOne(appartmentsId);
    }*/

    @PostMapping(value = "/rooms/snooze")
    void snoozeRooms(@RequestBody List<RoomDTO> rooms) {
        roomService.snoozeRooms(rooms);
    }
}
