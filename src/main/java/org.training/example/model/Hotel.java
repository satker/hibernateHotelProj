package org.training.example.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;


@Data
@Builder
@Entity
@Table(name="hotels")
public class Hotel {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    @Column(name = "hotel_name")
    private String hotelName;
    @Column(name = "stars")
    private int stars;
    @Column(name = "price")
    private double price;
    @Column(name = "city_name")
    private String cityName;
    @Column(name = "country_code")
    private String countryCode;
    @Column(name = "country_name")
    private String countryName;
    @Column(name = "address")
    private String address;
    @Column(name = "location")
    private String location;
    @Column(name = "url")
    private String url;
    @Column(name = "latitude")
    private double latitude;
    @Column(name = "longitude")
    private double longitude;

}
