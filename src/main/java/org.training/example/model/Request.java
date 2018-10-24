package org.training.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.sql.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "request")
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

    private PayedType payedType;

    private OrderStatus orderStatus;

    private Boolean isPaid;

    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

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
