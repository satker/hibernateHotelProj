package org.training.example.controller;

import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.HotelDto;
import org.training.example.dto.ParamsToSearchHotel;
import org.training.example.service.HotelService;

// OK
@RestController
@AllArgsConstructor
@RequestMapping("/user/{userId}/hotels")
public class HotelController {
    private final HotelService hotelService;

    @PostMapping("/params")
    public Set<HotelDto> getHotelsByParams(@RequestBody ParamsToSearchHotel paramsToSearchHotel) {
        return hotelService.getHotelsByParams(paramsToSearchHotel);
    }

    @GetMapping
    public Set<HotelDto> getHotels() {
        return hotelService.getHotels();
    }

    @GetMapping("/cities")
    public Set<String> getCities() {
        return hotelService.getCities();
    }

    @GetMapping("/countries")
    public Set<String> getCountries() {
        return hotelService.getCountries();
    }
    /*
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
