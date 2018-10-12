package org.training.example.controller;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping(path = "/", params = {"country", "city", "stars", "price"})
    public List<Hotel> getHotelsByParams(@RequestParam String country,
                                         @RequestParam String city,
                                         @RequestParam int stars,
                                         @RequestParam double price) {
        return hotelService.getHotelsByParams(country, city, stars, price);
    }

    @PostMapping(params = "hotel")
    public Hotel createHotel(@RequestParam Hotel hotel) {
        return hotelService.createHotel(hotel);
    }
}
