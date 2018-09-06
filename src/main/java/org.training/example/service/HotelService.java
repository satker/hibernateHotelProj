package org.training.example.service;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.training.example.dao.HotelDao;
import org.training.example.model.Hotel;

import java.util.List;

@Service
@AllArgsConstructor
public class HotelService {
    private final HotelDao hotelDao;

    public List<Hotel> getHotels() {
        return hotelDao.getHotels();
    }
}
