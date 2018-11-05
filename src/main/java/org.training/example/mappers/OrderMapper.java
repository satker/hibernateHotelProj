package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.OrderDTO;
import org.training.example.model.Order;
import org.training.example.repository.OrderRepository;
import org.training.example.repository.RoomOrderRepository;

@Mapper(componentModel = "spring")
public abstract class OrderMapper {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    RoomOrderRepository roomOrderRepository;

    @Autowired
    RoomMapper roomMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    HotelMapper hotelMapper;

    @Mappings({
            @Mapping(target = "payedType",
                    expression = "java( order.getPayedType() )"),
            @Mapping(target = "user",
                    expression = "java( userMapper.userToUserDto(order.getUser()) )"),
            @Mapping(target = "rooms",
                    expression = "java(roomOrderRepository.findAllByOrderId(order.getId()).stream()" +
                            ".map(org.training.example.model.RoomOrder::getRoom)" +
                            ".map(roomMapper::roomToRoomDTO)" +
                            ".collect(java.util.stream.Collectors.toSet()) )"),
            @Mapping(target = "hotel",
                    expression = "java( hotelMapper.hotelToHotelDto(order.getHotel()) )")
    })
    public abstract OrderDTO requestToRequestDTO(Order order);

    @Mappings({
            @Mapping(target = "payedType",
                    expression = "java( orderDTO.getPayedType() )"),
            @Mapping(target = "user",
                    expression = "java( userMapper.userDtoToUser(orderDTO.getUser()) )")
    })
    public abstract Order requestDtoToRequest(OrderDTO orderDTO);
}