package org.training.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.training.example.model.RoomOrder;

public interface RoomOrderRepository extends JpaRepository<RoomOrder, Long> {
    @Query(value = "SELECT * FROM room_order where order_id = ?1", nativeQuery = true)
    List<RoomOrder> findAllByOrderId (long id);
}
