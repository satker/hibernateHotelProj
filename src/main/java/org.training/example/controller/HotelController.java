package org.training.example.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.model.Hotel;
import org.training.example.service.HotelService;

import java.util.List;

@RestController
@AllArgsConstructor
public class HotelController {
    private final HotelService hotelService;

    @GetMapping
    public List<Hotel> getHotels(){
        return hotelService.getHotels();
    }
}
