package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
@Slf4j
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private Integer number;

    @Column(columnDefinition = "bit default 0")
    private Boolean isSnoozed;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    @JsonIgnore
    private RoomType roomType;

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
        log.debug("operation to room table completed {}", operation);
    }
}
