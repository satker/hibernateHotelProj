package org.training.example.dao;

import org.training.example.model.Hotel;

import java.util.ArrayList;
import java.util.List;

public class HotelDao {
    public List<Hotel> getHotels() {
        List<Hotel> hotels = new ArrayList<>();
        hotels.add(Hotel.builder().cityName("eee").price(222).build());
        return hotels;
    }
}
