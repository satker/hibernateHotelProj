package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.sql.Date;
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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "room_request")
@Slf4j
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Date arrivalDate;

    @NotNull
    private Date departureDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "capacity_id")
    @JsonIgnore
    private Capacity capacity;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    @JsonIgnore
    private RoomType roomType;

    @OneToMany(mappedBy = "request")
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    @Fetch(FetchMode.SELECT)
    @JsonIgnore
    private Set<ConfirmedRequest> confirmRooms = new HashSet<>();

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
        log.debug("operation to room request table completed {}", operation);
    }
}
