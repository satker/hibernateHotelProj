package org.training.example.controller;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.model.Hotel;
import org.training.example.service.HotelService;

@RestController
@AllArgsConstructor
public class HotelController {
    private final HotelService hotelService;

    @GetMapping
    public List<Hotel> getHotels() {
        return hotelService.getHotels();
    }
}
