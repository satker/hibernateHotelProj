package org.training.example.controller;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.OrderDTO;
import org.training.example.service.OrderService;

@CrossOrigin
@RestController
@RequestMapping("/user/{userId}/orders")
@RequiredArgsConstructor
public class OrderRestController {
    private final OrderService orderService;

    @GetMapping
    Set<OrderDTO> findAllOrdersByUser(@PathVariable long userId) {
        return orderService.findAllOrdersByUser(userId);
    }

    @DeleteMapping(value = "/{orderId}")
    public void rejectOrder(@PathVariable("orderId") long id) {
        orderService.rejectRoomOrderById(id);
    }
}
