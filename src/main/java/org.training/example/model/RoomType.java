package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_type")
@Slf4j
@Data
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;
    private String description;
    private String costNight;

    @OneToMany(mappedBy = "roomType")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @Fetch(FetchMode.SELECT)
    @JsonIgnore
    private Set<Request> requests = new HashSet<>();

    @OneToMany(mappedBy = "roomType")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    @Fetch(FetchMode.SELECT)
    @JsonIgnore
    private Set<Room> rooms = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonIgnore
    private Hotel hotel;

    @PostPersist
    public void onPrePersist() {
        audit("INSERT");
    }

    @PostUpdate
    public void onPreUpdate() {
        audit("UPDATE");
    }

    @PostRemove
    public void onPreRemove() {
        audit("DELETE");
    }

    private void audit(String operation) {
        log.debug("operation to room type table completed {}", operation);
    }
}
