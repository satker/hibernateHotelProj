package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Data
@Builder
@Entity
@Table(name = "hotel")
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String hotelName;
    private int stars;
    private double price;
    private String address;
    private String url;
    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "hotel")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @Fetch(FetchMode.SELECT)
    private Set<RoomType> roomTypes = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "city_id")
    @JsonIgnore
    private City city;
}
