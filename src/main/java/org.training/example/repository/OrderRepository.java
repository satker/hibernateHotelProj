package org.training.example.repository;

import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Order;
import org.training.example.model.Room;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT * FROM orders where user_id = ?1",
            nativeQuery = true)
    List<Order> findByUserId(long id);

    @Query(value = "SELECT * FROM rooms",
            nativeQuery = true)
    Set<Room> findRoomsByRequestId(long id);
}
