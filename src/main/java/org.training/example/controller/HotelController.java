package org.training.example.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.service.HotelService;

// OK
@RestController
@AllArgsConstructor
@RequestMapping("/hotels")
public class HotelController {
    private final HotelService hotelService;

    /*@GetMapping
    public List<HotelDto> getHotels() {
        return hotelService.getHotels();
    }

    @GetMapping(path = "/", params = {"country", "city", "stars", "price"})
    public List<HotelDto> getHotelsByParams(@RequestParam String country,
                                            @RequestParam String city,
                                            @RequestParam int stars,
                                            @RequestParam double price) {
        return hotelService.getHotelsByParams(country, city, stars, price);
    }

    @PostMapping(params = "hotel")
    public HotelDto createHotel(@RequestParam HotelDto hotel) {
        return hotelService.createHotel(hotel);
    }*/
}
