package org.training.example.repository;

import java.sql.Date;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.training.example.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query(value = "select rooms.* from rooms\n" +
            "LEFT JOIN room_types t on rooms.room_type_id = t.id\n" +
            "where t.hotel_id = ?1", nativeQuery = true)
    Set<Room> findByHotelId(long id);

    @Query(value = "select rooms.*\n" +
            "from rooms\n" +
            "       left join room_order on rooms.id = room_order.room_id\n" +
            "       left join orders o on room_order.order_id = o.id\n" +
            "       JOIN (select r.number\n" +
            "             from rooms r\n" +
            "                    left join room_types t on r.room_type_id = t.id\n" +
            "                    left join capacities c on t.capacity_id = c.id\n" +
            "             where  t.hotel_id = ?6 and is_snoozed = false\n" +
            "               and (c.adults LIKE CASE WHEN ?5 = 1 THEN ?3 END)\n" +
            "               and (c.children LIKE CASE WHEN ?5 = 1 THEN ?4 END)) roomId USING (number)\n" +
            "where CASE when ((select count(*) from room_order where room_id =\n" +
            "                                                     (select id from rooms where number = roomId.number)) != 0)\n" +
            "                then (?1 not between o.arrival_date and o.departure_date) and\n" +
            "                     (?2 not between o.arrival_date and o.departure_date) and\n" +
            "                     (o.arrival_date not between ?1 and ?2) and\n" +
            "                     (o.departure_date not between ?1 and ?2)\n" +
            "        else true END\n" +
            "ORDER BY rooms.cost_night",
            nativeQuery = true)
    Set<Room> findRoomsByParams(Date arrivalDate, Date departureDate,
                                byte adults, byte children,
                                byte numbersOfRooms, long hotelId);

    @Query(value = "select rooms.*\n" +
            "from rooms\n" +
            "       left join room_order on rooms.id = room_order.room_id\n" +
            "       left join orders o on room_order.order_id = o.id\n" +
            "       JOIN (select number from rooms\n" +
            "                    left join room_types t on rooms.room_type_id = t.id\n" +
            "             where t.hotel_id = ?3 and is_snoozed = false) roomId USING (number)\n" +
            "where CASE when ((select count(*) from room_order where room_id =\n" +
            "                                                        (select id from rooms where number = roomId.number)) != 0)\n" +
            "                then (?1 not between o.arrival_date and o.departure_date) and\n" +
            "                     (?2 not between o.arrival_date and o.departure_date) and\n" +
            "                     (o.arrival_date not between ?1 and ?2) and\n" +
            "                     (o.departure_date not between ?1 and ?2)\n" +
            "           else true END\n" +
            "ORDER BY rooms.cost_night", nativeQuery = true)
    Set<Room> findAllRoomsByDate(Date departureDate, Date departureDate1, long hotelId);
}
