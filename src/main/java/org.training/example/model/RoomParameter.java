package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "room_parameter")
@NoArgsConstructor
@AllArgsConstructor
public class RoomParameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private Room room;

    @ManyToOne
    @JoinColumn(name = "parameter_id")
    @JsonIgnore
    private Parameter parameter;

    public RoomParameter(Room room, Parameter parameter){
        this.parameter = parameter;
        this.room = room;
    }
}
