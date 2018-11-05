package org.training.example.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.OrderDTO;
import org.training.example.dto.PropertiesForOrderPrice;
import org.training.example.dto.RoomDTO;
import org.training.example.exceptions.AccessDeniedException;
import org.training.example.exceptions.RoomRequestNotFoundException;
import org.training.example.mappers.OrderMapper;
import org.training.example.mappers.RoomMapper;
import org.training.example.model.Order;
import org.training.example.model.OrderStatus;
import org.training.example.model.Room;
import org.training.example.model.RoomOrder;
import org.training.example.repository.HotelRepository;
import org.training.example.repository.OrderRepository;
import org.training.example.repository.RoomOrderRepository;
import org.training.example.repository.RoomRepository;
import org.training.example.repository.UserRepository;

@Service
@AllArgsConstructor
@Slf4j
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserService userService;
    private final RoomMapper roomMapper;
    private final RoomOrderRepository roomOrderRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    public Set<OrderDTO> findByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return orderRepository.
                findByUserId(id).
                stream().
                //filter(item -> confirmedRequestRepository.findConfirmedRequestByRequest(item) == null).
                        map(orderMapper::requestToRequestDTO).
                        collect(Collectors.toSet());
    }

    public Set<OrderDTO> findAllOrdersByUser(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return orderRepository.
                findByUserId(id).
                stream().
                map(orderMapper::requestToRequestDTO).
                collect(Collectors.toSet());
    }

    public OrderDTO findValidateRoom(long id, String login) {
        log.debug("room order has been found for validate user by id {}", id);
        long userId = userService.findUserByLogin(login).getId();
        Order findedOrder = orderRepository.getOne(id);
        if (findedOrder != null) {
            throw new RoomRequestNotFoundException(id);
        }
        OrderDTO parsedToDto = orderMapper.requestToRequestDTO(findedOrder);
        if (findByAccountUsername(userId).contains(parsedToDto)) {
            return parsedToDto;
        } else {
            throw new AccessDeniedException(userId);
        }
    }

    public OrderDTO findOne(long id) {
        log.debug("room order has been found by id {}", id);
        return orderMapper.requestToRequestDTO(orderRepository.getOne(id));
    }

    public void rejectRoomOrderById(long id) {
        log.debug("room order has been deleted by id {}", id);
        Order orderForReject = orderRepository.getOne(id);
        orderForReject.setOrderStatus(OrderStatus.REJECTED);
        orderRepository.save(orderForReject);
    }

    public OrderDTO createOrder(long userId, long hotelId, OrderDTO order) {
        Order newOrder = orderMapper.requestDtoToRequest(order);
        newOrder.setUser(userRepository.findOne(userId));
        newOrder.setHotel(hotelRepository.getOne(hotelId));
        newOrder.setCreationDate(new java.sql.Date(new java.util.Date().getTime()));
        Order savedOrder = orderRepository.save(newOrder);
        Map<Room, Order> roomRequestMap = order.getRooms().stream()
                .map(roomMapper::roomDTOToRoom)
                .peek(room -> room.setIsSnoozed(false))
                .peek(roomRepository::save)
                .collect(Collectors.toMap(Function.identity(), i -> savedOrder));
        roomRequestMap.entrySet().stream()
                .map(elem -> new RoomOrder(elem.getKey(), elem.getValue()))
                .forEach(roomOrderRepository::save);
        return orderMapper.requestToRequestDTO(savedOrder);
    }

    public double getPriceOfOrder(PropertiesForOrderPrice propertiesForOrderPrice) {
        long diffTime = propertiesForOrderPrice.getDepartureDate().getTime() - propertiesForOrderPrice.getArrivalDate().getTime();
        long days = TimeUnit.DAYS.convert(diffTime, TimeUnit.MILLISECONDS) + 1;
        Double sumPriceOfRooms = propertiesForOrderPrice.getRooms().stream()
                .map(RoomDTO::getCostNight)
                .reduce((firstPrice, secondPrice) -> firstPrice + secondPrice).get();
        double result = sumPriceOfRooms * days;
        return new BigDecimal(result).setScale(2, RoundingMode.UP).doubleValue();
    }
}
