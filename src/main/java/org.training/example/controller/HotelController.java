package org.training.example.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.training.example.model.Hotel;
import org.training.example.service.HotelService;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class HotelController {
    private final HotelService hotelService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public List<Hotel> getHotels(){
        return hotelService.getHotels();
    }
}
